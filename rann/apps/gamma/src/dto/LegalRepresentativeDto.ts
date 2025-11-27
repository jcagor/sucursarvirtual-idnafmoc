import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LegalRepresentativeDto {
  @IsString()
  @IsNotEmpty()
  NameLegalRepresentative: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(7)
  @MaxLength(10)
  IdentificationLegalRepresentative: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(7)
  @MaxLength(10)
  PhoneLegalRepresentative: number;

  @IsString()
  @IsNotEmpty()
  MailLegalRepresentative: string;

  [key: string]: string | number | boolean | object | null;
}
