import { Table } from "@tanstack/react-table";
import { Request, Status } from "domain/models";

export type GenericDataRow = { [key: string]: any };

export interface FiledDetailsCardInterface {
  filedId?: string;
  filedInforSection: FiledInfoSectionInterface;
  bodyMessage: string;
  scrollZoneContent?: string[];
  secondBodyMessage?: string;
  thridBodyMessage?: string;
  buttonTitle?: string;
  basePath?: boolean;
  requestInfo: Record<string, string>;
  canCertificate?: boolean;
  onPressBackButton?: () => void;
  request?: Request;
}
export interface FiledInfoSectionInterface {
  mainTitle: string;
  firstDescription: string;
  secondDescription?: string;
  status?: string;
  ClassNameStatus?: string;
  rightTextTitle?: string;
  rightTextDesc?: string;
}

export interface MasterDocumentTypes {
  id: string;
  name: string;
  abbreviation: string;
}

export interface RequestFilter {
  documentType?: string; // required
  document?: string; // required
  id?: string;
  status?: string; // 4: en proceso y 1. Radicado
  radicate?: string;
  statusManagement?: string;
  workflow?: string;
  campaign?: string;
  campaignId?: string; // id de la campaña de pensionados
  startCreatedAt?: string;
  endCreatedAt?: string;
  statusSeparator?: string;
  companyId?: string;
}

export interface RequestTable extends Request {
  beneffitDocumentType?: string;
  beneffitDocument?: string;
  beneffitFullName?: string;
}

export interface IFindAllRequests {
  requests: Request[];
  trecords: number;
}

export interface TableDataParams {
  table: Table<GenericDataRow>;
  isLoading?: boolean;
  className?: string;
  columns?: string[];
}

export interface TableParams {
  columns: string[];
  rows?: React.JSX.Element[][];
  className?: string;
}

export interface ScrollZoneInterface {
  children: React.ReactNode;
  width?: string;
  height?: string;
  scrollDirection?: "vertical" | "horizontal";
  className?: string;
}

export interface OptionsCardInterface {
  name: string;
  document: string;
  affiliationDate: string;
  onPressBackButton: () => void;
}
