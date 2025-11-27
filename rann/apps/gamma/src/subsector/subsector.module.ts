import { Module } from '@nestjs/common';
import { SubsectorService } from './subsector.service';
import { SubsectorController } from './subsector.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SubsectorController],
  providers: [SubsectorService, PrismaService],
})
export class SubsectorModule {}
