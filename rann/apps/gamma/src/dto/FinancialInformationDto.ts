import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FinancialInformationDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  SalesYears1: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  SalesYears2: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  SalesYears3: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  ValueAssetsYear1: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  ValueAssetsYear2: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  ValueAssetsYear3: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  ValueFinancialObligations: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  ValueRawMaterialsInventory: number | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9.]+$/, {
    message: 'El campo debe contener solo dígitos y puntos.',
  })
  ValueFinishedProductInventory: number | null;

  @IsString()
  @IsNotEmpty()
  CompletedBy: string;

  @IsDecimal()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @MinLength(7)
  @MaxLength(10)
  Phone: number | null;

  [key: string]: string | number | boolean | object | null;
}
