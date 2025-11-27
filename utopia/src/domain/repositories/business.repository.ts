import {
  AnalisysSelfManagemenType,
  AnswerSelfManagementType,
  AppointmentType,
  AssistanceRecordBusinessSignQuery,
  BusinessDescriptionTypes,
  CityTypes,
  ContactBusinessTypes,
  CourseScheduleType,
  CourseType,
  DataBusinessTypes,
  DepartmentTypes,
  EmployeeType,
  LegalRepresentativeBusinessTypes,
  PendingTechRecordSignList,
  QueryDeleteCourseRegistration,
  QueryValidateEmployeeForCourse,
  RangeDateType,
  ReportSelfManagemenType,
  RuesType,
  SaveAssistanceRecordFormStatus,
  SectorTypes,
  UserCourseDeleteInterface,
  UserCourseValidationInterface,
} from "domain/models";
import { CourseCurriculumType } from "domain/models/CourseCurriculumType";
import { CourseSessionType } from "domain/models/CourseSessionType";
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
import { BUSINESS_STATUS, SelectOption } from "lib";

export interface IRannRepository {
  IsFormBusinessProfileCompleted(
    accessToken: string
  ): Promise<boolean | undefined>;

  IsSelfManagementAvailable(accessToken: string): Promise<boolean | undefined>;

  getDataBusiness(accessToken: string): Promise<DataBusinessTypes | undefined>;

  getDataLegalRepresentativeAndContact(
    accessToken: string
  ): Promise<
    (LegalRepresentativeBusinessTypes & ContactBusinessTypes) | undefined
  >;

  getDataBusinessDescription(
    accessToken: string
  ): Promise<BusinessDescriptionTypes | undefined>;

  getDataDescriptionInfrastructureAndCapacity(
    accessToken: string
  ): Promise<DescriptionInfrastructureAndCapacityType | undefined>;

  getDataFinancialInformation(
    accessToken: string
  ): Promise<FinancialInformationType | undefined>;

  createDataBusiness(
    accessToken: string,
    dataBusiness: DataBusinessTypes
  ): Promise<Request | undefined>;

  createDataLegalRepresentativeAndContact(
    accessToken: string,
    dataLegalRepresentativeAndContact: LegalRepresentativeBusinessTypes &
      ContactBusinessTypes
  ): Promise<Request | undefined>;

  createDataBusinessDescription(
    accessToken: string,
    dataBusiness: BusinessDescriptionTypes
  ): Promise<Request | undefined>;

  createDataDescriptionInfrastructureAndCapacity(
    accessToken: string,
    dataBusiness: DescriptionInfrastructureAndCapacityType
  ): Promise<Request | undefined>;

  createDataFinancialInformation(
    accessToken: string,
    dataFinancialInformation: FinancialInformationType
  ): Promise<Request | undefined>;

  findAllDepartments(
    accessToken: string
  ): Promise<DepartmentTypes[] | undefined>;

  findAllCities(accessToken: string): Promise<CityTypes[] | undefined>;

  findAllSectors(accessToken: string): Promise<SectorTypes[] | undefined>;

  findSubsectorsBySector(
    sectorName: string,
    accessToken: string
  ): Promise<SectorTypes[] | undefined>;

  createSelfManagement(
    accessToken: string,
    answerSelfManagement: AnswerSelfManagementType
  ): Promise<Request | undefined>;

  GetAnalisys(
    accessToken: string
  ): Promise<AnalisysSelfManagemenType | undefined>;

  GetReport(accessToken: string): Promise<ReportSelfManagemenType | undefined>;

  SaveRuesInformation(
    accessToken: string,
    dataRues: RuesType
  ): Promise<Request | undefined>;

  getAppointmentByBusiness(
    rangeDate: RangeDateType,
    accessToken: string
  ): Promise<AppointmentType[] | undefined>;

  getOptions(
    selectOptionsName: string,
    accessToken: string
  ): Promise<Array<SelectOption> | undefined>;

  createAppointment(
    accessToken: string,
    appointment: AppointmentType
  ): Promise<Request | undefined>;

  saveAssistanceRecordForm(
    data: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined>;

  getTechRecordSignList(
    data: {},
    accessToken: string
  ): Promise<PendingTechRecordSignList | undefined>;

  getAnalystTechReport(
    query: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined>;

  queryBusinessTechReportSign(
    query: AssistanceRecordBusinessSignQuery,
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined>;

  getSelectOptionsForm(
    data: {},
    accessToken: string
  ): Promise<Array<SelectOption> | undefined>;

  findAllCourses(accessToken: string): Promise<CourseType[] | undefined>;
  findCourseSheduleByCourseId(
    accessToken: string,
    course_id: string
  ): Promise<CourseType[] | undefined>;

  createCourseRegistration(
    courseSheeduleId: string,
    employess: EmployeeType[],
    accessToken?: string
  ): Promise<ResponseCreateCourseRegistration | undefined>;

  findCourseCurriculumByCourseSheduleId(
    courseSchedule_id: string,
    accessToken?: string
  ): Promise<CourseCurriculumType[] | undefined>;

  findAllPrograms(accessToken: string): Promise<ProgramObjectList | undefined>;

  findSchedulesByProgramId(
    data: { id: string },
    accessToken: string
  ): Promise<ScheduleObjectList | undefined>;

  programBusinessInscription(
    data: ProgramInscription,
    accessToken: string
  ): Promise<ProgramInscription | undefined>;

  createProgram(
    program: ProgramType,
    accessToken: string
  ): Promise<Request | undefined>;

  getDataProgram(accessToken: string): Promise<ProgramType | undefined>;

  getEmployeesAvailableByBussiness(
    courseSheeduleId: string,
    accessToken: string
  ): Promise<EmployeeType[] | undefined>;

  getRegisteredEmployeesBySchedule(
    courseScheduleId: string
  ): Promise<PostulationType[] | undefined>;

  validateEmployeeCourseRegister(
    query: QueryValidateEmployeeForCourse,
    token: string
  ): Promise<UserCourseValidationInterface | undefined>;

  deleteEmployeeCourseRegister(
    query: QueryDeleteCourseRegistration,
    token: string
  ): Promise<UserCourseDeleteInterface | undefined>;

  prevalidationBusiness(
    program: ProgramType
  ): Promise<responseIsValidBusinessType | undefined>;
  validationRuesBusiness(
    program: ProgramType
  ): Promise<responseIsValidBusinessType | undefined>;

  isValidatedBusiness(accessToken: string): Promise<boolean | undefined>;

  getBusinessStatus(): Promise<BUSINESS_STATUS | undefined>;

  findSchedule(
    id: string,
    accessToken: string
  ): Promise<CourseScheduleType | undefined>;

  FindAllSessionBySchedule(
    schedule_id: string,
    accessToken: string
  ): Promise<CourseSessionType[] | undefined>;

  sendSelfManagementToMail(file: File): Promise<boolean | undefined>;
}
