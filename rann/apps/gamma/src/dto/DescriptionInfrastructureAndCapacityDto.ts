import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DescriptionInfrastructureAndCapacityDto {
  @IsNumber()
  @IsNotEmpty()
  TotalEmployees: number | null;

  @IsNumber()
  @IsNotEmpty()
  NumberLocations: number | null;

  @IsString()
  @IsNotEmpty()
  WorkingModality: string;

  @IsString()
  @IsNotEmpty()
  MainProductsAndServices: string;

  @IsString()
  @IsNotEmpty()
  MainMarkets: string;

  @IsString()
  @IsNotEmpty()
  MainCompetitors: string;

  @IsString()
  @IsNotEmpty()
  MainSuppliers: string;

  @IsString()
  @IsNotEmpty()
  MainProductsOrServicesPurchased: string;

  @IsString()
  @IsNotEmpty()
  RegistrationsOrCertificationsOrPatents: string;

  @IsString()
  @IsNotEmpty()
  SocialResponsibilityActions: string;

  [key: string]: string | number | boolean | object | null;
}
