import { Injectable, Logger } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { PrismaService } from '../prisma/prisma.service';
import { HealthQueryList } from './entities/health-check';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly city: CityService,
    private readonly prisma: PrismaService,
  ) {}

  async findAllCities() {
    try {
      const cities = await this.city.findAll();
      if (cities && cities.length) {
        Logger.debug('health check OK, read cities:', cities.length);
        return true;
      }
    } catch (error) {
      Logger.fatal('HEALTH CHECK ERROR', error);
      return false;
    }
  }

  async checkPostgres ():Promise<Array<{}>|undefined> {
    try {
      const registers:HealthQueryList = await this.prisma.$queryRaw`
        SELECT count(table_type) from information_schema.tables 
        WHERE table_type = 'VIEW'`;

      Logger.debug(
        `HealthCheck, Number of views ${JSON.stringify(registers, (_, v) => (typeof v === 'bigint' ? v.toString() : v))}`,
      );     

      return registers;

    } catch (error) {
      Logger.fatal('HEALTH CHECK ERROR', error);
      return;
    }
  }
}
