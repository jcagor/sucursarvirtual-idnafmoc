import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  NameContact: string;

  @IsNumber()
  @IsNotEmpty()
  IdentificationContact: number;

  @IsString()
  @IsNotEmpty()
  PhoneContact: string;

  @IsEmail()
  @IsNotEmpty()
  MailContact: string;

  [key: string]: string | number | boolean | object | null;
}
