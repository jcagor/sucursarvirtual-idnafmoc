import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const departments = await this.prisma.department.findMany();
    const arrayDepartments = departments.map((department) => ({
      name: department.name,
    }));
    return arrayDepartments;
  }
}
