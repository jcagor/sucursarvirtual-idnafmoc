import { Module } from '@nestjs/common';
import { IpaasServicesService } from './ipaas-services.service';
import { IpaasServicesController } from './ipaas-services.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IpaasServicesController],
  providers: [IpaasServicesService],
})
export class IpaasServicesModule {}
