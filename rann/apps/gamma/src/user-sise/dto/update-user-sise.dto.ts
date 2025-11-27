import { PartialType } from '@nestjs/swagger';
import { CreateUserSiseDto } from './create-user-sise.dto';

export class UpdateUserSiseDto extends PartialType(CreateUserSiseDto) {}
