import { IsArray, IsString, ValidateIf } from 'class-validator';
import { SelectOption } from '../form-utils/entities/form-util.entity';

export class AssignConsultantToBusinessDto {
  @IsString()
  business_id: string;

  @ValidateIf((o) => o.consultant_id === 'string')
  @IsString()
  @ValidateIf((o) => Array.isArray(o))
  @IsArray()
  consultant_id: string | Array<SelectOption>;
}
