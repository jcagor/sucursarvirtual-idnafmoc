import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DescriptionDto {
  @IsString()
  @IsNotEmpty()
  History: string;

  @IsString()
  @IsNotEmpty()
  Sector: string;

  @IsString()
  @IsNotEmpty()
  MainEconomicActivity: string;

  @IsString()
  @IsNotEmpty()
  Rating: string;

  @IsNumber()
  @IsNotEmpty()
  YearsOfOperation: number;

  @IsString()
  @IsNotEmpty()
  ValueProposition: string;

  [key: string]: string | number | boolean | object | null;
}
