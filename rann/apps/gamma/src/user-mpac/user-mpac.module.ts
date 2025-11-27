import { Module } from '@nestjs/common';
import { UserMpacService } from './user-mpac.service';
import { UserMpacController } from './user-mpac.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from '@app/shared/modules/auth/guards/api-key.guard';

@Module({
  controllers: [UserMpacController],
  providers: [UserMpacService, PrismaService, ApiKeyGuard],
  imports:[ConfigModule]
})
export class UserMpacModule {}
