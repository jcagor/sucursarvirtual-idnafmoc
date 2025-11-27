import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FormProgramDto {
  @IsString()
  @IsNotEmpty()
  id_program: string;

  @IsOptional()
  @IsString()
  name: string;

  [key: string]: string | boolean | object | null;
}
