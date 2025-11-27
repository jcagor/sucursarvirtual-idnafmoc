import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyGuard } from '@app/shared/modules/auth/guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, ApiKeyGuard],
  imports: [ConfigModule],
})
export class CourseModule {}
