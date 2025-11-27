import axios, { AxiosResponse, type AxiosInstance } from "axios";
import {
  AppointmentType,
  AppointmentTypeList,
} from "domain/models/Appointment/AppointmentType";
import {
  AdminRangeDateType,
  RangeDateType,
} from "domain/models/Appointment/rangeDateType";
import {
  BusinessAttendedReportList,
  BusinessHoursReportList,
} from "domain/models/Appointment/reportsTypes";
import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { CourseSessionType } from "domain/models/course/CourseSessionType";
import { CourseType } from "domain/models/course/CourseType";
import { GrowthPlanType } from "domain/models/growth-plan/GrowthPlanType";
import {
  MilestonesReportList,
  MonthlyReportResponseList,
  MonthlyReportType,
  QueryMonthlyReportAdmin,
} from "domain/models/MonthlyReport/MonthlyReportType";
import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import { ProgramSessionType } from "domain/models/program/ProgramSessionType";
import {
  SaveAssistanceRecordFormStatus,
  SaveAssistanceRecordRevision,
  TechAssistanceRecordRevisionList,
  TechAssistanceCorrectionList,
} from "domain/models/tech-assistance-cert/techAssistanceForm";
import {
  ErrorInformation,
  UnvalidatedBusinessType,
} from "domain/models/UnvalidatedBusiness/UnvalidatedBusinessType";
import { UserInformationData } from "domain/models/user/UserInformation.type";
import {
  WorkPlanReportList,
  WorkPlanReportQueryType,
  WorkPlanType,
} from "domain/models/WorkPlan/WorkPlanType";
import { IRannRepository } from "domain/repositories/rann.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { SelectOption } from "lib";
import { date } from "yup";

@injectable()
export class RannRepository implements IRannRepository {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosRanningInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
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

  async createSchedule(
    accessToken: string,
    createScheduleData: CourseScheduleType
  ): Promise<CourseScheduleType | undefined> {
    try {
      const URL = "/course-schedule";
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        createScheduleData,
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

  async findAllSchedule(accessToken: string): Promise<CourseScheduleType[]> {
    try {
      const URL = "/course-schedule";
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
      return [];
    }
  }

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
  }

  async updateSchedule(
    UpdateScheduleData: CourseScheduleType,
    accessToken: string
  ): Promise<CourseScheduleType | undefined> {
    try {
      const URL = `/course-schedule/${UpdateScheduleData.id}`;
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse = await this.axiosInstance.put(
        URL,
        UpdateScheduleData,
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

  async getAdminAppointmentByBusiness(
    rangeDate: AdminRangeDateType,
    accessToken: string
  ): Promise<AppointmentType[] | undefined> {
    const URL = "/appointment/by-business/admin";
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

  async createSession(
    createSessionData: CourseSessionType,
    accessToken: string
  ): Promise<CourseSessionType | undefined> {
    const URL = "/course-session";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        createSessionData,
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

  async findScheduleBySession(
    session_id: string,
    accessToken: string
  ): Promise<CourseScheduleType | undefined> {
    try {
      const URL = `/course-schedule/by-session/${session_id}`;
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

  async findSession(
    id: string,
    accessToken: string
  ): Promise<CourseSessionType | undefined> {
    try {
      const URL = `/course-session/${id}`;
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

  async updateSession(
    updateSessionData: CourseSessionType,
    accessToken: string
  ): Promise<CourseSessionType | undefined> {
    try {
      const URL = `/course-session/${updateSessionData.id}`;
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const response: AxiosResponse = await this.axiosInstance.put(
        URL,
        updateSessionData,
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

  async createMonthlyReport(
    monthlyReport: MonthlyReportType,
    accessToken: string
  ): Promise<Request | undefined> {
    const URL = "/monthly-report";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        monthlyReport,
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

  async listAdminMonthlyReport(
    query: QueryMonthlyReportAdmin,
    accessToken: string
  ): Promise<MonthlyReportResponseList | undefined> {
    const URL = "/monthly-report/list";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        query,
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

  async listAnalystTechReports(
    query: {},
    accessToken: string
  ): Promise<TechAssistanceRecordRevisionList | undefined> {
    const URL = "/appointment/tech-assistance-cert/analyst/list";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        query,
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

  async saveAssistanceRecordCorrectionForm(
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
        .patch("/appointment/tech-assistance-cert", formData, config)
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

  async createAnalystTechReportRevision(
    query: SaveAssistanceRecordRevision,
    accessToken: string
  ): Promise<SaveAssistanceRecordRevision | undefined> {
    const URL = `/appointment/tech-assistance-cert/revision`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        query,
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

  async getBusinessHoursReport(
    data: {},
    accessToken: string
  ): Promise<BusinessHoursReportList | undefined> {
    const URL = `/appointment/tech-assistance-cert/analyst/hours-report`;
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

  async getConsultantBusinessReport(
    data: {},
    accessToken: string
  ): Promise<BusinessAttendedReportList | undefined> {
    const URL = `/appointment/tech-assistance-cert/analyst/business-report`;
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

  async getSummaryReportFile(
    data: {},
    accessToken: string
  ): Promise<Blob | undefined> {
    const axiosRequestType = {
      arraybuffer: "arraybuffer",
      blob: "blob",
      document: "document",
      json: "json",
      text: "text",
      stream: "stream",
      formdata: "formdata",
    } as const;

    type ResponseType = keyof typeof axiosRequestType;

    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        responseType: axiosRequestType.blob,
      };
      const response = await this.axiosInstance
        .post<Blob>("/monthly-report/document/summary", data, config)
        .then((result) => result.data);

      console.log("Resume Response: ", response);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al generar el Reporte: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getUserInformation(
    data: {},
    accessToken: string
  ): Promise<UserInformationData | undefined> {
    try {
      const URL = `/user-info/`;
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
      if (response) {
        return response.data;
      } else {
        return;
      }
    } catch (error) {
      console.error("error al consultar info de usuario: " + error);
      return;
    }
  }

  async listConsultantRejectedTechSupport(
    data: {},
    accessToken: string
  ): Promise<TechAssistanceCorrectionList | undefined> {
    const URL = "/appointment/tech-assistance-cert/consultant/rejected";
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

  async findAllCourses(): Promise<CourseType[] | undefined> {
    const URL = "/course";
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

  async bulkCourseLoading(file: File): Promise<Response | undefined> {
    const URL = `/course/bulk-loading`;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

  async createWorkPlan(
    createWorkPlanData: WorkPlanType
  ): Promise<WorkPlanType | undefined> {
    const URL = "/work-plan";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        createWorkPlanData,
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

  async getWorkPlanReport(
    queryData: WorkPlanReportQueryType,
    accessToken: string
  ): Promise<WorkPlanReportList | undefined> {
    const URL = "/work-plan/generate-report";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        queryData,
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

  async getMilestonesReport(
    queryData: {},
    accessToken: string
  ): Promise<MilestonesReportList | undefined> {
    const URL = "/monthly-report/milestones/generate-report";
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

  async bulkScheduleLoading(file: File): Promise<Response | undefined> {
    const URL = `/course-schedule/bulk-loading`;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async bulkSesionLoading(file: File): Promise<Response | undefined> {
    const URL = `/course-session/bulk-loading`;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async createGrowthPlan(
    growthPlan: GrowthPlanType
  ): Promise<GrowthPlanType | undefined> {
    const URL = "/growth-plan";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        growthPlan,
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

  async getGrowthPlan(
    businessProfileId: string
  ): Promise<GrowthPlanType | undefined> {
    const URL = `/growth-plan/${businessProfileId}`;
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

  async updateGrowthPlan(
    growthPlan: GrowthPlanType
  ): Promise<GrowthPlanType | undefined> {
    const URL = `/growth-plan/${growthPlan.id}`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response: AxiosResponse = await this.axiosInstance.patch(
        URL,
        growthPlan,
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

  async findAllPrograms(): Promise<CourseType[] | undefined> {
    const URL = "/program";
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

  async findAllProgramSchedulesByProgram(
    programId: string
  ): Promise<ProgramScheduleType[] | undefined> {
    const URL = `program/program-schedule/by-program/${programId}`;
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

  async createProgramSchedule(
    createScheduleData: ProgramScheduleType
  ): Promise<ProgramScheduleType | undefined> {
    const URL = "program/program-schedule";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        createScheduleData,
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

  async findProgramScheduleById(programScheduleId: string) {
    const URL = `program/program-schedule/${programScheduleId}`;
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

  async updateProgramSchedule(
    programSchedule: ProgramScheduleType
  ): Promise<ProgramScheduleType | undefined> {
    const URL = `program/program-schedule/${programSchedule.id}`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.patch(
        URL,
        programSchedule,
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

  async createProgramSession(
    createSessionData: ProgramSessionType
  ): Promise<ProgramSessionType | undefined> {
    const URL = "program/program-session";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        createSessionData,
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

  async findAllProgramSessionsBySchedule(
    schedule_id: string
  ): Promise<ProgramSessionType[] | undefined> {
    const URL = `program/program-session/by-schedule/${schedule_id}`;
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

  async updateProgramSession(
    updateSessionData: ProgramSessionType
  ): Promise<ProgramSessionType | undefined> {
    const URL = `program/program-session/${updateSessionData.id}`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.patch(
        URL,
        updateSessionData,
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

  async findProgramSession(programSessionId: string) {
    const URL = `program/program-session/${programSessionId}`;
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

  async findUnvalidatedBusiness(): Promise<
    UnvalidatedBusinessType[] | undefined
  > {
    const URL = "/business-validation/unvalidated-business";
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

  async findBusinessAuthorizedBySchedule(schedule_id: string) {
    const URL = `/course-schedule/business-authorized-by-schedule/${schedule_id}`;
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

  async assignBusinessToSchedule(business_id: string, schedule_id: string) {
    const URL = `/course-schedule/assign-business-to-schedule/${schedule_id}`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        { business_id },
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

  async findBusinessToAssignConsultant() {
    const URL = `/business-to-assign-consultant`;
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

  async findConsultantsAssignedToBusiness(id: string) {
    const URL = `/user-profile/consultants-assigned-to-business/${id}`;
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

  async findAdminsAssignedToBusiness(id: string) {
    const URL = `/user-profile/admins-assigned-to-business/${id}`;
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

  async assignConsultantToBussines(
    business_id: string,
    consultant_id: string
  ): Promise<boolean | undefined> {
    const URL = `/assign-consultant`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        URL,
        { business_id, consultant_id },
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

  async rescheduleAppointment(appointment: AppointmentType) {
    const URL = `/appointment/reschedule`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
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
  async isUserRegistered(): Promise<string | undefined> {
    const URL = `/user-info/isUserRegistered`;
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

  async getRejectedBusinessExcelReport(data: {}): Promise<
    Blob | ErrorInformation | undefined
  > {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const JSON_TYPE = "application/json";

    const axiosRequestType = {
      arraybuffer: "arraybuffer",
      blob: "blob",
      document: "document",
      json: "json",
      text: "text",
      stream: "stream",
      formdata: "formdata",
    } as const;

    type ResponseType = keyof typeof axiosRequestType;

    try {
      const config = {
        responseType: axiosRequestType.blob,
      };
      const responseRaw = await this.axiosInstance
        .get("business-validation/download/rejected/excel-report", config)
        .then((result) => {
          //console.log(result);
          return result;
        });

      let response;
      const contentType: string =
        responseRaw.headers["Content-Type"] ||
        responseRaw.headers["content-type"];
      if (contentType == EXCEL_TYPE) {
        response = new Blob([responseRaw.data]);
      } else if (contentType.includes(JSON_TYPE)) {
        try {
          const rawTest = await responseRaw.data.text();
          response = JSON.parse(rawTest);
        } catch (error) {
          response = undefined;
          //console.error("response Error:",error);
        }
      }
      //console.log("Excel Response: ", response);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.error(
        `Error al generar el reporte Excel: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }
}

export default RannRepository;
