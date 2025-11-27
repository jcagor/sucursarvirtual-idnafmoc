import { PartialType } from '@nestjs/swagger';
import { CreateFormUtilDto } from './create-form-util.dto';

export class UpdateFormUtilDto extends PartialType(CreateFormUtilDto) {}
