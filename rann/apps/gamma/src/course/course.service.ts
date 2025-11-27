import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { EnrollmentStatusDto } from './dto/enrollment-status.DTO';
import { FormationByFomentoDto } from './dto/formationsByFomento.DTO';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async bulkLoading(fileBuffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];

    // 1. Encabezados esperados
    const expectedHeaders = ['Nombre', 'Descripción'];

    // Leer encabezados
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

    const courses = [];
    const errors: string[] = [];

    // 2. Validar cada fila
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);

      // Saltar filas vacías
      const isEmpty =
        row.cellCount === 0 ||
        (Array.isArray(row.values) &&
          row.values.every((v) => !v || v.toString().trim() === ''));
      if (isEmpty) continue;

      const [name, description] = [
        row.getCell(1).value?.toString().trim() ?? '',
        row.getCell(2).value?.toString().trim() ?? '',
      ];

      // Validaciones de campos obligatorios
      if (!name || !description) {
        errors.push(
          `Fila ${i}: faltan campos obligatorios (Nombre o Descripción).`,
        );
        continue;
      }

      courses.push({
        name,
        description,
        iconUrl: '/icons/financial-analysis-chart.png',
      });
    }

    if (errors.length > 0) {
      return {
        error: true,
        message: `Errores en el archivo:\n${errors.join('\n')}`,
      };
    }

    await this.prisma.course.createMany({
      data: courses,
      skipDuplicates: true,
    });

    return {
      message: `${courses.length} cursos creados exitosamente.`,
    };
  }

  async getEnrollmentStatus(getEnrollmentStatusDto: EnrollmentStatusDto[]) {
    const orConditions = getEnrollmentStatusDto.map((u) => ({
      document_type: u.document_type,
      document_number: u.document_number,
      courseSchedule: {
        course: {
          name: u.nameCourse,
        },
      },
    }));

    const registrations = await this.prisma.courseRegistration.findMany({
      where: { OR: orConditions },
      include: {
        courseSchedule: {
          include: {
            course: {
              select: { name: true },
            },
            courseRegistration: {
              select: { id: true },
            },
          },
        },
      },
    });

    const result = getEnrollmentStatusDto.map((user) => {
      const found = registrations.find(
        (r) =>
          r.document_type === user.document_type &&
          r.document_number === user.document_number &&
          r.courseSchedule.course.name === user.nameCourse,
      );

      if (found) {
        const inscritos = found.courseSchedule.courseRegistration.length;
        const cupoDisponible = 30 - inscritos;

        return {
          ...user,
          nameSchedule: found.courseSchedule.name,
          startDate: found.courseSchedule.startDate,
          cupoDisponible,
        };
      }

      return {
        ...user,
        message: 'Persona no inscrita',
      };
    });

    return result;
  }

  async getCoursesAvailablesByFomento(
    formationByFomentoDto: FormationByFomentoDto[],
  ) {
    if (formationByFomentoDto.length === 0) {
      return [];
    }

    const courseNames = formationByFomentoDto.map((c) => c.standardized_course);

    const courses = await this.prisma.course.findMany({
      where: {
        name: { in: courseNames },
        courseSchedules: {
          some: {
            state: 'Created',
          },
        },
      },
      include: {
        courseSchedules: {
          where: {
            state: 'Created',
          },
        },
      },
    });

    const result = formationByFomentoDto
      .map((courseInput) => {
        const found = courses.find(
          (c) => c.name === courseInput.standardized_course,
        );

        if (!found || found.courseSchedules.length === 0) return null;

        return {
          ...courseInput,
          courseSchedules: found.courseSchedules,
        };
      })
      .filter((item) => item !== null);

    return result;
  }
}
