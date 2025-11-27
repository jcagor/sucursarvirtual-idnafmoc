import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSelfManagementDto {
  @IsString()
  @IsNotEmpty()
  question1: string;

  @IsString()
  @IsNotEmpty()
  question2: string;

  @IsString()
  @IsNotEmpty()
  question3: string;

  @IsString()
  @IsNotEmpty()
  question4: string;

  @IsString()
  @IsNotEmpty()
  question5: string;

  @IsString()
  @IsNotEmpty()
  question6: string;

  @IsString()
  @IsNotEmpty()
  question7: string;

  @IsString()
  @IsNotEmpty()
  question8: string;

  @IsString()
  @IsNotEmpty()
  question9: string;

  @IsString()
  @IsNotEmpty()
  question10: string;

  @IsString()
  @IsNotEmpty()
  question11: string;

  @IsString()
  @IsNotEmpty()
  question12: string;

  @IsString()
  @IsNotEmpty()
  question13: string;

  @IsString()
  @IsNotEmpty()
  question14: string;

  @IsString()
  @IsNotEmpty()
  question15: string;

  @IsString()
  @IsNotEmpty()
  question16: string;

  @IsString()
  @IsNotEmpty()
  question17: string;

  @IsString()
  @IsNotEmpty()
  question18: string;

  @IsString()
  @IsNotEmpty()
  question19: string;

  @IsString()
  @IsNotEmpty()
  question20: string;

  @IsString()
  @IsNotEmpty()
  question21: string;

  @IsString()
  @IsNotEmpty()
  question22: string;

  @IsString()
  @IsNotEmpty()
  question23: string;

  @IsString()
  @IsNotEmpty()
  question24: string;

  @IsString()
  @IsNotEmpty()
  question25: string;

  @IsString()
  @IsNotEmpty()
  question26: string;

  @IsString()
  @IsNotEmpty()
  question27: string;

  @IsString()
  @IsNotEmpty()
  question28: string;

  @IsString()
  @IsNotEmpty()
  question29: string;

  @IsString()
  @IsNotEmpty()
  question30: string;

  @IsArray()
  identified_opportunities_1: string;

  @IsArray()
  identified_opportunities_2: string;

  @IsArray()
  identified_opportunities_3: string;

  @IsArray()
  identified_opportunities_4: string;

  @IsArray()
  identified_opportunities_5: string;

  @IsArray()
  identified_opportunities_6: string;

  [key: string]: string | number | boolean | object | null;
}
