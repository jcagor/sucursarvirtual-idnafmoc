import { IsString } from 'class-validator';

export class FormUploadGroupFileDto {
  @IsString()
  groupName: string;

  @IsString()
  defaultTest: string;
}

export class QueryUpdateUserExamDto {
  @IsString()
  assignationId: string;

  @IsString()
  assignedExam: string;
}

export class QueryEnableExamRetakeDto {
  @IsString()
  assignationId: string;

  @IsString()
  retakeReason: string;
}
