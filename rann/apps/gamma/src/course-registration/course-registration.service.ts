import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCourseRegistrationDto } from './dto/create-course-registration.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  CreateCourseRegistrationByBusinessDto,
  CreateCourseUnemployedRegistrationDto,
  CreateCourseWorkerRegistrationDto,
} from './dto/create-course-registration-by-business.dto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { CourseScheduleAccessType } from '../course-schedule/entities/CourseScheduleAccessType';
import { ResumeInformation } from '../curriculum/entities/curriculum.entity';
import {
  queryUserAndCourseValidationDto,
  queryUserValidationDto,
} from './dto/coursePreValidation';
import { IpaasServicesService } from '../ipaas-services/ipaas-services.service';
import { UserMpacDataInterface } from '../user-mpac/entities/user-mpac.entity';
import {
  MPAC_API_RESULT_CODE_ENUM,
  MPAC_API_USER_REQUIREMENT_STATUS_ENUM,
  MPAC_API_USER_TYPE_ENUM,
} from '../dto/MpacStatusStructure';
import { UserInfoService } from '../user-info/user-info.service';
import { scheduled } from 'rxjs';
import {
  CONFLICT_TYPE,
  ConflictInformation,
  Intersection,
  IntersectionList,
} from './types/courseRegistration.types';

@Injectable()
export class CourseRegistrationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly ipaasServices: IpaasServicesService,
    private readonly userInfo: UserInfoService,
  ) {}

  // Util function
  async validateScheduleAndSessionConflict(
    documentType: string,
    documentNumber: string,
    newScheduleId: string,
    findFirstOnly: boolean = true,
    validateMaxCourses: boolean = true,
  ): Promise<ConflictInformation> {
    const MAXIMUM_COURSES_REGISTRATION = 2;
    const TIME_OVERLAP_ERROR_MSG = `Se encontraron conflictos de horario entre tus cursos activos y el curso seleccionado.`;
    let sessionIntersections: IntersectionList = [];

    const enrollValidation = await this.prisma.courseRegistration.findFirst({
      select: {
        courseSchedule_id: true,
      },
      where: {
        courseSchedule_id: newScheduleId,
        document_type: documentType,
        document_number: documentNumber,
      },
    });

    if (enrollValidation) {
      //Logger.debug(`/!\\ - ENROLLED Conflict detected!`);
      return {
        conflict: true,
        conflictMessage: `Ya se encuentra registrado en el curso.`,
        conflictType: CONFLICT_TYPE.ALREADY_ENROLLED,
      } as ConflictInformation;
    }

    const currentSchedules = await this.prisma.courseRegistration.findMany({
      select: {
        courseSchedule_id: true,
      },
      where: {
        document_type: documentType,
        document_number: documentNumber,
      },
    });

    if (currentSchedules && currentSchedules.length) {
      for (const schedule of currentSchedules) {
        const sessionList = await this.prisma.courseSession.findMany({
          where: {
            courseSchedule_id: schedule.courseSchedule_id,
          },
        });

        if (sessionList && sessionList.length) {
          if (
            validateMaxCourses &&
            sessionList.length > MAXIMUM_COURSES_REGISTRATION
          ) {
            return {
              conflict: true,
              conflictMessage: `Conflicto detectado, alcanzaste el número máximo de cursos permitidos: ${MAXIMUM_COURSES_REGISTRATION}`,
              conflictType: CONFLICT_TYPE.MAXIMUM_REACHED,
              maximumCoursesAllowed: MAXIMUM_COURSES_REGISTRATION,
            } as ConflictInformation;
          }

          const newSessionList = await this.prisma.courseSession.findMany({
            where: {
              courseSchedule_id: newScheduleId,
            },
          });

          for (const session of sessionList) {
            // Current session
            const startTime = session.startTime.split(':');
            const endTime = session.endTime.split(':');
            const sessionStartTime = new Date(session.date);
            const sessionEndTime = new Date(session.date);

            sessionStartTime.setHours(
              parseInt(startTime.at(0)),
              parseInt(startTime.at(1)),
            );
            sessionEndTime.setHours(
              parseInt(endTime.at(0)),
              parseInt(endTime.at(1)),
            );

            for (const newSession of newSessionList) {
              // New Session
              const newStartTime = newSession.startTime.split(':');
              const newEndTime = newSession.endTime.split(':');
              const newSessionStartTime = new Date(newSession.date);
              const newSessionEndTime = new Date(newSession.date);

              newSessionStartTime.setHours(
                parseInt(newStartTime.at(0)),
                parseInt(newStartTime.at(1)),
              );
              newSessionEndTime.setHours(
                parseInt(newEndTime.at(0)),
                parseInt(newEndTime.at(1)),
              );

              //Logger.debug('Conflict Revision -------------->');
              //Logger.debug(`startTime ${sessionStartTime.toISOString()}`);
              //Logger.debug(`endTime ${sessionEndTime.toISOString()}`);
              //Logger.debug(`newStartTime ${newSessionStartTime.toISOString()}`);
              //Logger.debug(`newEndTime ${newSessionEndTime.toISOString()}`);

              if (
                sessionStartTime <= newSessionEndTime &&
                sessionEndTime <= newSessionStartTime
              ) {
                //Logger.debug(`/!\\ - OVERLAP Conflict detected!`);

                sessionIntersections.push({
                  sessionId: session.id,
                  newSessionId: newSession.id,
                } as Intersection);

                if (findFirstOnly) {
                  return {
                    conflict: true,
                    conflictMessage: TIME_OVERLAP_ERROR_MSG,
                    conflictType: CONFLICT_TYPE.TIME_OVERLAP,
                    conflictList: sessionIntersections,
                  } as ConflictInformation;
                }
              }
            }
          }
        }
      }
    }

    if (sessionIntersections.length) {
      return {
        conflict: true,
        conflictMessage: TIME_OVERLAP_ERROR_MSG,
        conflictType: CONFLICT_TYPE.TIME_OVERLAP,
        conflictList: sessionIntersections,
      } as ConflictInformation;
    }

    // No conflicts
    return {
      conflict: false,
    } as ConflictInformation;
  }

  async saveInscriptionAttemptHistoryEvent(
    documentType: string,
    documentNumber: string,
    scheduleId: string,
    additionalInfo: {},
  ) {
    return this.prisma.courseInscriptionAttemptHistory.create({
      data: {
        identification_type: documentType,
        identification_number: documentNumber,
        courseSchedule_id: scheduleId,
        additional_info: additionalInfo,
      },
    });
  }

  // Service functions
  async findCoursesByDocument(documentNumber: string) {
    const registrations = await this.prisma.courseRegistration.findMany({
      where: {
        document_number: documentNumber,
      },
      include: {
        courseSchedule: {
          include: {
            course: true,
          },
        },
      },
    });

    return registrations.map((registration) => ({
      created_at: registration.createdAt.toISOString(),
      updated_at: registration.updatedAt.toISOString(),
      name: registration.courseSchedule.course.name,
      duration_hours: 40, // Dummy: duración estándar de un curso
      maximum_inscribed: 30, // Dummy: capacidad máxima típica
      minimum_inscribed: 5, // Dummy: mínimo para iniciar curso
      target_population: registration.courseSchedule.typeUser,
      observation: registration.courseSchedule.course.description,
      course_schedule: registration.courseSchedule.sessions,
      offer_frequency: registration.courseSchedule.modality,
      certification_entity: 'Comfandi', // Dummy: entidad certificadora
      formation_line: 'Desarrollo Personal', // Dummy: línea de formación
      region: 'Valle del Cauca', // Dummy: región por defecto
    }));
  }

  async create(createCourseRegistrationDto: CreateCourseRegistrationDto) {
    const { datos } = createCourseRegistrationDto;
    const usuario = datos.Usuarios[0];

    // 1. Buscar en TrainingCourse
    const trainingCourse = await this.prisma.trainingCourse.findFirst({
      where: {
        id: datos.id_programa.toString(),
      },
    });

    if (!trainingCourse) {
      console.log('Buscando curso con ID:', datos.id_programa);
      throw new BadRequestException(
        'El curso no existe en el sistema de formación',
      );
    }

    // 2. Buscar el courseSchedule activo a través de la tabla intermedia
    const trainingCourseSchedule = await this.prisma.$queryRaw<Array<any>>`
      SELECT tcs.*, cs.* 
      FROM "TrainingCourseSchedule" tcs
      JOIN "courseSchedule" cs ON cs.id = tcs.course_schedule_id
      WHERE tcs.training_course_id = ${trainingCourse.id}
      AND cs.state = 'Active'
      LIMIT 1
    `;

    if (!trainingCourseSchedule || trainingCourseSchedule.length === 0) {
      // Si no existe la relación, la creamos
      const courseSchedule = await this.prisma.courseSchedule.create({
        data: {
          name: trainingCourse.name,
          startDate: new Date(datos.fecha_desde),
          endDate: new Date(datos.fecha_hasta),
          modality: 'Virtual',
          typeUser: 'Active',
          sessions: 1,
          id_regional: '1',
          cost: 0,
          accessType: CourseScheduleAccessType.OPEN,
          supplier: 'Comfandi',
          state: 'Active',
          description: trainingCourse.observation || '',
          course: {
            create: {
              name: trainingCourse.name,
              description: trainingCourse.observation || '',
              iconUrl: '/img/course_default.png',
            },
          },
        },
      });

      // Creamos la relación en TrainingCourseSchedule
      await this.prisma.$executeRaw`
        INSERT INTO "TrainingCourseSchedule" (id, training_course_id, course_schedule_id, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), ${trainingCourse.id}, ${courseSchedule.id}::uuid, NOW(), NOW())
      `;

      return {
        success: true,
        message: 'Curso registrado exitosamente',
        data: {
          courseSchedule_id: courseSchedule.id,
          document_number: usuario.identificacion,
          document_type_id: usuario.tipo_identificacion,
        },
      };
    }

    const courseSchedule = trainingCourseSchedule[0];

    // 3. Verificar cupos disponibles
    const currentRegistrations = await this.prisma.courseRegistration.count({
      where: {
        courseSchedule_id: courseSchedule.id,
      },
    });

    if (currentRegistrations >= datos.capacidad) {
      throw new BadRequestException(
        'El curso ha alcanzado su capacidad máxima',
      );
    }

    // 4. Verificar que el usuario no esté ya registrado
    const existingRegistration = await this.prisma.courseRegistration.findFirst(
      {
        where: {
          courseSchedule_id: courseSchedule.id,
          document_number: usuario.identificacion,
        },
      },
    );

    if (existingRegistration) {
      throw new BadRequestException(
        'El usuario ya está registrado en este curso',
      );
    }

    // 5. Crear el registro
    const registration = await this.prisma.courseRegistration.create({
      data: {
        courseSchedule_id: courseSchedule.id,
        document_number: usuario.identificacion,
        document_type: usuario.tipo_identificacion,
        firstName: usuario.nombre1,
        middleName: usuario.nombre2,
        firstLastName: usuario.apellido1,
        middleLastName: usuario.apellido2,
        phoneNumber: usuario.celular.toString(),
        email: usuario.email,
        gender: usuario.genero,
      },
    });

    // 6. Crear el historial
    await this.prisma.courseHistory.create({
      data: {
        key: usuario.identificacion,
        course: trainingCourse.id,
      },
    });

    return {
      success: true,
      message: 'Curso registrado exitosamente',
      data: registration,
    };
  }

  async createByBusiness(
    createCourseRegistrationByBusinessDto: CreateCourseRegistrationByBusinessDto,
    token: string,
  ) {
    const courseScheduleId =
      createCourseRegistrationByBusinessDto.course_schedule_id;

    // Verificar que usuario ya este registrado
    const duplicates: string[] = [];
    for (const employee of createCourseRegistrationByBusinessDto.employees) {
      const existing = await this.prisma.courseRegistration.findFirst({
        where: {
          courseSchedule_id: courseScheduleId,
          document_number: employee.document_number,
        },
      });
      if (existing) {
        duplicates.push(employee.document_number);
      }
    }
    if (duplicates.length > 0) {
      return {
        error: true,
        message: `Ya existe un registro para los siguientes empleados con los siguientes documentos: ${duplicates.join(', ')}`,
      };
    }

    //Crear postulación del curso
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const coursePostulation = await this.prisma.coursePostulation.create({
      data: {
        courseSchedule_id: courseScheduleId,
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const results = await Promise.all(
      createCourseRegistrationByBusinessDto.employees.map(async (employee) => {
        const data = {
          courseSchedule_id: courseScheduleId,
          coursePostulation_id: coursePostulation.id,
          document_number: employee.document_number,
          document_type: employee.document_type,
          firstName: employee.firstName,
          middleName: employee.middleName,
          firstLastName: employee.firstLastName,
          middleLastName: employee.middleLastName,
          phoneNumber: employee.phoneNumber,
          email: employee.email,
          gender: employee.gender,
        };
        return await this.prisma.courseRegistration.create({ data });
      }),
    );

    const numberRegisteredEmployees =
      await this.prisma.courseRegistration.count({
        where: {
          courseSchedule_id: courseScheduleId,
        },
      });

    const finalResponse = {
      numberEmployeesRegisteredNow: results.length,
      totalNumberRegisteredEmployees: numberRegisteredEmployees,
      numberEmployeesToStartCourse: this.config.getOrThrow(
        'numberEmployeesToStartCourse',
      ),
    };

    const termsAndConditionsAcceptedLog =
      await this.prisma.userTermsAcceptedHistory.create({
        data: {
          identification_number: identification_number,
          identification_type: identification_type,
          terms_conditions_accepted: true,
          additional_info: finalResponse,
        },
      });

    return {
      ...finalResponse,
      termsAcceptedInformation: termsAndConditionsAcceptedLog,
    };
  }

  async createUnemployedRegistration(
    query: CreateCourseUnemployedRegistrationDto,
    token: string,
  ) {
    const YEARS_BACK = 3;
    const YEARS_TO_FIND = new Date().getFullYear() - YEARS_BACK;
    const MAXIMUM_COURSES_TAKEN = 3;
    const courseScheduleId = query.course_schedule_id;

    // Revisar que usuario no este registrado.
    const duplicates: string[] = [];

    const existing = await this.prisma.courseRegistration.findFirst({
      where: {
        courseSchedule_id: courseScheduleId,
        document_number: query.unemployed.document_number,
      },
    });
    if (existing) {
      duplicates.push(query.unemployed.document_number);
    }

    if (duplicates.length > 0) {
      return {
        error: true,
        message: `Ya existe un registro para el usuario con el documento: ${duplicates.join(', ')}`,
      };
    }

    // Validación numero de cursos tomados en los últimos 3 años.
    const courses_taken = await this.prisma.courseHistory.findMany({
      where: {
        AND: [
          { document: parseInt(query.unemployed.document_number) },
          { year: { gt: YEARS_TO_FIND } },
        ],
      },
    });

    if (courses_taken.length >= MAXIMUM_COURSES_TAKEN) {
      return {
        error: true,
        message:
          `Ya tomaste mas de ${MAXIMUM_COURSES_TAKEN} cursos en los últimos ${YEARS_BACK} años,` +
          ` no puedes realizar una nueva inscripción.`,
      };
    }

    //Crear postulación del curso
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    // Validate inscription conflicts on sessions and schedules.
    const conflicts = await this.validateScheduleAndSessionConflict(
      identification_type,
      identification_number,
      courseScheduleId,
    );

    if (conflicts.conflict) {
      return {
        error: true,
        message:
          conflicts.conflictMessage ??
          `Conflicto detectado al realizar la inscripción, contacta a soporte técnico`,
        errorCode: conflicts.conflictType,
      };
    }

    const userCurriculum = await this.prisma.curriculumInformation.findFirst({
      where: {
        AND: [
          { identification_type: query.unemployed.document_type },
          { identification_number: query.unemployed.document_number },
        ],
      },
    });

    const curriculumUserData: ResumeInformation =
      userCurriculum.information as {} as ResumeInformation;

    const coursePostulation = await this.prisma.coursePostulation.create({
      data: {
        courseSchedule_id: courseScheduleId,
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const data = {
      courseSchedule_id: courseScheduleId,
      coursePostulation_id: coursePostulation.id,
      document_number: query.unemployed.document_number,
      document_type: query.unemployed.document_type,
      firstName: query.unemployed.firstName,
      middleName: query.unemployed.middleName,
      firstLastName: query.unemployed.firstLastName,
      middleLastName: query.unemployed.middleLastName,
      phoneNumber: curriculumUserData.generalInfo.cellphone,
      email: query.unemployed.email,
      gender:
        query.unemployed.gender == ''
          ? curriculumUserData.generalInfo.gender
          : 'Otro',
    };
    const results = await this.prisma.courseRegistration.create({ data });

    const numberRegisteredEmployees =
      await this.prisma.courseRegistration.count({
        where: {
          courseSchedule_id: courseScheduleId,
        },
      });

    return {
      numberEmployeesRegisteredNow: results,
      totalNumberRegisteredEmployees: numberRegisteredEmployees,
      numberEmployeesToStartCourse: this.config.getOrThrow(
        'numberEmployeesToStartCourse',
      ),
    };
  }

  async createWorkerRegistration(
    query: CreateCourseWorkerRegistrationDto,
    token: string,
  ) {
    const YEARS_BACK = 3;
    const YEARS_TO_FIND = new Date().getFullYear() - YEARS_BACK;
    const courseScheduleId = query.course_schedule_id;

    // Revisar que usuario no este registrado.
    const duplicates: string[] = [];

    const existing = await this.prisma.courseRegistration.findFirst({
      where: {
        courseSchedule_id: courseScheduleId,
        document_number: query.employee.document_number,
      },
    });
    if (existing) {
      duplicates.push(query.employee.document_number);
    }

    if (duplicates.length > 0) {
      return {
        error: true,
        message:
          `Al parecer ya estas registrado en este curso, ` +
          `Ya existe un registro para el usuario con el documento: ${duplicates.join(', ')}`,
      };
    }

    // validar mismo curso en los últimos 3 años.
    const selected_schedule = await this.prisma.courseSchedule.findUnique({
      where: {
        id: query.course_schedule_id,
      },
      include: {
        course: true,
      },
    });

    //Logger.debug("INFO CURSE:" , parseInt(query.employee.document_number) , YEARS_TO_FIND, selected_schedule.course.name )

    const course_taken = await this.prisma.courseHistory.findMany({
      where: {
        AND: [
          { document: parseInt(query.employee.document_number) },
          { year: { gt: YEARS_TO_FIND } },
          { course: selected_schedule.course.name },
        ],
      },
    });

    if (course_taken.length >= 1) {
      return {
        error: true,
        message:
          `Ya tomaste el curso ${selected_schedule.course.name} cursos en los últimos ${YEARS_BACK} años,` +
          ` no puedes realizar una nueva inscripción.`,
      };
    }

    //Crear postulación del curso
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    // Validate inscription conflicts on sessions and schedules.
    const conflicts = await this.validateScheduleAndSessionConflict(
      identification_type,
      identification_number,
      courseScheduleId,
    );

    if (conflicts.conflict) {
      const registerHistoryEvent =
        await this.saveInscriptionAttemptHistoryEvent(
          identification_type,
          identification_number,
          courseScheduleId,
          conflicts,
        );

      return {
        error: true,
        message:
          conflicts.conflictMessage ??
          `Conflicto detectado al realizar la inscripción, contacta a soporte técnico`,
        errorCode: conflicts.conflictType,
      };
    }

    const coursePostulation = await this.prisma.coursePostulation.create({
      data: {
        courseSchedule_id: courseScheduleId,
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const data = {
      courseSchedule_id: courseScheduleId,
      coursePostulation_id: coursePostulation.id,
      document_number: query.employee.document_number,
      document_type: query.employee.document_type,
      firstName: query.employee.firstName,
      middleName: query.employee.middleName,
      firstLastName: query.employee.firstLastName,
      middleLastName: query.employee.middleLastName,
      phoneNumber: query.employee.phoneNumber,
      email: query.employee.email,
      gender: query.employee.gender != '' ? query.employee.gender : 'Otro',
    };
    const results = await this.prisma.courseRegistration.create({ data });

    const numberRegisteredEmployees =
      await this.prisma.courseRegistration.count({
        where: {
          courseSchedule_id: courseScheduleId,
        },
      });

    return {
      numberEmployeesRegisteredNow: results,
      totalNumberRegisteredEmployees: numberRegisteredEmployees,
      numberEmployeesToStartCourse: this.config.getOrThrow(
        'numberEmployeesToStartCourse',
      ),
    };
  }

  async findRegisteredEmployeesByCourseSchedule(courseScheduleId: string) {
    const postulations = await this.prisma.coursePostulation.findMany({
      where: {
        courseSchedule_id: courseScheduleId,
      },
      include: {
        courseRegistration: true,
      },
    });

    return postulations;
  }

  async deleteRegisteredEmployeesByCourseSchedule(
    postulationId: string,
    token: string,
  ) {
    const businessInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);
    const MINIMUM_EMPLOYEES_IN_COURSE = 30;

    const currentPostulation = await this.prisma.coursePostulation.findUnique({
      where: {
        id: postulationId,
      },
      include: {
        courseRegistration: true,
      },
    });

    const scheduleInfo = await this.prisma.courseSchedule.findUnique({
      where: {
        id: currentPostulation.courseSchedule_id,
      },
      include: {
        course: true,
      },
    });

    // delete validations
    const currentDate = new Date('now');

    // check if there are 3 days or more to the start date.
    const threeDaysMs = 3600 * 24 * 3 * 1000;
    const threeDaysToStartTheCourse =
      scheduleInfo.startDate.getTime() - threeDaysMs;
    if (currentDate.getTime() > threeDaysToStartTheCourse) {
      return {
        error: true,
        message: 'La programación paso la fecha limite para retiro',
      };
    }

    // check the total number employees in the course:
    let totalEmployeesRegistered = currentPostulation.courseRegistration.length;

    // check the number employees in the course for the current postulation:
    let totalEmployeesCurrentBusiness =
      currentPostulation.courseRegistration.length;

    // Check the number of remaining employees after delete
    const numberRegistrantsRemaining =
      totalEmployeesRegistered - totalEmployeesCurrentBusiness;

    if (numberRegistrantsRemaining <= MINIMUM_EMPLOYEES_IN_COURSE) {
      return {
        error: true,
        message:
          'No se puede realizar el retiro debido a los limites del curso',
      };
    }

    currentPostulation.courseRegistration.forEach(async (reg) => {
      const employeesDelete = await this.prisma.courseRegistration.delete({
        where: {
          id: reg.id,
        },
      });
    });

    const postulationDelete = await this.prisma.coursePostulation.delete({
      where: {
        id: postulationId,
      },
    });

    return {
      success: true,
    };
  }

  // To be called from TIONE backend (Fomento)
  async courseAssignationPreValidation(
    queryInformation: queryUserAndCourseValidationDto,
  ) {
    const YEARS_BACK = 3;
    const YEARS_TO_FIND = new Date().getFullYear() - YEARS_BACK;

    // Validación numero de cursos tomados en los últimos 3 años.
    const courses_taken = await this.prisma.courseHistory.findMany({
      where: {
        AND: [
          { document: parseInt(queryInformation.identification_number) },
          { year: { gt: YEARS_TO_FIND } },
        ],
      },
    });

    if (courses_taken.length >= 1) {
      for (const requiredCourse of queryInformation.courses) {
        if (courses_taken.findIndex((c) => requiredCourse == c.course))
          return {
            error: true,
            message:
              `Ya se tomo el curso ${requiredCourse} en los últimos ${YEARS_BACK} años,` +
              ` no puedes realizar una nueva inscripción.`,
          };
      }
    }

    return {
      error: false,
      message: ``,
      courses_taken: courses_taken,
    };
  }

  async courseAssignationUserPreValidation(
    queryInformation: queryUserValidationDto,
  ) {
    // User information
    const queryData = {
      documentType: queryInformation.identification_type,
      identification: queryInformation.identification_number,
    };

    // Not necessary token, client is Tione BackEnd, MPAC-VALIDATION internally.
    const token = '';

    const userStatus = await this.ipaasServices.requestMpacStatus(
      queryData,
      token,
    );

    if (userStatus) {
      const currentStatus: UserMpacDataInterface =
        userStatus as {} as UserMpacDataInterface;

      if (currentStatus.State == MPAC_API_RESULT_CODE_ENUM.OK) {
        if (currentStatus.Client_Document_number == queryData.identification) {
          if (
            currentStatus.Affiliation_type == MPAC_API_USER_TYPE_ENUM.CESANT
          ) {
            if (
              currentStatus.Description ==
              MPAC_API_USER_REQUIREMENT_STATUS_ENUM.OK
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }
}
