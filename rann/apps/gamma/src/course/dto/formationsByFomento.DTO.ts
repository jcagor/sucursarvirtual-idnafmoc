import { IsString, IsNotEmpty } from 'class-validator';

export class FormationByFomentoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  standardized_course: string;
}
