import { IsNotEmpty, IsString, IsNumber, IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class UsuarioDto {
  @IsNotEmpty()
  @IsString()
  tipo_identificacion: string;

  @IsNotEmpty()
  @IsString()
  identificacion: string;

  @IsNotEmpty()
  @IsString()
  nombre1: string;

  @IsString()
  nombre2: string;

  @IsNotEmpty()
  @IsString()
  apellido1: string;

  @IsString()
  apellido2: string;

  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  celular: number;
}

class DatosDto {
  @IsNotEmpty()
  @IsNumber()
  id_regional: number;

  @IsNotEmpty()
  @IsString()
  id_programa: string;

  @IsNotEmpty()
  @IsString()
  codigo_matricula: string;

  @IsNotEmpty()
  @IsNumber()
  capacidad: number;

  @IsNotEmpty()
  @IsNumber()
  costo: number;

  @IsNotEmpty()
  @IsString()
  fecha_desde: string;

  @IsNotEmpty()
  @IsString()
  fecha_hasta: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UsuarioDto)
  Usuarios: UsuarioDto[];
}

export class CreateCourseRegistrationDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DatosDto)
  datos: DatosDto;
}
