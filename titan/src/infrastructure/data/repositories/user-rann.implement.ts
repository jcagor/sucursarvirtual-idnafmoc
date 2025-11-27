import axios, { type AxiosInstance } from "axios";
import { ResumeServerResponse, ResumeStatusResponse } from "domain/models";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import {
  AvailableTrainingCourse,
  PostulationListServerResponse,
  PostulationServerResponse,
  SaveMpacStatusHistoryServerResponse,
  SelectOption,
  SiseUnregisteredUser,
  UserDataInterface,
} from "lib";
import { ApiResponse } from "lib/types/userDevice/userDevice.types";
import {
  CourseRegistrationData,
  CourseScheduleQuery,
  CourseScheduleTypeList,
  QueryRegisterEmployeeInCourse,
  QueryRegisterUnemployedInCourse,
  ResponseCreateCourseRegistration,
} from "presentation/components/templates/training/training.types";
import { IUserRannRepository } from "domain/repositories/userRann.repository";
import { PsyTestExamType } from "domain/models/PsyTestExamType";
import { SingleAswerType } from "domain/models/SingleAswerType";
import {
  PsyTestPendingList,
  PsyTestResultType,
} from "domain/models/PsyTestResultsType";
import {
  JupiterStatusQuery,
  JupiterStatusResult,
} from "domain/models/jupiterResultsType";

@injectable()
export default class UserRannRepository implements IUserRannRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosRannInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async saveSiseAbsentUser(
    data: {},
    accessToken: string
  ): Promise<SiseUnregisteredUser | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/user-sise/", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al guardar el usuario inexistente en SISE: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getAvailableCoursesUser(
    data: {},
    accessToken: string
  ): Promise<AvailableTrainingCourse[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get("/courses/available", config)
        .then((result) => result.data);
      console.log("Available courses: ", response);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al solicitar los cursos disponibles: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getHistoryCoursesUser(
    data: {
      documentType: string;
      documentNumber: string;
    },
    accessToken: string
  ): Promise<AvailableTrainingCourse[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get("/courses/history/" + data.documentNumber, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al solicitar los cursos disponibles: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async saveUserResumeForm(
    data: {},
    accessToken: string
  ): Promise<ResumeServerResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/curriculum/", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al guardar el curriculum del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getUserResumeForm(
    data: {},
    accessToken: string
  ): Promise<ResumeServerResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get("/curriculum/", config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al leer el curriculum del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getUserResumeStatus(
    data: {},
    accessToken: string
  ): Promise<ResumeStatusResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get("/curriculum/status", config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al leer el estado deñ curriculum del usuario: ${
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

  async getUserResumeFile(
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
        .post<Blob>("/curriculum/generate/", data, config)
        .then((result) => result.data);

      console.log("Resume Response: ", response);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al generar la HV: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getJobPostulations(
    data: {},
    accessToken: string
  ): Promise<PostulationListServerResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .get("/postulation/list/", config)
        .then((result) => result.data);
      //console.log("Postulation list: ", response);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al leer las postulaciones desde el servidor: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async saveJobPostulation(
    data: {},
    accessToken: string
  ): Promise<PostulationServerResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/postulation/", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al guardar la postulación del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async saveMpacStatusHistory(
    data: {},
    accessToken: string
  ): Promise<SaveMpacStatusHistoryServerResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/user-mpac/validation-history", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al guardar el historial MPAC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async registerCourse(
    data: CourseRegistrationData,
    accessToken: string
  ): Promise<{ success: boolean; message: string } | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/courses/register", data, config) //<---
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al registrar el curso: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getCourseSchedule(
    data: CourseScheduleQuery,
    accessToken: string
  ): Promise<CourseScheduleTypeList | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/course-schedule/find", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al buscar programación para el curso: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async registerUnemployedInCourse(
    data: QueryRegisterUnemployedInCourse,
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/courses/register/unemployed", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al registrar el usuario cesante al curso: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async registerWorkerInCourse(
    data: QueryRegisterEmployeeInCourse,
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const response = await this.axiosInstance
        .post("/courses/register/employee", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al registrar el usuario cesante al curso: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async getActiveWorkerCourses(
    data: { documentNumber: number },
    token: string
  ): Promise<AvailableTrainingCourse[]> {
    try {
      const response = await this.axiosInstance.get<AvailableTrainingCourse[]>(
        `/course-registration/user/${data.documentNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting active worker courses:", error);
      return [];
    }
  }

  async getUserTrainingCourses(
    userData: { documentType: string; identification: string },
    token: string
  ): Promise<CourseScheduleTypeList | undefined> {
    try {
      const response = await this.axiosInstance.get(
        `/training-courses/available/${userData.identification}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error in UserTrainingCoursesUseCase:", error);
      return [];
    }
  }

  async findPsyTestExam(): Promise<PsyTestExamType | undefined> {
    try {
      const response = await this.axiosInstance.get<PsyTestExamType>(
        `/psychologist-test/exam/`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting psychometric exams:", error);
      return undefined;
    }
  }

  async saveSingleAnswer(
    answer: SingleAswerType
  ): Promise<SingleAswerType | undefined> {
    try {
      this.axiosInstance.post(`/psychologist-test/single-answer`, answer);
      return answer;
    } catch (error) {
      console.error("Error saving single answer:", error);
    }
  }

  async closePsyTestExam(id: string): Promise<boolean | undefined> {
    try {
      const response = await this.axiosInstance.post<boolean>(
        `/psychologist-test/close-exam/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error closing psychometric exam:", error);
      return undefined;
    }
  }

  async findPsyTestResults(): Promise<PsyTestResultType | undefined> {
    try {
      const response = await this.axiosInstance.get<PsyTestResultType>(
        `/psychologist-test/results/`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting psychometric results:", error);
      return undefined;
    }
  }

  async listPendingPsyTestExam(): Promise<PsyTestPendingList | undefined> {
    try {
      const response = await this.axiosInstance
        .get(`/psychologist-test/exam/pending-list`)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.error("Error getting active worker courses:", error);
      return;
    }
  }

  async jupiterValidation(
    query: JupiterStatusQuery,
    token: string
  ): Promise<JupiterStatusResult | undefined> {
    try {
      const response = await this.axiosInstance.post<JupiterStatusResult>(
        `/ipaas-services/jupiter/validate`,
        query
      );
      return response.data;
    } catch (error) {
      console.error("Error getting jupiter results:", error);
      return undefined;
    }
  }

  async getCoursesForBeneficiary(
    token: string
  ): Promise<CourseScheduleTypeList | undefined> {
    try {
      const response = await this.axiosInstance.get<CourseScheduleTypeList>(
        `/course-schedule/beneficiary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting courses for beneficiary:", error);
      return undefined;
    }
  }
}
