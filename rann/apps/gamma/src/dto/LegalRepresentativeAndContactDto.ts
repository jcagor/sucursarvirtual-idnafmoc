import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LegalRepresentativeAndContactDto {
  @IsString()
  @IsNotEmpty()
  NameLegalRepresentative: string;

  @IsDecimal()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(5)
  IdentificationLegalRepresentative: number;

  @IsDecimal()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(7)
  @MaxLength(10)
  PhoneLegalRepresentative: number;

  @IsString()
  @IsNotEmpty()
  MailLegalRepresentative: string;

  @IsString()
  @IsNotEmpty()
  NameContact: string;

  @IsDecimal()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(5)
  IdentificationContact: number;

  @IsDecimal()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(7)
  @MaxLength(10)
  PhoneContact: number;

  @IsString()
  @IsNotEmpty()
  MailContact: string;

  [key: string]: string | number | boolean | object | null;
}
