import axios, {
  AxiosResponse,
  HttpStatusCode,
  type AxiosInstance,
} from "axios";
import {
  ContactBusinessTypes,
  LegalRepresentativeBusinessTypes,
  DataBusinessTypes,
  BusinessDescriptionTypes,
  SubsectorTypes,
  CityTypes,
  SectorTypes,
  AnalisysSelfManagemenType,
  AnswerSelfManagementType,
  RuesType,
  AppointmentType,
  ReportSelfManagemenType,
  SaveAssistanceRecordFormStatus,
  RangeDateType,
  CourseType,
  EmployeeType,
  QueryValidateEmployeeForCourse,
  UserCourseValidationInterface,
  QueryDeleteCourseRegistration,
  UserCourseDeleteInterface,
  PendingTechRecordSignList,
  AssistanceRecordBusinessSignQuery,
  CourseScheduleType,
} from "domain/models";
import { CourseCurriculumType } from "domain/models/CourseCurriculumType";
import { CourseSessionType } from "domain/models/CourseSessionType";
import { DepartmentTypes } from "domain/models/DepartmentTypes";
import { DescriptionInfrastructureAndCapacityType } from "domain/models/DescriptionInfrastructureAndCapacityType";
import { FinancialInformationType } from "domain/models/FinancialInformationType";
import { PostulationType } from "domain/models/PostulationType";
import {
  ProgramInscription,
  ProgramObjectList,
  ProgramType,
  ScheduleObjectList,
} from "domain/models/ProgramType";
import { ResponseCreateCourseRegistration } from "domain/models/ResponseCreateCourseRegistration";
import { responseIsValidBusinessType } from "domain/models/responseIsValidBusinesType";
import { IRannRepository } from "domain/repositories/business.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { BUSINESS_STATUS, SelectOption } from "lib";

@injectable()
export class RannRepository implements IRannRepository {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosBusinessInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async IsFormBusinessProfileCompleted(
    accessToken: string
  ): Promise<boolean | undefined> {
    const URL = "/isFormBusinessProfileCompleted";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async IsSelfManagementAvailable(
    accessToken: string
  ): Promise<boolean | undefined> {
    const URL = "/selfManagement/isSelfManagementAvailable";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getDataBusiness(
    accessToken: string
  ): Promise<DataBusinessTypes | undefined> {
    const URL = "/getDataBusiness";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getDataLegalRepresentativeAndContact(
    accessToken: string
  ): Promise<
    (LegalRepresentativeBusinessTypes & ContactBusinessTypes) | undefined
  > {
    const URL = "/getDataLegalRepresentativeAndContact";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getDataBusinessDescription(
    accessToken: string
  ): Promise<BusinessDescriptionTypes | undefined> {
    const URL = "/getDataBusinessDescription";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getDataDescriptionInfrastructureAndCapacity(
    accessToken: string
  ): Promise<DescriptionInfrastructureAndCapacityType | undefined> {
    const URL = "/getDataDescriptionInfrastructureAndCapacity";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getDataFinancialInformation(
    accessToken: string
  ): Promise<FinancialInformationType | undefined> {
    const URL = "/getDataFinancialInformation";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createDataBusiness(
    accessToken: string,
    dataBusiness: DataBusinessTypes
  ): Promise<Request | undefined> {
    const URL = "/dataBusiness";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        dataBusiness,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createDataLegalRepresentativeAndContact(
    accessToken: string,
    dataLegalRepresentativeAndContact: LegalRepresentativeBusinessTypes &
      ContactBusinessTypes
  ): Promise<Request | undefined> {
    const URL = "/dataLegalRepresentativeAndContact";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        dataLegalRepresentativeAndContact,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createDataBusinessDescription(
    accessToken: string,
    dataBusinessDescription: BusinessDescriptionTypes
  ): Promise<Request | undefined> {
    const URL = "/dataBusinessDescription";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        dataBusinessDescription,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createDataDescriptionInfrastructureAndCapacity(
    accessToken: string,
    dataDescriptionInfrastructureAndCapacity: DescriptionInfrastructureAndCapacityType
  ): Promise<Request | undefined> {
    const URL = "/dataDescriptionInfrastructureAndCapacity";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        dataDescriptionInfrastructureAndCapacity,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createDataFinancialInformation(
    accessToken: string,
    dataFinancialInformation: FinancialInformationType
  ): Promise<Request | undefined> {
    const URL = "/dataFinancialInformation";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        dataFinancialInformation,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findAllDepartments(
    accessToken: string
  ): Promise<DepartmentTypes[] | undefined> {
    const URL = "/department";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findAllCities(accessToken: string): Promise<CityTypes[] | undefined> {
    const URL = "/city";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findAllSectors(
    accessToken: string
  ): Promise<SectorTypes[] | undefined> {
    const URL = "/sector";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findSubsectorsBySector(
    sectorName: string,
    accessToken: string
  ): Promise<SubsectorTypes[] | undefined> {
    const URL = "/subsector/by-sector/" + sectorName;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createSelfManagement(
    accessToken: string,
    answerSelfManagement: AnswerSelfManagementType
  ): Promise<Request | undefined> {
    const URL = "/selfManagement";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        answerSelfManagement,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
  async GetAnalisys(
    accessToken?: string
  ): Promise<AnalisysSelfManagemenType | undefined> {
    if (!accessToken) return;
    const URL = "/selfManagement/analysis";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async GetReport(
    accessToken?: string
  ): Promise<ReportSelfManagemenType | undefined> {
    if (!accessToken) return;
    const URL = "/selfManagement/report";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async SaveRuesInformation(
    accessToken: string,
    dataRues: RuesType
  ): Promise<Request | undefined> {
    const URL = "/SaveRues";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        dataRues,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getAppointmentByBusiness(
    rangeDate: RangeDateType,
    accessToken: string
  ): Promise<AppointmentType[] | undefined> {
    const URL = "/appointment/by-business";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        rangeDate,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getOptions(
    selectOptionsName: string,
    accessToken: string
  ): Promise<Array<SelectOption> | undefined> {
    try {
      const URL = `/form-utils/select/${selectOptionsName}`;
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createAppointment(
    accessToken: string,
    appointment: AppointmentType
  ): Promise<Request | undefined> {
    const URL = "/appointment";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      console.log("createAppointment", appointment);
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        appointment,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async saveAssistanceRecordForm(
    formData: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/appointment/tech-assistance-cert", formData, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al guardar el formulario de Acta de Soporte: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getTechRecordSignList(
    data: {},
    accessToken: string
  ): Promise<PendingTechRecordSignList | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get("/appointment/tech-assistance-cert/sign-pending/list", config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al consultar las Actas de Soporte pendientes de firma: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getAnalystTechReport(
    query: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined> {
    const recordId = "id" in query ? query.id : undefined;

    if (!recordId) {
      return;
    }

    const URL = `/appointment/tech-assistance-cert/${recordId}`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async queryBusinessTechReportSign(
    query: AssistanceRecordBusinessSignQuery,
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/appointment/tech-assistance-cert/business-sign", query, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al firmar el Actas de Soporte: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getSelectOptionsForm(
    data: {
      selectOptionsName: string;
      selectFilterString?: string;
    },
    accessToken: string
  ): Promise<Array<SelectOption> | undefined> {
    try {
      const filterPathString = data.selectFilterString
        ? `/${data.selectFilterString}`
        : "";
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get(
          "/form-utils/select/" + data.selectOptionsName + filterPathString,
          config
        )
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al leer opciones desde el servidor: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async findAllCourses(accessToken: string): Promise<CourseType[] | undefined> {
    const URL = "/course";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findCourseSheduleByCourseId(
    course_id: string,
    accessToken: string
  ): Promise<CourseType[] | undefined> {
    const URL = `/course-schedule/by-course/${course_id}`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createCourseRegistration(
    courseSheeduleId: string,
    employess: EmployeeType[],
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined> {
    const URL = `/courses/business`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      course_schedule_id: courseSheeduleId,
      employees: employess,
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        data,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findCourseCurriculumByCourseSheduleId(
    courseSchedule_id: string,
    accessToken?: string
  ): Promise<CourseCurriculumType[] | undefined> {
    const URL = `/course-curriculum/by-course-schedule/${courseSchedule_id}/`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createProgram(
    program: ProgramType,
    accessToken: string
  ): Promise<Request | undefined> {
    const URL = "/saveProgram";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        program,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getDataProgram(accessToken: string): Promise<ProgramType | undefined> {
    const URL = "/getDataProgram";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findAllPrograms(
    accessToken: string
  ): Promise<ProgramObjectList | undefined> {
    const URL = "/program/for-business";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findSchedulesByProgramId(
    data: { id: string },
    accessToken: string
  ): Promise<ScheduleObjectList | undefined> {
    const URL = `/program/program-schedule/by-program/${data.id}`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async programBusinessInscription(
    data: ProgramInscription,
    accessToken: string
  ): Promise<ProgramInscription | undefined> {
    const URL = `/program/business/inscription`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        data,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getEmployeesAvailableByBussiness(
    courseSheeduleId: string,
    accessToken: string
  ): Promise<EmployeeType[] | undefined> {
    const URL = `/course-schedule/employees-available-by-bussiness/${courseSheeduleId}`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getRegisteredEmployeesBySchedule(
    courseScheduleId: string
  ): Promise<PostulationType[] | undefined> {
    const URL = `/courses/business/registered-employees/${courseScheduleId}`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async prevalidationBusiness(
    program: ProgramType
  ): Promise<responseIsValidBusinessType | undefined> {
    const URL = "/business-validation/prevalidation";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        program,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  } //t

  async validationRuesBusiness(
    program: ProgramType
  ): Promise<responseIsValidBusinessType | undefined> {
    const URL = "/business-validation/rues";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        program,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  } //t

  async validateEmployeeCourseRegister(
    query: QueryValidateEmployeeForCourse,
    token: string
  ): Promise<UserCourseValidationInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let result = {
        status: false,
        response_code: HttpStatusCode.NoContent,
      };

      const response = await this.axiosInstance
        .post("/course-schedule/validate-check/employee", query, config)
        .then((result) => result.data);
      //console.log("FOMENTO RESP:", response);

      if (response !== undefined) {
        if (response === true) {
          result.status = true;
          result.response_code = HttpStatusCode.Ok;
          return result;
        } else if (response === false) {
          result.response_code = HttpStatusCode.Ok;
          return result;
        } else {
          result.response_code = HttpStatusCode.PayloadTooLarge;
          return result;
        }
      }
      return;
    } catch (error) {
      console.log(error);
      console.log(
        `Error al consultar estado para el usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  } //tnu

  async deleteEmployeeCourseRegister(
    query: QueryDeleteCourseRegistration,
    token: string
  ): Promise<UserCourseDeleteInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let result = {
        status: false,
        response_code: HttpStatusCode.NoContent,
      };

      const response = await this.axiosInstance
        .delete(
          `/courses/business/registered-employees/${query.registrationId}`,
          config
        )
        .then((result) => result.data);

      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(error);
      console.log(
        `Error al eliminar la postulación: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  } //t

  async isValidatedBusiness(token: string): Promise<boolean | undefined> {
    const URL = "/business-validation";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  } //t

  async getBusinessStatus(): Promise<BUSINESS_STATUS | undefined> {
    const URL = "/business-validation/business-status";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  } //t

  async findSchedule(
    id: string,
    accessToken: string
  ): Promise<CourseScheduleType | undefined> {
    try {
      const URL = `/course-schedule/${id}`;
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  } //nt

  async FindAllSessionBySchedule(
    schedule_id: string,
    accessToken: string
  ): Promise<CourseSessionType[] | undefined> {
    const URL = `/course-session/by-schedule/${schedule_id}`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async sendSelfManagementToMail(file: File): Promise<boolean | undefined> {
    const URL = "/selfManagement/sendSelfManagementToMail";
    const formData = new FormData();
    formData.append("file", file);
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        formData,
        requestOptions
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

export default RannRepository;
