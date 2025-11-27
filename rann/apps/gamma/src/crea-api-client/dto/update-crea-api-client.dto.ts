import { PartialType } from '@nestjs/swagger';
import { CreateCreaApiClientDto } from './create-crea-api-client.dto';

export class UpdateCreaApiClientDto extends PartialType(CreateCreaApiClientDto) {}
