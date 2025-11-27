import {
  DocumentType,
  Department,
  City,
  Community,
  Reserve,
  CreateRequest,
  Request,
  Pac,
  Log,
  RightsVerifyInterface,
  UpdateRequest,
  Campaign,
  Status,
  Options,
  Configuration,
  Entities,
  EconomicActivity,
  Occupation,
  IFindMassiveAttachment,
  IFindAllRequestAuditFiltersDto,
  IResponseFindAllRequestsAuditsDto,
} from "domain/models";
import { CampaignsFilter } from "lib";
import { IFindAllRequests } from "lib/types/table";

export interface IRiaRepository {
  getDocumentTypes(accessToken: string): Promise<DocumentType[] | undefined>;
  getDepartments(accessToken: string): Promise<Department[] | undefined>;
  getCities(accessToken: string): Promise<City[] | undefined>;
  getCommunities(accessToken: string): Promise<Community[] | undefined>;
  getReserves(accessToken: string): Promise<Reserve[] | undefined>;
  createRequest(
    accessToken: string,
    createRequest: CreateRequest,
    file?: File[]
  ): Promise<Request | undefined>;
  affiliatePAC(accessToken: string, pacForm: Pac): Promise<Log | undefined>;
  rightsVerify(
    accessToken: string,
    documentNumber: string,
    documentType: string
  ): Promise<RightsVerifyInterface | undefined>;
  updateRequest(
    requestToUpdateId: string,
    request: UpdateRequest,
    accessToken?: string
  ): Promise<Request | undefined>;
  findAllCampaignsFiltered(
    accessToken?: string,
    filters?: CampaignsFilter[] | undefined
  ): Promise<Campaign[] | undefined>;
  findAll(accessToken: string): Promise<Status[] | undefined>;
  findAllRequest(
    accessToken: string,
    page?: number,
    pageSize?: number,
    filters?: CampaignsFilter
  ): Promise<IFindAllRequests | undefined>;
  withdrawalPAC(
    accessToken: string,
    tipoAfiliado: string,
    tipoDocumento: string,
    numeroDocumento: string,
    tipoDocumentoAfiliado: string,
    numeroDocumentoAfiliado: string,
    fechaVigenciaHasta: string,
    motivoRetiro: string
  ): Promise<Log[] | undefined>;

  download(accessToken: string, route: string): Promise<string | undefined>;
  getOptions(accessToken: string): Promise<Options | undefined>;

  findConfigByName(
    name: string,
    accessToken?: string
  ): Promise<Configuration | undefined>;

  getEntities(
    accessToken: string,
    claseInterlocutor: string
  ): Promise<Entities | undefined>;

  getAportantStatus(
    accessToken: string,
    documentNumber: string,
    documentType: string,
    typeAffiliate: string
  ): Promise<any | undefined>;

  getEconomicActivities(
    accessToken: string
  ): Promise<EconomicActivity[] | undefined>;

  getOccupations(accessToken: string): Promise<Occupation[] | undefined>;

  findMassiveAttachmentByFiled(
    accessToken: string,
    filedId?: string,
    radicate?: string,
    company?: string
  ): Promise<IFindMassiveAttachment | undefined>;

  generateCerticate(
    filedId: string,
    requestType: string,
    requestStatus: string,
    requestDate: string,
    requestId: string,
    contentInfo: Record<string, string>,
    accessToken: string
  ): Promise<any | undefined>;

  getAudits(
    accessToken: string,
    radicate: string,
    filters: IFindAllRequestAuditFiltersDto
  ): Promise<IResponseFindAllRequestsAuditsDto[] | undefined>
}
