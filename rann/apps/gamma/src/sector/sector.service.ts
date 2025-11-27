import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectorService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const sectors = await this.prisma.sector.findMany();
    const arraySectors = sectors.map((sector) => ({
      name: sector.name,
    }));
    return arraySectors;
  }
}
