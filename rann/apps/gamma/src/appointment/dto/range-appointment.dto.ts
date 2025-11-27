import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class rangeDateAppointmentDto {
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  [key: string]: string | number | boolean | object | null;
}

export class rangeDateAppointmentBusinessDto extends rangeDateAppointmentDto{
  @IsNotEmpty()
  businessId:string;

  @IsOptional()
  multiBusiness:Array<string>;
}

export class queryByBusinessDto {
  @IsNotEmpty()
  businessId:string;
}