import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import * as MD5 from 'crypto-js/md5';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { SingleAnswerDto } from './dto/SingleAnswerDto';
import { PsyTestAnswersStatus } from './entities/PsyTestAnswersStatusEnum';
import {
  FormUploadGroupFileDto,
  QueryEnableExamRetakeDto,
  QueryUpdateUserExamDto,
} from './dto/anthe.types';
import { Prisma } from '@prisma/client';
import { isEmail, isNumber, isNumberString } from 'class-validator';
import { rowError } from './types/psytest.types';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class PsychologistTestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userInfo: UserInfoService,
  ) {}

  // >> PERSONS
  // local
  async getExam(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    let assignation = await this.prisma.psyTestGroupAssignation.findFirst({
      where: {
        PsyTestPerson: {
          document_type: identification_type,
          document_number: identification_number,
        },
      },
    });

    if (!assignation.PsyTestAnswers_id) {
      const exam = await this.prisma.psyTestExam.findUnique({
        where: { id: assignation.PsyTestExam_id },
        include: { PsyTestQuestions: true },
      });

      const psyTestAnswers = await this.prisma.psyTestAnswers.create({
        data: {
          examName: exam.name,
          status: PsyTestAnswersStatus.INPROGRESS,
          updated_at: new Date(),
          PsyTestGroupAssignation: {
            connect: {
              id: assignation.id,
            },
          },
        },
      });
      assignation = await this.prisma.psyTestGroupAssignation.update({
        where: { id: assignation.id },
        data: {
          PsyTestAnswers_id: psyTestAnswers.id,
        },
      });

      await this.prisma.psyTestSingleAnswers.createMany({
        data: exam.PsyTestQuestions.map((q) => ({
          PsyTestQuestions_id: q.id,
          question: q.question,
          answer: null,
          psyTestAnswersId: psyTestAnswers.id,
          updated_at: new Date(),
        })),
      });
    }

    const psyTestAnswers = await this.prisma.psyTestAnswers.findUnique({
      where: { id: assignation.PsyTestAnswers_id },
      include: { singleAnswers: true },
    });

    return psyTestAnswers;
  }

  async saveSingleAnswer(answer: SingleAnswerDto) {
    await this.prisma.psyTestSingleAnswers.update({
      where: { id: answer.id },
      data: {
        answer: answer.answer,
        updated_at: new Date(),
      },
    });
  }

  async closeExam(id: string, token: string) {
    await this.prisma.psyTestAnswers.update({
      where: {
        id,
      },
      data: {
        status: PsyTestAnswersStatus.FINALIZED,
        updated_at: new Date(),
      },
    });

    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);
    const assignation = await this.prisma.psyTestGroupAssignation.findFirst({
      where: {
        PsyTestPerson: {
          document_type: identification_type,
          document_number: identification_number,
        },
      },
    });

    const questions = await this.prisma.psyTestQuestions.findMany({
      where: { exam_id: assignation.PsyTestExam_id },
      include: {
        PsyTestSingleAnswers: {
          where: { psyTestAnswersId: assignation.PsyTestAnswers_id },
          select: { answer: true },
        },
      },
    });

    //by competency
    const by_competition: {
      [key: string]: {
        percentage: number;
        dimensions: {
          ATTITUDE: { obtained: number; optimal: number; percentage: number };
          KNOW: { obtained: number; optimal: number; percentage: number };
          DO: { obtained: number; optimal: number; percentage: number };
        };
      };
    } = {};

    for (const q of questions) {
      const competencyList = q.competency;
      const dimension = q.dimension;
      const correct = q.correct_answer;
      const userAnswer = q.PsyTestSingleAnswers[0]?.answer ?? null;

      const optimal = 2;
      const obtained = userAnswer === correct ? 1 : 0;

      for (const competency of competencyList) {
        if (!by_competition[competency]) {
          by_competition[competency] = {
            percentage: 0,
            dimensions: {
              ATTITUDE: { obtained: 0, optimal: optimal, percentage: 0 },
              KNOW: { obtained: 0, optimal: optimal, percentage: 0 },
              DO: { obtained: 0, optimal: optimal, percentage: 0 },
            },
          };
        }
        by_competition[competency].dimensions[dimension].obtained += obtained;
      }
    }

    for (const competency in by_competition) {
      let totalObtained = 0;
      let totalOptimal = 0;

      for (const dim in by_competition[competency].dimensions) {
        const dimObj = by_competition[competency].dimensions[dim];
        if (dimObj.optimal > 0) {
          dimObj.percentage = Math.round(
            (dimObj.obtained / dimObj.optimal) * 100,
          );
        }
        totalObtained += dimObj.obtained;
        totalOptimal += dimObj.optimal;
      }

      by_competition[competency].percentage = Math.round(
        (totalObtained / totalOptimal) * 100,
      );
    }

    //by_dimension
    let sums = { DO: 0, KNOW: 0, ATTITUDE: 0 };
    let count = 0;

    for (const competency of Object.values(by_competition)) {
      const { dimensions } = competency;

      sums.DO += dimensions.DO.percentage;
      sums.KNOW += dimensions.KNOW.percentage;
      sums.ATTITUDE += dimensions.ATTITUDE.percentage;
      count++;
    }

    const by_dimension = {
      DO: Math.round(sums.DO / count),
      KNOW: Math.round(sums.KNOW / count),
      ATTITUDE: Math.round(sums.ATTITUDE / count),
    };

    return await this.prisma.psyTestAnswers.update({
      where: { id: assignation.PsyTestAnswers_id },
      data: {
        results: {
          by_competition: by_competition,
          by_dimension: by_dimension,
        },
      },
    });
  }

  async getResults(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);
    const assignation = await this.prisma.psyTestGroupAssignation.findFirst({
      where: {
        PsyTestPerson: {
          document_type: identification_type,
          document_number: identification_number,
        },
      },
    });

    const answer = await this.prisma.psyTestAnswers.findUnique({
      where: { id: assignation.PsyTestAnswers_id },
    });

    return answer.results;
  }

  // Anthe
  async getGroupPersonsList(groupId: string, token: string) {
    const personInfoList = await this.prisma.psyTestGroupAssignation.findMany({
      where: { PsyTestGroup_id: groupId },
      include: {
        PsyTestPerson: true,
        PsyTestExam: true,
        PsyTestGroup: true,
      },
    });

    //const response = personList.map((reg)=> reg.PsyTestPerson);
    return personInfoList;
  }

  async editPsyTestAssignation(token: string, query: QueryUpdateUserExamDto) {
    return await this.prisma.psyTestGroupAssignation.update({
      where: { id: query.assignationId },
      data: {
        PsyTestExam_id: query.assignedExam,
      },
    });
  }

  async enablePsyTestRetake(token: string, query: QueryEnableExamRetakeDto) {
    const assignationInfo =
      await this.prisma.psyTestGroupAssignation.findUnique({
        where: { id: query.assignationId },
      });

    if (!assignationInfo) {
      return {
        error: true,
        message: `No se encuentra la asignación de prueba solicitada`,
      };
    }

    // Find previous assignations
    //const retakeRegisters = await this.prisma.psyTestGroupAssignation.findMany({
    //  select: {
    //    id: true,
    //  },
    //  where: {
    //    retake_id: assignationInfo.id,
    //  },
    //});

    if (assignationInfo.retake_id != null) {
      return {
        error: true,
        message: `Este examen ya cuenta con retomas anteriores`,
      };
    }

    // Check if not pending.
    if (assignationInfo.current_status != 'FINALIZED') {
      return {
        error: true,
        message: `El estado de la prueba es Incorrecto`,
      };
    }

    // Update old register to filter after
    const oldRegister = await this.prisma.psyTestGroupAssignation.update({
      where: { id: assignationInfo.id },
      data: {
        current_status: 'RETAKE',
      },
    });

    return this.prisma.psyTestGroupAssignation.create({
      data: {
        PsyTestExam_id: assignationInfo.PsyTestExam_id,
        PsyTestPerson_id: assignationInfo.PsyTestPerson_id,
        PsyTestGroup_id: assignationInfo.PsyTestGroup_id,
        retake_id: assignationInfo.id,
        retake_reason: query.retakeReason,
      },
    });
  }

  // >> GROUPS
  // local

  // Anthe

  getObjectHash(object: {}) {
    const hash = MD5(JSON.stringify(object));
    return hash.toString();
  }

  async processGroupFile(
    file: Express.Multer.File,
    fileBuffer: any,
    body: FormUploadGroupFileDto,
  ) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];

    const expectedHeaders = [
      'Tipo de documento',
      'Numero de documento',
      'Nombres',
      'Apellidos',
      'Correo Electrónico',
    ];

    // Leer encabezados manualmente
    const headerRow = worksheet.getRow(1);
    const actualHeaders: string[] = [];

    for (let i = 1; i <= expectedHeaders.length; i++) {
      const cellValue = headerRow.getCell(i).value;
      actualHeaders.push(cellValue?.toString().trim() ?? '');
    }

    const headersMatch = expectedHeaders.every(
      (h, idx) => h === actualHeaders[idx],
    );

    if (!headersMatch) {
      return {
        error: true,
        message: `Los encabezados del archivo no coinciden.\nEsperado: ${expectedHeaders.join(', ')}\nRecibido: ${actualHeaders.join(', ')}`,
      };
    }

    const psyTestPersonsInfo = [];
    const errors: Array<rowError> = [];
    let examInfo;

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);

      // Saltar si la fila está completamente vacía
      const isEmpty =
        row.cellCount === 0 ||
        (Array.isArray(row.values) &&
          row.values.every((v) => !v || v.toString().trim() === ''));
      if (isEmpty) continue;

      // Leer valores
      const cells = Array.from({ length: expectedHeaders.length }, (_, idx) => {
        const cellValue = row.getCell(idx + 1);
        if (
          typeof cellValue === 'object' &&
          cellValue?.text &&
          cellValue?.hyperlink
        ) {
          return cellValue.text.trim() ?? '';
        }
        return cellValue.value?.toString().trim() ?? '';
      });

      const [document_type, document_number, name, last_name, email] = cells;

      // Verificar campos obligatorios
      if (!document_type || !document_number || !name || !last_name || !email) {
        errors.push({
          row: i,
          error: `Fila ${i}: faltan campos obligatorios.`,
        } as rowError);
        continue;
      }

      // Buscar el curso
      const DEFAULT_TEST = body.defaultTest; //'Mentalidad Emprendedora';
      examInfo = await this.prisma.psyTestExam.findUnique({
        where: { id: DEFAULT_TEST },
      });
      if (!examInfo) {
        errors.push({
          row: i,
          error: `Fila ${i}: curso "${DEFAULT_TEST}" no encontrado.`,
        } as rowError);
        continue;
      }

      // data validation
      const allowed_doc_types = [
        'CC',
        'SIE',
        'NUIP',
        'SC',
        'TI',
        'PA',
        'CE',
        'RC',
        'PEP',
        'CD',
        'TE',
        'PPT',
      ];

      if (!allowed_doc_types.find((type) => type == document_type)) {
        errors.push({
          row: i,
          error: `Fila ${i}: El tipo de documento es incorrecto`,
        } as rowError);
        continue;
      }

      if (document_number.length > 10 || !isNumberString(document_number)) {
        errors.push({
          row: i,
          error: `Fila ${i}: El numero de documento es incorrecto`,
        } as rowError);
        continue;
      }

      if (name == '' || name.length >= 150) {
        errors.push({
          row: i,
          error: `Fila ${i}: los nombres no cumplen con los requerimientos`,
        } as rowError);
        continue;
      }

      if (last_name == '' || last_name.length >= 150) {
        errors.push({
          row: i,
          error: `Fila ${i}: los apellidos no cumplen con los requerimientos`,
        } as rowError);
        continue;
      }

      if (!isEmail(email) || email.length >= 150) {
        errors.push({
          row: i,
          error: `Fila ${i}: el correo electrónico es invalido`,
        } as rowError);
        continue;
      }

      const existent = await this.prisma.psyTestPerson.findFirst({
        where: {
          AND: [
            { document_type: document_type },
            { document_number: document_number },
          ],
        },
      });

      if (existent) {
        const pending_exam =
          await this.prisma.psyTestGroupAssignation.findFirst({
            where: {
              AND: [
                { PsyTestPerson_id: existent.id },
                {
                  OR: [
                    { current_status: 'PENDING' },
                    { current_status: 'INPROGRESS' },
                  ],
                },
              ],
            },
          });

        if (pending_exam) {
          errors.push({
            row: i,
            error: `Fila ${i}: el usuario ${name} con documento ${document_type}-${document_number} tiene un examen activo`,
          } as rowError);
        }
      }

      // Si todo está bien, agregar a la lista
      if (!errors.length) {
        psyTestPersonsInfo.push({
          document_type,
          document_number,
          name,
          last_name,
          email,
        });
      }
    }

    if (errors.length > 0) {
      return {
        error: true,
        messages: errors,
      };
    }

    //Logger.debug(psyTestPersonsInfo);

    const newGroup = await this.prisma.psyTestGroup.create({
      data: {
        name: body.groupName, //'group_' + new Date().toISOString(),
        number_persons: psyTestPersonsInfo.length,
        file_name: file.originalname,
        md5_sum: this.getObjectHash({
          file: file.originalname,
          persons: psyTestPersonsInfo,
        }),
        current_status: 'PENDING',
        updated_at: new Date(),
      },
    });

    const personsCreated = await Promise.all(
      psyTestPersonsInfo.map((person) => {
        const existent = this.prisma.psyTestPerson.findFirst({
          where: {
            AND: [{ document_type: person[0] }, { document_number: person[1] }],
          },
        });

        const newReg =
          existent ??
          this.prisma.psyTestPerson.create({
            data: { ...person, updated_at: new Date() },
          });
        return newReg;
      }),
    );

    //Logger.debug(personsCreated);

    if (personsCreated && personsCreated.length) {
      for (const newPerson of personsCreated) {
        // await this.prisma.psyTestGroupAssignation.create({
        //   data: {
        //     PsyTestExam_id: examInfo.id,
        //     PsyTestGroup_id: newGroup.id,
        //     PsyTestPerson_id: newPerson.id,
        //   },
        // });
      }

      return {
        message: `${psyTestPersonsInfo.length} grupo creado exitosamente.`,
      };
    }

    Logger.fatal(personsCreated);
    return {
      error: true,
      message: `Error al registrar las personas ${personsCreated.length}`,
    };
  }

  getGroupsList(token: string) {
    return this.prisma.psyTestGroup.findMany();
  }

  // >> EXAM
  // local
  async getPendingExamList(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    let assignation = await this.prisma.psyTestGroupAssignation.findMany({
      where: {
        PsyTestPerson: {
          document_type: identification_type,
          document_number: identification_number,
        },
        current_status: 'PENDING',
      },
      include:{PsyTestExam:true}
    });

    if (assignation) {
        return assignation.map((pending)=>{
          return {
              "assignationId": pending.id,
              //"PsyTestPerson_id":"",
              //"PsyTestGroup_id":"",
              //"PsyTestExam_id":"",
              //"PsyTestAnswers_id":null,
              //"state":null,
              "assignationCurrentStatus": pending.current_status,
              "assignationCreatedAt": pending.created_at,
              //"updated_at":"2025-09-16T18:15:18.086Z",
              //"retake_id":null,
              //"retake_reason":null,
              //"PsyTestExam":{
              //    "id":"90d8e542-d0bd-4e47-a3b4-cd8eef7b45d0",
                    "psyTestExamId": pending.PsyTestExam.id,
              //    "name":"Test Empresarial",
                    "psyTestExamName": pending.PsyTestExam.name,
              //    "created_at":"2025-09-05T21:48:07.692Z",
                    "psyTestExamCreatedAt": pending.PsyTestExam.created_at,
              //    "updated_at":"2025-09-05T21:48:07.692Z",
              //    "state":null
              //}
          };
        })
    }
    return [];
  }

  // Anthe
}
