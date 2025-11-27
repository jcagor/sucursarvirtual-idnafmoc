import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCourseScheduleDto,
  FindCourseScheduleDto,
  QueryValidateEmployeeForCourseDto,
} from './dto/create-course-schedule.dto';
import { UpdateCourseDto } from '../courses/dto/update-course.dto';
import * as ExcelJS from 'exceljs';
import { CourseScheduleAccessType } from './entities/CourseScheduleAccessType';
import { access } from 'fs';
import { AssignBusinessToBScheduleDto } from './dto/assign-business-tob-schedule.dto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { requestAffiliatesByBusiness } from './external-services/affiliates-by-business';
import { UserInfoService } from '../user-info/user-info.service';
import { CourseRegistrationService } from '../course-registration/course-registration.service';
import { CONFLICT_TYPE } from '../course-registration/types/courseRegistration.types';

@Injectable()
export class CourseScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userInfo: UserInfoService,
    private readonly courseReg: CourseRegistrationService,
  ) {}

  // Util Functions
  async validateUserScheduleConflict(
    documentType: string,
    documentNumber: string,
    newScheduleId: string,
  ) {
    return await this.courseReg.validateScheduleAndSessionConflict(
      documentType,
      documentNumber,
      newScheduleId,
      true, // return first conflict only
      false, // validate max courses allowed
    );
  }

  // Service functions

  async findByCourse(id: string, token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    return this.prisma.courseSchedule.findMany({
      where: {
        course_id: id,
        OR: [
          { accessType: CourseScheduleAccessType.OPEN },
          {
            accessType: CourseScheduleAccessType.CLOSED,
            businessProfile: {
              some: {
                document_number: identification_number,
              },
            },
          },
        ],
      },
    });
  }

  async findBySession(session_id: string) {
    const session = await this.prisma.courseSession.findUnique({
      where: { id: session_id },
    });

    return this.prisma.courseSchedule.findFirstOrThrow({
      where: { id: session.courseSchedule_id },
    });
  }

  async findOne(id: string) {
    const courseSchedule = await this.prisma.courseSchedule.findUnique({
      where: { id: id },
    });

    if (!courseSchedule) {
      return null;
    }

    return {
      id: courseSchedule.id,
      name: courseSchedule.name,
      modality: courseSchedule.modality,
      startDate: courseSchedule.startDate,
      endDate: courseSchedule.endDate,
      course_id: courseSchedule.course_id,
      supplier: courseSchedule.supplier,
      typeUser: courseSchedule.typeUser,
      description: '',
    };
  }

  async findAll() {
    const courseSchedule = await this.prisma.courseSchedule.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return courseSchedule.map((courseSchedule) => ({
      id: courseSchedule.id,
      name: courseSchedule.name,
      modality: courseSchedule.modality,
      sessions: courseSchedule.sessions,
      startDate: courseSchedule.startDate,
      endDate: courseSchedule.endDate,
      course_id: courseSchedule.course_id,
      typeUser: courseSchedule.typeUser,
      accessType: courseSchedule.accessType,
    }));
  }

  async create(createCourseScheduleDto: CreateCourseScheduleDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: createCourseScheduleDto.course_id },
    });

    const cost = parseInt(createCourseScheduleDto.cost.replace(/\./g, ''), 10);

    return this.prisma.courseSchedule.create({
      data: {
        name: createCourseScheduleDto.name,
        modality: createCourseScheduleDto.modality,
        startDate: createCourseScheduleDto.startDate,
        endDate: createCourseScheduleDto.endDate,
        typeUser: createCourseScheduleDto.typeUser,
        supplier: createCourseScheduleDto.supplier,
        description: createCourseScheduleDto.description,
        id_regional: createCourseScheduleDto.id_regional,
        cost: cost,
        accessType: createCourseScheduleDto.accessType,
        sessions: 0,
        course: { connect: { id: course.id } },
      },
    });
  }

  async update(id: string, UpdateCourseDto: UpdateCourseDto) {
    return this.prisma.courseSchedule.update({
      where: { id: id },
      data: {
        name: UpdateCourseDto.name,
        modality: UpdateCourseDto.modality,
        startDate: UpdateCourseDto.startDate,
        endDate: UpdateCourseDto.endDate,
        course_id: UpdateCourseDto.course_id,
        typeUser: UpdateCourseDto.typeUser,
        supplier: UpdateCourseDto.supplier,
        description: UpdateCourseDto.description,
      },
    });
  }

  async findEmployeesAvailableByBussiness(id_schedule: string, token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    try {
      const affiliatesApi = await requestAffiliatesByBusiness(
        identification_type.toUpperCase(),
        identification_number,
      );

      if (
        !affiliatesApi ||
        !affiliatesApi.Total_Trab ||
        !affiliatesApi.TRABAJADOR
      ) {
        throw new InternalServerErrorException(
          'La API de afiliados por empresa no devolvió datos válidos.',
        );
      }

      if (affiliatesApi.Total_Trab === '0') {
        return [];
      }

      const employees = affiliatesApi.TRABAJADOR;

      // let employees = [
      //   {
      //     Tipo_Documento: 'CC',
      //     Numero_Documento: '1061822454',
      //     Primer_Nombre: 'Juan',
      //     Segundo_Nombre: 'Pablo',
      //     Primer_Apellido: 'Lopez',
      //     Segundo_Apellido: 'Gomez',
      //     Genero: 'M',
      //     Correo: 'prueba@prueba.com',
      //     Telefono: '1234567890',
      //     Estado: 'SUSPE',
      //     Estado_Motivo: 'Ninguno',
      //   },
      //   {
      //     Tipo_Documento: 'CC',
      //     Numero_Documento: '1061822455',
      //     Primer_Nombre: 'Maria',
      //     Segundo_Nombre: 'Alba',
      //     Primer_Apellido: 'Vargas',
      //     Segundo_Apellido: 'Bolaños',
      //     Genero: 'F',
      //     Correo: 'prueba@prueba.com',
      //     Telefono: '1234567890',
      //     Estado: 'SUSPE',
      //     Estado_Motivo: 'Ninguno',
      //   },
      //   {
      //     Tipo_Documento: 'CC',
      //     Numero_Documento: '1061822456',
      //     Primer_Nombre: 'Pedro',
      //     Segundo_Nombre: 'Pablo',
      //     Primer_Apellido: 'Cardenas',
      //     Segundo_Apellido: 'Torres',
      //     Genero: 'M',
      //     Correo: 'prueba@prueba.com',
      //     Telefono: '1234567890',
      //     Estado: 'SUSPE',
      //     Estado_Motivo: 'Ninguno',
      //   },
      //   {
      //     Tipo_Documento: 'CC',
      //     Numero_Documento: '1061822457',
      //     Primer_Nombre: 'Carlos',
      //     Segundo_Nombre: 'Andres',
      //     Primer_Apellido: 'Espinoza',
      //     Segundo_Apellido: 'Alvarado',
      //     Genero: 'F',
      //     Correo: 'prueba@prueba.com',
      //     Telefono: '1234567890',
      //     Estado: 'SUSPE',
      //     Estado_Motivo: 'Ninguno',
      //   },
      // ];

      const transformed = employees.map((item) => ({
        document_type: item.Tipo_Documento,
        document_number: item.Numero_Documento,
        firstName: item.Primer_Nombre,
        middleName: item.Segundo_Nombre,
        firstLastName: item.Primer_Apellido,
        middleLastName: item.Segundo_Apellido,
        phoneNumber: item.Telefono,
        email: item.Correo,
        gender: item.Genero,
        status: item.Estado,
        observations: item.Estado_Motivo,
      }));

      return transformed;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al consultar afiliados por empresa: ' + error.message,
      );
    }
  }

  async bulkLoading(fileBuffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];

    const expectedHeaders = [
      'Curso',
      'Nombre',
      'Fecha inicio',
      'Fecha finalización',
      'Modalidad',
      'Tipo de usuario',
      'Id regional',
      'Costo',
      'Tipo de acceso',
      'Proveedor',
      'Descripción',
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

    const courseSchedules = [];
    const errors: string[] = [];

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);

      // Saltar si la fila está completamente vacía
      const isEmpty =
        row.cellCount === 0 ||
        (Array.isArray(row.values) &&
          row.values.every((v) => !v || v.toString().trim() === ''));
      if (isEmpty) continue;

      // Leer valores
      const cells = Array.from(
        { length: expectedHeaders.length },
        (_, idx) =>
          row
            .getCell(idx + 1)
            .value?.toString()
            .trim() ?? '',
      );

      const [
        courseName,
        name,
        startStr,
        endStr,
        modality,
        typeUser,
        id_regional,
        cost,
        accessType,
        supplier,
        description,
      ] = cells;

      // Verificar campos obligatorios
      if (
        !courseName ||
        !name ||
        !startStr ||
        !endStr ||
        !modality ||
        !typeUser ||
        !id_regional ||
        !cost ||
        !accessType ||
        !supplier ||
        !description
      ) {
        errors.push(`Fila ${i}: faltan campos obligatorios.`);
        continue;
      }

      // Buscar el curso
      const course = await this.prisma.course.findFirst({
        where: { name: courseName },
      });
      if (!course) {
        errors.push(`Fila ${i}: curso "${courseName}" no encontrado.`);
        continue;
      }

      // Verificar tipo de dato fechas
      const startDate = new Date(startStr);
      const endDate = new Date(endStr);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        errors.push(`Fila ${i}: fechas inválidas.`);
        continue;
      }

      // Verificar tipo de dato costo
      const costNumber = parseInt(cost);
      if (isNaN(costNumber)) {
        errors.push(`Fila ${i}: el costo "${cost}" no es un número válido.`);
        continue;
      }

      // Verificar que accessType sea enum de CourseScheduleAccessType
      if (accessType !== 'Abierto' && accessType !== 'Cerrado') {
        errors.push(
          `Fila ${i}: el tipo de acceso "${accessType}" no es válido.`,
        );
        continue;
      }
      const accessTypeConverted = accessType === 'Abierto' ? 'OPEN' : 'CLOSED';

      // Si todo está bien, agregar a la lista
      courseSchedules.push({
        course_id: course.id,
        name,
        startDate,
        endDate,
        modality,
        typeUser,
        sessions: 0,
        id_regional,
        cost: costNumber,
        accessType: accessTypeConverted,
        supplier,
        description,
      });
    }

    if (errors.length > 0) {
      return {
        error: true,
        message: `Errores en el archivo:\n${errors.join('\n')}`,
      };
    }

    await this.prisma.courseSchedule.createMany({
      data: courseSchedules,
      skipDuplicates: true,
    });

    return {
      message: `${courseSchedules.length} cronogramas creados exitosamente.`,
    };
  }

  async findCourseSchedule(query: FindCourseScheduleDto, token: string) {
    const userInfo = await this.userInfo.jwtDecodeRann(token);

    const courseData = await this.prisma.course.findFirst({
      where: {
        name: query.courseName,
      },
    });

    //Logger.debug(courseData);

    if (courseData) {
      if (query.unemployed) {
        const unemployedSchedules = await this.prisma.courseSchedule.findMany({
          where: {
            AND: [
              { startDate: { gt: new Date() } },
              { typeUser: 'Cesante' },
              { course_id: courseData.id },
            ],
          },
        });

        if (unemployedSchedules.length) {
          let validatedSchedules = [];
          for (const schedule of unemployedSchedules) {
            const conflict = await this.validateUserScheduleConflict(
              userInfo.identification_type,
              userInfo.identification_number,
              schedule.id,
            );
            if (conflict.conflict && conflict.conflictType) {
              validatedSchedules.push({
                ...schedule,
                conflict: conflict.conflict,
                conflict_type: conflict.conflictType,
              });
            } else {
              validatedSchedules.push(schedule);
            }
          }
          return validatedSchedules;
        }
      } else {
        const workerSchedules = await this.prisma.courseSchedule.findMany({
          where: {
            AND: [
              { startDate: { gt: new Date() } },
              { typeUser: 'Activo' },
              { course_id: courseData.id },
            ],
          },
        });

        if (workerSchedules.length) {
          let validatedSchedules = [];
          for (const schedule of workerSchedules) {
            const conflict = await this.validateUserScheduleConflict(
              userInfo.identification_type,
              userInfo.identification_number,
              schedule.id,
            );
            if (
              conflict.conflict &&
              conflict.conflictType
            ) {
              validatedSchedules.push({
                ...schedule,
                conflict: conflict.conflict,
                conflict_type: conflict.conflictType,
              });
            } else {
              validatedSchedules.push(schedule);
            }
          }
          return validatedSchedules;
        }
      }
    }
    return [];
  }

  async validateEmployeeCourseRegister(
    query: QueryValidateEmployeeForCourseDto,
    token: string,
  ) {
    const currentYear = new Date().getFullYear();
    const schedule = await this.prisma.courseSchedule.findUnique({
      where: {
        id: query.courseId,
      },
    });

    if (!schedule) {
      throw new InternalServerErrorException(
        'La programación solicitada no existe',
      );
    }

    const course = await this.prisma.course.findUnique({
      where: {
        id: schedule.course_id,
      },
    });

    if (!course) {
      throw new InternalServerErrorException('El curso solicitado no existe');
    }

    const courseHistory = await this.prisma.courseHistory.findMany({
      where: {
        AND: [
          { course: course.name },
          { document: parseInt(query.documentNumber) },
          {
            year: {
              gt: currentYear - 3,
            },
          },
        ],
      },
    });

    if (courseHistory.length >= 1) {
      Logger.warn('User History Match!');
      Logger.warn(query);
      Logger.warn(courseHistory);
      return false;
    }
    return true;
  }

  async findBusinessAuthorizedBySchedule(id_schedule: string) {
    const businessAutorized = await this.prisma.businessProfile.findMany({
      where: {
        courseSchedule: {
          some: {
            id: id_schedule,
          },
        },
      },
    });

    const response = businessAutorized.map((business) => {
      const dataBusiness =
        (business.data as { DataBusiness?: { BusinessName?: string } }) || {};
      return {
        id: business.id,
        document_number: business.document_number,
        name: dataBusiness.DataBusiness?.BusinessName,
      };
    });

    return response;
  }

  async assignBusinessToSchedule(
    assignBusinessToScheduleDto: AssignBusinessToBScheduleDto,
    schedule_id: string,
  ) {
    const schedule = await this.prisma.courseSchedule.update({
      where: { id: schedule_id },
      data: {
        businessProfile: {
          connect: { id: assignBusinessToScheduleDto.business_id },
        },
      },
    });

    return schedule;
  }

  async findBeneficiarySchedules() {
    const schedules = await this.prisma.courseSchedule.findMany({
      where: {
        typeUser: 'Beneficiario',
      },
    });
    return schedules;
  }
}
