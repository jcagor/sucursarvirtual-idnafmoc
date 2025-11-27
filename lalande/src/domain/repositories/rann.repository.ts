import { CourseType } from "domain/models/course/CourseType";
import {
  AppointmentType,
  AppointmentTypeList,
} from "domain/models/Appointment/AppointmentType";
import {
  AdminRangeDateType,
  RangeDateType,
} from "domain/models/Appointment/rangeDateType";
import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { CourseSessionType } from "domain/models/course/CourseSessionType";
import {
  MilestonesReportList,
  MonthlyReportResponseList,
  MonthlyReportType,
  QueryMonthlyReportAdmin,
} from "domain/models/MonthlyReport/MonthlyReportType";
import {
  SaveAssistanceRecordFormStatus,
  SaveAssistanceRecordRevision,
  TechAssistanceRecordRevisionList,
  TechAssistanceCorrectionList,
} from "domain/models/tech-assistance-cert/techAssistanceForm";
import { UserInformationData } from "domain/models/user/UserInformation.type";
import {
  WorkPlanReportList,
  WorkPlanReportQueryType,
  WorkPlanType,
} from "domain/models/WorkPlan/WorkPlanType";
import { SelectOption } from "lib";
import { GrowthPlanType } from "domain/models/growth-plan/GrowthPlanType";
import { ProgramType } from "domain/models/program/ProgramType";
import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import { ProgramSessionType } from "domain/models/program/ProgramSessionType";
import { ErrorInformation, UnvalidatedBusinessType } from "domain/models/UnvalidatedBusiness/UnvalidatedBusinessType";
import { BusinessAuthorizedType } from "domain/models/course/BusinessAuthorizedType";
import { BusinessToAssignConsultantType } from "domain/models/Business/BusinessToAssignConsultantType";
import { ConsultantType } from "domain/models/Business/ConsultantType";
import { BusinessAttendedReportList, BusinessHoursReportList } from "domain/models/Appointment/reportsTypes";

export interface IRannRepository {
  getOptions(
    selectOptionsName: string,
    accessToken: string
  ): Promise<Array<SelectOption> | undefined>;

  createSchedule(
    accessToken: string,
    createScheduleData: CourseScheduleType
  ): Promise<CourseScheduleType | undefined>;

  findAllSchedule(
    accessToken: string
  ): Promise<CourseScheduleType[] | undefined>;

  findSchedule(
    id: string,
    accessToken: string
  ): Promise<CourseScheduleType | undefined>;

  updateSchedule(
    UpdateScheduleData: CourseScheduleType,
    accessToken: string
  ): Promise<CourseScheduleType | undefined>;

  getAppointmentByBusiness(
    rangeDate: RangeDateType,
    accessToken: string
  ): Promise<AppointmentType[] | undefined>;

  getAdminAppointmentByBusiness(
    rangeDate: AdminRangeDateType,
    accessToken: string
  ): Promise<AppointmentType[] | undefined>;

  createAppointment(
    accessToken: string,
    appointment: AppointmentType
  ): Promise<Request | undefined>;

  FindAllSessionBySchedule(
    schedule_id: string,
    accessToken: string
  ): Promise<CourseSessionType[] | undefined>;

  createSession(
    createScheduleData: CourseSessionType,
    accessToken: string
  ): Promise<CourseSessionType | undefined>;

  findScheduleBySession(
    session_id: string,
    accessToken: string
  ): Promise<CourseScheduleType | undefined>;

  findSession(
    id: string,
    accessToken: string
  ): Promise<CourseSessionType | undefined>;

  updateSession(
    UpdateSessionData: CourseSessionType,
    accessToken: string
  ): Promise<CourseSessionType | undefined>;

  createMonthlyReport(
    monthlyReport: MonthlyReportType,
    accessToken: string
  ): Promise<Request | undefined>;

  listAdminMonthlyReport(
    query: QueryMonthlyReportAdmin,
    accessToken: string
  ): Promise<MonthlyReportResponseList | undefined>;

  listAnalystTechReports(
    query: {},
    accessToken: string
  ): Promise<TechAssistanceRecordRevisionList | undefined>;

  getAnalystTechReport(
    query: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined>;

  getBusinessHoursReport(
    data: {},
    accessToken: string
  ): Promise<BusinessHoursReportList | undefined>;

  getConsultantBusinessReport(
    data: {},
    accessToken: string
  ): Promise<BusinessAttendedReportList | undefined>;

  getSummaryReportFile(
    data: {},
    accessToken: string
  ): Promise<Blob | undefined>;

  createAnalystTechReportRevision(
    query: SaveAssistanceRecordRevision,
    accessToken: string
  ): Promise<SaveAssistanceRecordRevision | undefined>;

  saveAssistanceRecordForm(
    formData: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined>;

  saveAssistanceRecordCorrectionForm(
    formData: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined>;

  getUserInformation(
    data: {},
    accessToken: string
  ): Promise<UserInformationData | undefined>;

  findAllCourses(): Promise<CourseType[] | undefined>;
  bulkCourseLoading(file: File): Promise<Response | undefined>;

  createWorkPlan(
    createWorkPlanData: WorkPlanType
  ): Promise<WorkPlanType | undefined>;

  getWorkPlanReport(
    queryData: WorkPlanReportQueryType,
    accessToken: string
  ): Promise<WorkPlanReportList | undefined>;

  getMilestonesReport(
    queryData: {},
    accessToken: string
  ): Promise<MilestonesReportList | undefined>;

  listConsultantRejectedTechSupport(
    data: {},
    accessToken: string
  ): Promise<TechAssistanceCorrectionList | undefined>;

  bulkScheduleLoading(file: File): Promise<Response | undefined>;
  bulkSesionLoading(file: File): Promise<Response | undefined>;

  createGrowthPlan(
    growthPlan: GrowthPlanType
  ): Promise<GrowthPlanType | undefined>;

  getGrowthPlan(
    businessProfile_id: string
  ): Promise<GrowthPlanType | undefined>;

  updateGrowthPlan(
    growthPlan: GrowthPlanType
  ): Promise<GrowthPlanType | undefined>;

  findAllPrograms(): Promise<ProgramType[] | undefined>;
  findAllProgramSchedulesByProgram(
    program_id: string
  ): Promise<ProgramScheduleType[] | undefined>;
  createProgramSchedule(
    createScheduleData: ProgramScheduleType
  ): Promise<ProgramScheduleType | undefined>;
  findProgramScheduleById(id: string): Promise<ProgramScheduleType | undefined>;
  updateProgramSchedule(
    schedule: ProgramScheduleType
  ): Promise<ProgramScheduleType | undefined>;
  createProgramSession(
    createSessionData: ProgramSessionType
  ): Promise<ProgramSessionType | undefined>;
  findAllProgramSessionsBySchedule(
    schedule_id: string
  ): Promise<ProgramSessionType[] | undefined>;
  updateProgramSession(
    session: ProgramSessionType
  ): Promise<ProgramSessionType | undefined>;
  findProgramSession(id: string): Promise<ProgramSessionType | undefined>;
  findUnvalidatedBusiness(): Promise<UnvalidatedBusinessType[] | undefined>;
  findBusinessAuthorizedBySchedule(
    schedule_id: string
  ): Promise<BusinessAuthorizedType[] | undefined>;
  assignBusinessToSchedule(
    bussines_id: string,
    schedule_id: string
  ): Promise<CourseScheduleType | undefined>;
  findBusinessToAssignConsultant(): Promise<
    BusinessToAssignConsultantType[] | undefined
  >;
  findConsultantsAssignedToBusiness(
    id: string
  ): Promise<ConsultantType[] | undefined>;
  findAdminsAssignedToBusiness(
    id: string
  ): Promise<ConsultantType[] | undefined>;
  assignConsultantToBussines(
    bussines_id: string,
    consultant_id: string
  ): Promise<boolean | undefined>;
  rescheduleAppointment(
    apoointment: AppointmentType
  ): Promise<Request | undefined>;
  isUserRegistered(): Promise<string | undefined>;
  getRejectedBusinessExcelReport(
    data: {},
  ): Promise<Blob | ErrorInformation | undefined>;
}
