import { Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HealthCheckController } from './health-check.controller';
import { CityService } from '../city/city.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService, PrismaService, CityService],
})
export class HealthCheckModule {}
