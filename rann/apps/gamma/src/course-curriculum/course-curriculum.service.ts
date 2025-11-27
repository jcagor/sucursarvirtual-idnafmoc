import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseCurriculumService {
  constructor(private readonly prisma: PrismaService) {}
  findByCourseSchedule(id: string) {
    return this.prisma.courseCurriculumMesh.findMany({
      where: { courseSchedule_id: id },
      orderBy: { session: 'asc' },
    });
  }
}
