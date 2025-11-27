import { PartialType } from '@nestjs/swagger';
import { CreateIpaasServiceDto } from './create-ipaas-service.dto';

export class UpdateIpaasServiceDto extends PartialType(CreateIpaasServiceDto) {}
