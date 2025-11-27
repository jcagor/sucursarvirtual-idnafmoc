import { AxiosResponse, type AxiosInstance } from "axios";
import {
  Campaign,
  City,
  Community,
  Configuration,
  CreateRequest,
  Department,
  DocumentType,
  EconomicActivity,
  Entities,
  IFindAllRequestAuditFiltersDto,
  IFindMassiveAttachment,
  IResponseFindAllRequestsAuditsDto,
  Log,
  Occupation,
  Options,
  Pac,
  Request,
  Reserve,
  RightsVerifyInterface,
  Status,
  UpdateRequest,
} from "domain/models";
import { CreateCertificateDto } from "domain/models/Certificate";
import { IRiaRepository } from "domain/repositories/ria.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { CampaignsFilter } from "lib";
import { IFindAllRequests, RequestFilter } from "lib/types/table";

@injectable()
export class RiaRepository implements IRiaRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosRiaInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async getDocumentTypes(
    accessToken: string
  ): Promise<DocumentType[] | undefined> {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      // Utilizar la instancia de Axios para realizar la solicitud
      const response: AxiosResponse<DocumentType[] | undefined> | undefined =
        await this.axiosInstance
          .get(`/sus/documentType`, requestOptions)
          .catch((error) => {
            // DEBUG
            // console.log(error);
            return undefined;
          });

      // Verifica si la respuesta es exitosa y devuelve los datos
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/documentType/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      // Manejar errores de la solicitud
      throw error;
    }
  }
  async getDepartments(accessToken: string): Promise<Department[] | undefined> {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      // Utilizar la instancia de Axios para realizar la solicitud
      const response: AxiosResponse<Department[] | undefined> | undefined =
        await this.axiosInstance
          .get(`/sus/department`, requestOptions)
          .catch((error) => {
            // DEBUG
            // console.log(error);
            return undefined;
          });

      // Verifica si la respuesta es exitosa y devuelve los datos
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/getDepartments/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      // Manejar errores de la solicitud
      throw error;
    }
  }
  async getCities(accessToken: string): Promise<City[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/city`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/city/findAll/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async getCommunities(accessToken: string): Promise<Community[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/community`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/community/findAll/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      //Error a mostrar desde el front
      console.error(error);
      if (error?.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  }
  async getReserves(accessToken: string): Promise<Reserve[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/reserve`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/reserve/findAll/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async createRequest(
    accessToken: string,
    createRequest: CreateRequest,
    file?: File[]
  ): Promise<Request | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/request/create`;

      const formData = new FormData();
      if (file) {
        for (let index = 0; index < file.length; index++) {
          const element = file[index];
          formData.append("files", element);
        }
      }
      formData.append("request", JSON.stringify(createRequest));

      const resp = await this.axiosInstance.post(url, formData, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/request/create  message: Respuesta no exitosa del servidor"
        );
      }
      return;
    } catch (error: any) {
      if (error?.response?.data?.radicate) {
        return error.response.data;
      }
      if (error?.response?.data) {
        return error.response.data;
      }
      return undefined;
    }
  }
  async affiliatePAC(
    accessToken: string,
    pacForm: Pac
  ): Promise<Log | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sap/affiliation/pac`;

      const resp = await this.axiosInstance.post(url, pacForm, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        throw new Error(
          "/sap/affiliation/pac  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      return;
    }
  }
  async rightsVerify(
    accessToken: string,
    documentNumber: string,
    documentType: string
  ): Promise<RightsVerifyInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sap/rightsVerify?document=${documentNumber}&documentType=${documentType}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("sap/  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }
  async updateRequest(
    requestToUpdateId: string,
    request: UpdateRequest,
    accessToken?: string
  ): Promise<Request | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/updateRequest/${requestToUpdateId}`;

      const resp = await this.axiosInstance.post(url, request, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("sus/id  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      return;
    }
  }

  async findAllCampaignsFiltered(
    accessToken?: string,
    filters?: CampaignsFilter[] | undefined
  ): Promise<Campaign[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = "sus/campaignsAvailablesFiltered";

      const resp = await this.axiosInstance.post(url, filters, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        throw new Error("Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(accessToken: string): Promise<Status[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `/sus/status`;

      const resp = await this.axiosInstance.get(url, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "status/findAll/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async findAllRequest(
    accessToken: string,
    page?: number | undefined,
    pageSize?: number | undefined,
    filters?: RequestFilter | undefined
  ): Promise<IFindAllRequests | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `sus/request?page=${page ?? 0}&pageSize=${pageSize ?? 5}`;

      // Añade filtros existentes a la URL
      if (filters) {
        Object.keys(filters).forEach((key) => {
          const value = filters[key as keyof RequestFilter];
          if (value !== undefined) {
            url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
        });
      }
      // DEBUG URL
      // console.log(url);

      const resp = await this.axiosInstance.get(url, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "requests/findAll/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async withdrawalPAC(
    accessToken: string,
    tipoAfiliado: string,
    tipoDocumento: string,
    numeroDocumento: string,
    tipoDocumentoAfiliado: string,
    numeroDocumentoAfiliado: string,
    fechaVigenciaHasta: string,
    motivoRetiro: string
  ): Promise<Log[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `sap/withdrawal/pac?tipoAfiliado=${tipoAfiliado}&tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}&tipoDocumentoAfiliado=${tipoDocumentoAfiliado}&numeroDocumentoAfiliado=${numeroDocumentoAfiliado}&fechaVigenciaHasta=${fechaVigenciaHasta}&motivoRetiro=${motivoRetiro}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        let detailResp: Log[] = resp.data;

        if (detailResp.length > 1) {
          throw new Error(detailResp[0].TextoMensaje);
        }

        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("sap/  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }

  async download(
    accessToken: string,
    route: string
  ): Promise<string | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `sus/download?file=${route}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "sus/download message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async getOptions(accessToken: string): Promise<Options | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/options`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/options message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async findConfigByName(
    name: string,
    accessToken?: string
  ): Promise<Configuration | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `sus/configuration/${name}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        throw new Error("Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }

  async getEntities(
    accessToken: string,
    claseInterlocutor: string
  ): Promise<Entities | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sap/entities?claseInterlocutor=${claseInterlocutor}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("sap/  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }
  async getAportantStatus(
    accessToken: string,
    documentNumber: string,
    documentType: string,
    typeAffiliate: string
  ): Promise<any | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `sap/aportant/status?documentNumber=${documentNumber}&documentType=${documentType}&typeAffiliate=${typeAffiliate}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("sap/  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }
  async getEconomicActivities(
    accessToken: string
  ): Promise<EconomicActivity[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const url = `/sus/economic-activity`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        throw new Error("Error al obtener las actividades económicas");
      }
    } catch (error) {
      throw error;
    }
  }

  async getOccupations(accessToken: string): Promise<Occupation[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let url = `/sus/occupation`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/sus/occupation/findAll/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async findMassiveAttachmentByFiled(
    accessToken: string,
    filedId: string,
    radicate?: string,
    company?: string
  ): Promise<IFindMassiveAttachment | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const url = `sus/massiveAttachmentByFiled?filedId=${filedId}&radicate=${radicate}&company=${company}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        throw new Error("Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }
  async generateCerticate(
    filedId: string,
    requestType: string,
    requestStatus: string,
    requestDate: string,
    requestId: string,
    contentInfo: Record<string, string>,
    accessToken: string
  ): Promise<any | undefined> {
    try {
      let url = `certificate/create`;

      const createCertificateDto: CreateCertificateDto = {
        filedId: filedId,
        requestType: requestType,
        requestStatus: requestStatus,
        requestDate: requestDate,
        requestId: requestId,
        contentInfo: contentInfo,
      };

      const resp = await this.axiosInstance.post(url, createCertificateDto, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        responseType: "blob",
      });

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/certificate/create  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getAudits(
    accessToken: string,
    radicate: string,
    filters: IFindAllRequestAuditFiltersDto
  ): Promise<IResponseFindAllRequestsAuditsDto[] | undefined> {
    try {
      // 1. ========== Sets http auth ==========
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      // 2. ========== Sets http api url ==========
      let url = `request-audit/${radicate}`;
      // 2.1. ========== Adds filters to the http url ==========
      if (filters) {
        Object.keys(filters).forEach((key, index) => {
          const value = filters[key as keyof IFindAllRequestAuditFiltersDto];
          if (value !== undefined) {
            url += `${index == 0 ? "?" : "&"}${encodeURIComponent(
              key
            )}=${encodeURIComponent(value)}`;
          }
        });
      }

      // 3. ========== Sends http request ==========
      const resp = await this.axiosInstance.get(url, config);

      // 4. ========== Validates the server response ==========
      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "request-audit message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default RiaRepository;
