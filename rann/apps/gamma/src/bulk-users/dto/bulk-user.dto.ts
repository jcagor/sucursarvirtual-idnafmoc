import { IsArray, IsNotEmpty, IsString, IsIn, ValidateNested, IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BulkUserDto {
  @ApiProperty({ description: 'Tipo de documento', enum: ['CC', 'CE', 'NIT'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['CC', 'CE', 'NIT'])
  documentType: string;

  @ApiProperty({ description: 'Número de documento' })
  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Nombre completo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de documento de la empresa', enum: ['CC', 'CE', 'NIT'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['CC', 'CE', 'NIT'])
  companyDocumentType: string;

  @ApiProperty({ description: 'Número de documento de la empresa' })
  @IsNotEmpty()
  @IsString()
  companyDocumentNumber: string;
}

export class ValidationErrorDto {
  @ApiProperty({ description: 'Número de fila con error' })
  @IsNumber()
  row: number;

  @ApiProperty({ description: 'Lista de errores', type: [String] })
  @IsArray()
  @IsString({ each: true })
  errors: string[];
}

export class BulkUserRequestDto {
  @ApiProperty({ type: [BulkUserDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkUserDto)
  users: BulkUserDto[];
}

export class ValidationProgressDto {
  @ApiProperty()
  processedRows: number;

  @ApiProperty()
  totalRows: number;

  @ApiProperty({ type: [ValidationErrorDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidationErrorDto)
  errors: ValidationErrorDto[];

  @ApiProperty({ type: [BulkUserDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkUserDto)
  validData: BulkUserDto[];
}

export class BulkUserResultDto {
  @ApiProperty({ type: BulkUserDto })
  @ValidateNested()
  @Type(() => BulkUserDto)
  user: BulkUserDto;

  @ApiProperty()
  success: boolean;

  @ApiProperty({ required: false })
  error?: string;
}

export class BulkUserResponseDto {
  @ApiProperty()
  totalProcessed: number;

  @ApiProperty()
  successful: number;

  @ApiProperty()
  failed: number;

  @ApiProperty({ type: [BulkUserResultDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkUserResultDto)
  results: BulkUserResultDto[];
} 