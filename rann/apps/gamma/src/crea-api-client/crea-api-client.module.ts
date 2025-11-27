import { Module } from '@nestjs/common';
import { CreaApiClientService } from './crea-api-client.service';
import { CreaApiClientController } from './crea-api-client.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CreaApiClientController],
  providers: [CreaApiClientService],
})
export class CreaApiClientModule {}
