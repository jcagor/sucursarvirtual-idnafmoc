import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurseHistory(years_back: number, document_id: number) {
    const YEARS_TO_FIND = new Date().getFullYear() - years_back;

    const courses_taken = await this.prisma.courseHistory.findMany({
      where: {
        AND: [
          {
            document: document_id,
          },
          {
            year: { gt: YEARS_TO_FIND },
          },
        ],
      },
    });

    /*
    console.log("#######  Courses taken from " +YEARS_TO_FIND+ " year:   #######");
    console.log("USER IDENTIFICATION: ", document_id);
    console.log(courses_taken);
    console.log("#######  Courses taken from " +YEARS_TO_FIND+ " year:   #######");
    */

    return courses_taken;
  }

  async findAvailableForUser(years_back: number, id: number) {
    const YEARS_TO_FIND = new Date().getFullYear() - years_back;

    const courses_available = await this.prisma.trainingCourse.findMany({
      // where:{
      //   start_date:{gt: new Date()}
      // }
    });
    console.log('Courses available: ', courses_available);
    const courses_taken = await this.getCurseHistory(years_back, id);
    console.log('Courses taken: ', courses_taken);

    const courses_available_take = courses_available.filter(
      (course_available) => {
        // Verificar si el curso ya fue tomado
        const isCourseTaken = courses_taken.some(
          (course_taken) => course_taken.name === course_available.name,
        );
        return !isCourseTaken;
      },
    );
    console.log('Courses available take: ', courses_available_take);

    return courses_available_take;
  }

  async findAll() {
    return await this.prisma.trainingCourse.findMany();
  }
}
