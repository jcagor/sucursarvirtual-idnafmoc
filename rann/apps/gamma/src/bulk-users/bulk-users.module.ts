import { Module } from '@nestjs/common';
import { BulkUsersController } from './bulk-users.controller';
import { BulkUsersService } from './bulk-users.service';

@Module({
  controllers: [BulkUsersController],
  providers: [BulkUsersService],
  exports: [BulkUsersService]
})
export class BulkUsersModule {} 