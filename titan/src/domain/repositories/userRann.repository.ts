import {
  AvailableTrainingCourse,
  PostulationListServerResponse,
  PostulationServerResponse,
  SaveMpacStatusHistoryServerResponse,
  SelectOption,
  SiseUnregisteredUser,
  UserDataInterface,
} from "lib";
import { ResumeServerResponse, ResumeStatusResponse } from "domain/models";
import {
  CourseRegistrationData,
  CourseScheduleQuery,
  CourseScheduleTypeList,
  QueryRegisterEmployeeInCourse,
  QueryRegisterUnemployedInCourse,
  ResponseCreateCourseRegistration,
} from "presentation/components/templates/training/training.types";
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

export interface IUserRannRepository {
  saveSiseAbsentUser(
    data: {},
    accessToken: string
  ): Promise<SiseUnregisteredUser | undefined>;
  getAvailableCoursesUser(
    data: {},
    accessToken: string
  ): Promise<AvailableTrainingCourse[] | undefined>;
  getHistoryCoursesUser(
    data: { documentType: string; documentNumber: string },
    accessToken: string
  ): Promise<AvailableTrainingCourse[] | undefined>;
  saveUserResumeForm(
    data: {},
    accessToken: string
  ): Promise<ResumeServerResponse | undefined>;
  getUserResumeForm(
    data: {},
    accessToken: string
  ): Promise<ResumeServerResponse | undefined>;
  getUserResumeStatus(
    data: {},
    accessToken: string
  ): Promise<ResumeStatusResponse | undefined>;
  getSelectOptionsForm(
    data: { selectOptionsName: string; selectFilterString?: string },
    accessToken: string
  ): Promise<Array<SelectOption> | undefined>;
  getUserResumeFile(data: {}, accessToken: string): Promise<Blob | undefined>;
  getJobPostulations(
    data: {},
    accessToken: string
  ): Promise<PostulationListServerResponse | undefined>;
  saveJobPostulation(
    data: {},
    accessToken: string
  ): Promise<PostulationServerResponse | undefined>;
  registerCourse(
    data: CourseRegistrationData,
    accessToken: string
  ): Promise<{ success: boolean; message: string } | undefined>;
  getCourseSchedule(
    data: CourseScheduleQuery,
    accessToken: string
  ): Promise<CourseScheduleTypeList | undefined>;
  registerUnemployedInCourse(
    data: QueryRegisterUnemployedInCourse,
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined>;
  registerWorkerInCourse(
    data: QueryRegisterEmployeeInCourse,
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined>;
  saveMpacStatusHistory(
    data: {},
    accessToken: string
  ): Promise<SaveMpacStatusHistoryServerResponse | undefined>;
  getActiveWorkerCourses(
    data: { documentNumber: number },
    token: string
  ): Promise<AvailableTrainingCourse[]>;
  getUserTrainingCourses(
    userData: { documentType: string; identification: string },
    token: string
  ): Promise<CourseScheduleTypeList | undefined>;
  findPsyTestExam(): Promise<PsyTestExamType | undefined>;
  saveSingleAnswer(
    answer: SingleAswerType
  ): Promise<SingleAswerType | undefined>;
  closePsyTestExam(id: string): Promise<boolean | undefined>;
  findPsyTestResults(): Promise<PsyTestResultType | undefined>;
  listPendingPsyTestExam(): Promise<PsyTestPendingList | undefined>;

  jupiterValidation(
    query: JupiterStatusQuery,
    token: string
  ): Promise<JupiterStatusResult | undefined>;
  getCoursesForBeneficiary(
    token: string
  ): Promise<CourseScheduleTypeList | undefined>;
}
