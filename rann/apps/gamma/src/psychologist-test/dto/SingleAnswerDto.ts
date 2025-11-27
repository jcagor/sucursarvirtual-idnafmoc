import { IsBoolean, IsString } from 'class-validator';

export class SingleAnswerDto {
  @IsString()
  id: string;

  @IsString()
  PsyTestQuestions_id: string;

  @IsString()
  question: string;

  @IsBoolean()
  answer: boolean;
}
