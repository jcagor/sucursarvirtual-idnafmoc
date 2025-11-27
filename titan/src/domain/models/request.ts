import { Campaign, Status, WorkFlow } from ".";
import { Company } from "./company";

export interface Form {
  campaign: string;
  document: string;
  fullname: string;
  cellphone: string;
  documentType: string;
}

export interface Request {
  userCellphone?: string;
  userDocument?: string;
  userFullName?: string;
  userTypeDocument?: string;
  campaignId?: string;
  campaigns?: Campaign;
  createdAt: string;
  form?: CreateForm;
  id: string;
  radicate: string;
  requestsAudit?: [];
  status?: Status;
  statusId?: number;
  updatedAt?: string;
  workflowId?: string;
  workflows?: WorkFlow;
  beneffitDocumentType?: string;
  beneffitDocument?: string;
  beneffitFullname?: string;
}

export interface CreateRequest {
  userCellphone?: string;
  userDocument?: string;
  userFullName?: string;
  userTypeDocument?: string;
  campaignId: string;
  companyId?: string;
  form?: CreateForm;
  radicate?: string;
  statusId: number;
  workflowId: string;
  referenceAcronym: string;
  statusRnec?: string;
} //

export interface CreateForm {
  header: FormHeader;
  content: Record<string, any>;
}

export interface FormHeader {
  version: string;
  template: string;
}

export interface UpdateRequest {
  statusId: number;
  reason?: string;
}

export interface IFindAllRequestAuditFiltersDto {
  type?: string;
}
export interface IResponseFindAllRequestsAuditsDto {
  id: string;
  requestId: string;
  statusId: number;
  type: string;
  action: string;
  form: Record<string, any>;
  createdAt: string;
  updatedAt: string | null;
}
