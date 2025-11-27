import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const cities = await this.prisma.city.findMany();
    const arrayCities = cities.map((city) => ({
      name: city.name,
    }));
    return arrayCities;
  }
}
