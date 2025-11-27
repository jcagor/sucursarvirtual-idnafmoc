import { AppointmentType } from '@prisma/client';
import {
  FormCustomFileEntity,
  FormCustomFileEntityList,
  S3FileList,
} from '../entities/tech-assistance.entity';
import {
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  businessProfile_id: string;

  @IsNumber()
  @IsNotEmpty()
  document_number: number;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  attendance: string;

  @IsNotEmpty()
  @IsString()
  type: AppointmentType;

  [key: string]: string | number | boolean | object | null;
}

export class CreateTechAssistanceDto {
  @IsNotEmpty()
  appointmentId: string;

  @IsNotEmpty()
  assistance: string;

  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  operator: string;

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;

  @IsNotEmpty()
  interventionTime: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  assignedConsultor: string;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  assistant: string;

  @IsNotEmpty()
  sessionScope: string;

  @IsNotEmpty()
  signOneName: string;

  @IsOptional()
  signTwoName: string;

  @IsNotEmpty()
  signOneDocument: string;

  @IsOptional()
  signTwoDocument: string;

  @IsNotEmpty()
  evidence: FormCustomFileEntityList;

  @IsNotEmpty()
  signOneEvidence: FormCustomFileEntityList;

  @IsOptional()
  signTwoEvidence: FormCustomFileEntityList;

  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  consultantId: string;

  @IsOptional()
  commitments: string;

  @IsOptional()
  deliverables: string;
}

export class PatchTechAssistanceDto extends CreateTechAssistanceDto {
  @IsNotEmpty()
  @IsString()
  originalId: string;

  @IsOptional()
  evidence: FormCustomFileEntityList;

  @IsOptional()
  signOneEvidence: FormCustomFileEntityList;

  @IsOptional()
  signTwoEvidence: FormCustomFileEntityList;

  @IsOptional()
  imagesMarkedToRemove: Array<number>;
}

export class RevisionStructure {
  @IsNotEmpty()
  observation: string;
}

export class ReviewStructure {
  @IsOptional()
  revision?: RevisionStructure;
}

export class CreateTechAssistanceRevision {
  @IsNotEmpty()
  record_id: string;

  @IsNotEmpty()
  review: ReviewStructure;

  @IsNotEmpty()
  status: string;
}

export class BusinessSignQueryDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  signTwoName: string;

  @IsNotEmpty()
  signTwoDocument: string;

  @IsNotEmpty()
  signTwoEvidence: FormCustomFileEntityList;
}
