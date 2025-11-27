import { PartialType } from '@nestjs/swagger';
import { CreateUserMpacDto } from './create-user-mpac.dto';

export class UpdateUserMpacDto extends PartialType(CreateUserMpacDto) {}
