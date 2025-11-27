import { Injectable } from '@nestjs/common';
import { CreateCourseSessionDto } from './dto/create-course-session.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class CourseSessionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseSessionDto: CreateCourseSessionDto) {
    return this.prisma.courseSession.create({
      data: {
        courseSchedule_id: createCourseSessionDto.schedule_id,
        name: createCourseSessionDto.name,
        typeSession: createCourseSessionDto.typeSession,
        startTime: createCourseSessionDto.startTime,
        endTime: createCourseSessionDto.endTime,
        date: createCourseSessionDto.date,
      },
    });
  }

  findBySchedule(schedule_id: string) {
    return this.prisma.courseSession.findMany({
      where: { courseSchedule_id: schedule_id },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.courseSession.findUnique({
      where: { id: id },
    });

    return {
      id: session.id,
      schedule_id: session.courseSchedule_id,
      name: session.name,
      typeSession: session.typeSession,
      startTime: session.startTime,
      endTime: session.endTime,
      date: session.date,
    };
  }

  update(id: string, UpdateCourseDto: any) {
    return this.prisma.courseSession.update({
      where: { id: id },
      data: {
        name: UpdateCourseDto.name,
        typeSession: UpdateCourseDto.typeSession,
        startTime: UpdateCourseDto.startTime,
        endTime: UpdateCourseDto.endTime,
        date: UpdateCourseDto.date,
      },
    });
  }

  async bulkLoading(fileBuffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];

    const expectedHeaders = [
      'Curso',
      'Cronograma',
      'Nombre',
      'Tipo sesión',
      'Fecha',
      'Hora inicio',
      'Hora fin',
    ];

    // Leer encabezados
    const headerRow = worksheet.getRow(1);
    const actualHeaders = expectedHeaders.map(
      (_, idx) =>
        headerRow
          .getCell(idx + 1)
          .value?.toString()
          .trim() ?? '',
    );

    const headersMatch = expectedHeaders.every(
      (h, idx) => h === actualHeaders[idx],
    );
    if (!headersMatch) {
      return {
        error: true,
        message: `Los encabezados del archivo no coinciden.\nEsperado: ${expectedHeaders.join(', ')}\nRecibido: ${actualHeaders.join(', ')}`,
      };
    }

    const sessions = [];
    const errors: string[] = [];

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);

      // Ignorar filas completamente vacías
      const isEmpty =
        row.cellCount === 0 ||
        (Array.isArray(row.values) &&
          row.values.every((v) => !v || v.toString().trim() === ''));
      if (isEmpty) continue;

      const cells = Array.from(
        { length: 7 },
        (_, idx) =>
          row
            .getCell(idx + 1)
            .value?.toString()
            .trim() ?? '',
      );

      const [
        courseName,
        scheduleName,
        name,
        typeSession,
        dateStr,
        startTimeStr,
        endTimeStr,
      ] = cells;

      // Validar campos vacíos
      if (
        !courseName ||
        !scheduleName ||
        !name ||
        !typeSession ||
        !dateStr ||
        !startTimeStr ||
        !endTimeStr
      ) {
        errors.push(`Fila ${i}: campos obligatorios faltantes.`);
        continue;
      }

      // Buscar ID del curso y cronograma
      const courseSchedule = await this.prisma.courseSchedule.findFirst({
        where: {
          name: scheduleName,
          course: { name: courseName },
        },
        include: { course: true },
      });

      if (!courseSchedule) {
        errors.push(
          `Fila ${i}: No se encontró el cronograma "${scheduleName}" del curso "${courseName}".`,
        );
        continue;
      }

      const rawDate = row.getCell(5).value as Date;
      const rawStartTime = row.getCell(6).value as Date;
      const rawEndTime = row.getCell(7).value as Date;

      // Validación básica
      if (
        !(rawDate instanceof Date) ||
        !(rawStartTime instanceof Date) ||
        !(rawEndTime instanceof Date)
      ) {
        errors.push(`Fila ${i}: formato de fecha u hora inválido.`);
        continue;
      }

      const date = new Date(rawDate);
      const startTime = formatTimeToString(rawStartTime);
      const endTime = formatTimeToString(rawEndTime);

      sessions.push({
        courseSchedule_id: courseSchedule.id,
        name,
        typeSession,
        date,
        startTime,
        endTime,
      });
    }

    if (errors.length > 0) {
      return {
        error: true,
        message: `Errores en el archivo:\n${errors.join('\n')}`,
      };
    }

    console.log(sessions);

    const result = await this.prisma.courseSession.createMany({
      data: sessions,
      skipDuplicates: true,
    });

    console.log(result);

    return { message: `${sessions.length} sesiones creadas exitosamente.` };
  }
}

function formatTimeToString(time: Date): string {
  const hours = time.getUTCHours().toString().padStart(2, '0');
  const minutes = time.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
