import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubsectorService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllBySector(name: string) {
    const sector = await this.prisma.sector.findFirst({ where: { name } });

    const subsectors = await this.prisma.subsector.findMany({
      where: { sector: { id: sector.id } },
    });

    const arraySubsectors = subsectors.map((city) => ({
      name: city.name,
    }));
    return arraySubsectors;
  }
}
