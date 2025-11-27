import { IsString } from 'class-validator';

export class AssignBusinessToBScheduleDto {
  @IsString()
  business_id: string;
}
