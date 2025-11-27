import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataBusinessDto {
  @IsString()
  @IsNotEmpty()
  BusinessName: string;

  @IsNumber()
  @IsNotEmpty()
  RUT: number;

  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsString()
  @IsNotEmpty()
  City: string;

  @IsString()
  @IsNotEmpty()
  Department: string;

  @IsString()
  @IsNotEmpty()
  WebPage: string;

  [key: string]: string | number | boolean | object | null;
}
