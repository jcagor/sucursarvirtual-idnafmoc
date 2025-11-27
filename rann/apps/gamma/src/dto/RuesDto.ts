import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RuesDto {
  @IsString()
  @IsNotEmpty()
  Sector: string;

  @IsString()
  @IsNotEmpty()
  SalesYears1: string;

  @IsString()
  @IsNotEmpty()
  SalesYears2: string;

  @IsString()
  @IsNotEmpty()
  SalesYears3: string;

  @IsString()
  @IsNotEmpty()
  ValueFinancialObligations: string;

  @IsString()
  @IsNotEmpty()
  ValueFinishedProductInventory: string;

  [key: string]: string | number | boolean | object | null;
}
