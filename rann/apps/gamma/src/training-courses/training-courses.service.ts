import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { Prisma } from '@prisma/client';
import { UserInfoService } from '../user-info/user-info.service';
import { CourseRegistrationService } from '../course-registration/course-registration.service';
import { CONFLICT_TYPE } from '../course-registration/types/courseRegistration.types';

@Injectable()
export class TrainingCoursesService {
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
  async findAvailableForUser(
    years_back: number,
    document_number: number,
    token: string,
  ) {
    const userInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    //const userData:KeycloakResponse = this.userInfo.jwtDecodeRann(token);
    const ACTIVE_USER_COURSE_TYPE = 'Trabajador activo';
    const COURSE_CLOSE_TYPE = 'CLOSED';
    const COURSE_OPEN_TYPE = 'OPEN';

    //if (userData.identification_number != document_number.toString()){
    //  return {};
    //}

    const YEARS_TO_FIND = new Date().getFullYear() - years_back;

    // Obtener cursos disponibles
    const open_courses_available = await this.prisma.courseSchedule.findMany({
      where: {
        AND: [
          { startDate: { gt: new Date() } },
          { typeUser: ACTIVE_USER_COURSE_TYPE },
          { accessType: COURSE_OPEN_TYPE },
        ],
      },
      include: {
        course: true,
      },
    });

    // Obtain list of closed courses
    const query = Prisma.sql`
      SELECT
      "courseSchedule".*
      FROM "courseSchedule"
      INNER JOIN "CourseRegistration" on "courseSchedule".id = "CourseRegistration"."courseSchedule_id"
      WHERE
      "accessType"='CLOSED'
      AND "CourseRegistration".document_number = ${userInfo.identification_number}
      AND "CourseRegistration".document_type = ${userInfo.identification_type}`;

    const closed_courses_registered = await this.prisma.$queryRaw(query);
    //Logger.debug(query.values);
    //Logger.debug(query.strings);
    //Logger.debug(open_courses_available);
    //Logger.debug(closed_courses_registered);
    //Logger.debug(userInfo.identification_number);
    //Logger.debug(userInfo.identification_type)

    // Obtener historial de cursos
    const courses_taken = await this.prisma.courseHistory.findMany({
      where: {
        AND: [{ document: document_number }, { year: { gt: YEARS_TO_FIND } }],
      },
    });

    // Filtrar cursos ya tomados
    const courses_available_take = open_courses_available.filter(
      (course_available) => {
        const isCourseTaken = courses_taken.some(
          (course_taken) =>
            course_taken.name === course_available.course.name ||
            course_taken.name === course_available.name,
        );
        return !isCourseTaken;
      },
    );

    let availableSchedules = [];
    if (
      Array.isArray(closed_courses_registered) &&
      closed_courses_registered.length >= 1
    ) {
      availableSchedules = [
        ...courses_available_take,
        ...closed_courses_registered,
      ];
    } else {
      availableSchedules = courses_available_take;
    }

    if (availableSchedules.length) {
      //Logger.debug(availableSchedules);
      let conflictValidatedSchedules = [];

      for (const schedule of availableSchedules) {
        const conflict = await this.validateUserScheduleConflict(
          userInfo.identification_type,
          userInfo.identification_number,
          schedule.id,
        );
        if (
          conflict.conflict &&
          conflict.conflictType
        ) {
          conflictValidatedSchedules.push({
            ...schedule,
            conflict: conflict.conflict,
            conflict_type: conflict.conflictType,
          });
        }else{          
          conflictValidatedSchedules.push(schedule);
        }
      }

      //Logger.debug(conflictValidatedSchedules);
      return conflictValidatedSchedules;
    }
    return availableSchedules;

    // Agregar datos dummy
    /*.map(course => ({
      ...course,
      schedule_details: {
        days: ['Lunes', 'Miércoles'],
        time: '6:00 PM - 9:00 PM',
        total_sessions: 12
      },
      instructor: {
        name: 'Juan Pérez',
        specialty: 'Desarrollo Web'
      },
      materials: {
        required: ['Laptop', 'Cuaderno'],
        provided: ['Manual del curso', 'Certificado']
      },
      location: course.course_schedule?.toLowerCase().includes('presencial') ? {
        address: 'Calle 23 # 45-67',
        room: 'Sala de Capacitación 1'
      } : undefined
    }));*/
  }
}
