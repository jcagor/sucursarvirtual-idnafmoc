import { ContainerModule, interfaces } from "inversify";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { USECASES_TYPES } from "./usecases.types";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import CreateScheduleUseCase from "domain/usecases/course/CreateSchedule.use.case";
import FindAllScheduleUseCase from "domain/usecases/course/FindAllSchedule.use.case";
import FindScheduleUseCase from "domain/usecases/course/FindSchedule.use.case";
import { Update } from "@reduxjs/toolkit";
import UpdateScheduleUseCase from "domain/usecases/course/UpdateSchedule.use.case";
import GetAppointmentByBusinessUseCase from "domain/usecases/Appointment/getAppointmentByBusiness.use.case";
import CreateAppointmentUseCase from "domain/usecases/Appointment/createAppointment.use.case";
import FindAllSessionByScheduleUseCase from "domain/usecases/course/FindAllSessionBySchedule.use.case";
import CreateSessionUseCase from "domain/usecases/course/CreateSession.use.case";
import FindScheduleBySessionUseCase from "domain/usecases/course/FindScheduleBySession.use.case";
import FindSessionUseCase from "domain/usecases/course/FindSession.use.case";
import UpdateSessionUseCase from "domain/usecases/course/UpdateSession.use.case";
import CreateMonthlyReportUseCase from "domain/usecases/MonthlyReport/createMonthlyReport.use.case";
import GetUserInformationUseCase from "domain/usecases/User/UserInformation.use.case";
import GetAppointmentAdminUseCase from "domain/usecases/Appointment/getAppointmentAdmin.use.case";
import ListAdminMonthlyReportUseCase from "domain/usecases/MonthlyReport/listAdminMonthlyReport.use.case";
import ListAnalystTechReportsUseCase from "domain/usecases/techAssistanceRegister/listAnalystTechAssistanceRecords";
import GetAnalystTechReportUseCase from "domain/usecases/techAssistanceRegister/getAnalystTechAssistanceRecord";
import SaveAssistanceRecordFormUseCase from "domain/usecases/techAssistanceRegister/saveTechAssistanceForm.usecase";
import ListRejectedTechAssistanceRecordsUseCase from "domain/usecases/techAssistanceRegister/listRejectedTechAssistanceRecords";
import CreateAnalystTechRevisionUseCase from "domain/usecases/techAssistanceRegister/createAnalystTechAssistanceRevision";
import GetBusinessHoursReportUseCase from "domain/usecases/Appointment/getBusinessHoursReport.use.case";
import GetConsultantBusinessReportUseCase from "domain/usecases/Appointment/getConsultantBusinessReport.use.case";
import findAllCoursesUseCase from "domain/usecases/course/findAllCourses.use.case";
import BulkCourseLoadingUseCase from "domain/usecases/course/BulkCourseLoading.use.case";
import CreateWorkPlanUseCase from "domain/usecases/WorkPlan/CreateWorkPlan.use.case";
import SaveAssistanceRecordCorrectionFormUseCase from "domain/usecases/techAssistanceRegister/saveTechAssistanceCorrection.usecase";
import GetSummaryReportFileUseCase from "domain/usecases/MonthlyReport/userGetResumeFile.usecase";
import BulkScheduleLoadingUseCase from "domain/usecases/course/BulkScheduleLoading.use.case";
import BulkSesionLoadingUseCase from "domain/usecases/course/BulkSesionLoading.use.case";
import GetWorkPlanReportUseCase from "domain/usecases/WorkPlan/GetWorkPlanReport.usecase";
import GetMilestonesReportUseCase from "domain/usecases/MonthlyReport/GetMilestonesReport.usecase";
import CreateGrowthPlanUseCase from "domain/usecases/growth-plan/createGrowthPlan.use.case";
import GetGrowthPlanUseCase from "domain/usecases/growth-plan/GetGrowthPlan.use.case";
import UpdateGrowthPlanUseCase from "domain/usecases/growth-plan/UpdateGrowthPlan.use.case";
import findAllProgramsUseCase from "domain/usecases/program/findAllPrograms.use.case";
import FindAllProgramScheduleUseCase from "domain/usecases/program/FindAllProgramScheduleByProgram.use.case";
import CreateProgramScheduleUseCase from "domain/usecases/program/CreateProgramSchedule.use.case";
import FindProgramScheduleUseCase from "domain/usecases/program/FindProgramSchedule.use.case";
import UpdateProgramScheduleUseCase from "domain/usecases/program/UpdateProgramSchedule.use.case";
import CreateProgramSessionUseCase from "domain/usecases/program/CreateProgramSession.use.case";
import FindAllProgramSessionsByScheduleUseCase from "domain/usecases/program/FindAllProgramSessionsBySchedule.use.case";
import UpdateProgramSessionUseCase from "domain/usecases/program/UpdateProgramSession.use.case";
import FindProgramSessionUseCase from "domain/usecases/program/FindProgramSession.use.case";
import FindUnvalidatedBusinessUseCase from "domain/usecases/UnvalidatedBusiness/FindUnvalidatedBusiness";
import FindBusinessAuthorizedByScheduleUseCase from "domain/usecases/course/FindBusinessAuthorizedBySchedule.use.case.";
import AssignBusinessToScheduleUseCase from "domain/usecases/course/AssignBusinessToSchedule.use.case";
import FindBusinessToAssignConsultantUseCase from "domain/usecases/Business/FindBusinessToAssignConsultant.use.case";
import FindConsultantsAssignedToBusinessUseCase from "domain/usecases/Business/FindConsultantsAssignedToBusiness.use.case";
import AssignConsultantToBusinessUseCase from "domain/usecases/Business/AssignConsultantToBussines.use.case";
import RescheduleAppointmentUseCase from "domain/usecases/Appointment/RescheduleAppointment.use.case";
import IsUserRegisteredUseCase from "domain/usecases/User/IsUserRegistered.use.case";
import FindAdministratorsAssignedToBusinessUseCase from "domain/usecases/Business/FindAdminsAssignedToBusiness.use.case";
import GetRejectedBusinessExcelReportUseCase from "domain/usecases/Business/GetRejectedBusinessExcelReport";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<LogoutKeycloakUseCase>(USECASES_TYPES._LogoutKeycloakUseCase).to(
    LogoutKeycloakUseCase
  );

  bind<GetOptionsUseCase>(USECASES_TYPES._GetOptionsUseCase).to(
    GetOptionsUseCase
  );

  bind<CreateScheduleUseCase>(USECASES_TYPES._CreateSchedule).to(
    CreateScheduleUseCase
  );

  bind<FindAllScheduleUseCase>(USECASES_TYPES._FindAllSchedules).to(
    FindAllScheduleUseCase
  );

  bind<FindScheduleUseCase>(USECASES_TYPES._FindSchedule).to(
    FindScheduleUseCase
  );

  bind<UpdateScheduleUseCase>(USECASES_TYPES._UpdateSchedule).to(
    UpdateScheduleUseCase
  );

  bind<GetAppointmentByBusinessUseCase>(
    USECASES_TYPES._GetAppointmentsByBusiness
  ).to(GetAppointmentByBusinessUseCase);

  bind<GetAppointmentAdminUseCase>(
    USECASES_TYPES._GetAppointmentAdminUseCase
  ).to(GetAppointmentAdminUseCase);

  bind<CreateAppointmentUseCase>(USECASES_TYPES._CreateAppointmentUseCase).to(
    CreateAppointmentUseCase
  );

  bind<FindAllSessionByScheduleUseCase>(
    USECASES_TYPES._FindAllSessionByScheduleUseCase
  ).to(FindAllSessionByScheduleUseCase);

  bind<CreateSessionUseCase>(USECASES_TYPES._CreateSessionUseCase).to(
    CreateSessionUseCase
  );

  bind<FindScheduleBySessionUseCase>(
    USECASES_TYPES._FindScheduleBySessionUseCase
  ).to(FindScheduleBySessionUseCase);

  bind<SaveAssistanceRecordFormUseCase>(
    USECASES_TYPES._SaveAssistanceRecordFormUseCase
  ).to(SaveAssistanceRecordFormUseCase);

  bind<SaveAssistanceRecordCorrectionFormUseCase>(
    USECASES_TYPES._SaveAssistanceRecordCorrectionFormUseCase
  ).to(SaveAssistanceRecordCorrectionFormUseCase);

  bind<FindSessionUseCase>(USECASES_TYPES._FindSessionUseCase).to(
    FindSessionUseCase
  );

  bind<UpdateSessionUseCase>(USECASES_TYPES._UpdateSessionUseCase).to(
    UpdateSessionUseCase
  );

  bind<CreateMonthlyReportUseCase>(
    USECASES_TYPES._CreateMonthlyReportUseCase
  ).to(CreateMonthlyReportUseCase);

  bind<ListAdminMonthlyReportUseCase>(
    USECASES_TYPES._ListAdminMonthlyReportUseCase
  ).to(ListAdminMonthlyReportUseCase);

  bind<GetBusinessHoursReportUseCase>(
    USECASES_TYPES._GetBusinessHoursReportUseCase
  ).to(GetBusinessHoursReportUseCase);

  bind<GetConsultantBusinessReportUseCase>(
    USECASES_TYPES._GetConsultantBusinessReportUseCase
  ).to(GetConsultantBusinessReportUseCase);

  bind<GetSummaryReportFileUseCase>(
    USECASES_TYPES._GetSummaryReportFileUseCase
  ).to(GetSummaryReportFileUseCase);

  bind<ListAnalystTechReportsUseCase>(
    USECASES_TYPES._ListAnalystTechReportsUseCase
  ).to(ListAnalystTechReportsUseCase);

  bind<GetAnalystTechReportUseCase>(
    USECASES_TYPES._GetAnalystTechReportUseCase
  ).to(GetAnalystTechReportUseCase);

  bind<CreateAnalystTechRevisionUseCase>(
    USECASES_TYPES._CreateAnalystTechRevisionUseCase
  ).to(CreateAnalystTechRevisionUseCase);

  bind<GetUserInformationUseCase>(USECASES_TYPES._GetUserInformationUseCase).to(
    GetUserInformationUseCase
  );

  bind<ListRejectedTechAssistanceRecordsUseCase>(
    USECASES_TYPES._ListRejectedTechAssistanceRecordsUseCase
  ).to(ListRejectedTechAssistanceRecordsUseCase);

  bind<findAllCoursesUseCase>(USECASES_TYPES._findAllCourses).to(
    findAllCoursesUseCase
  );

  bind<BulkCourseLoadingUseCase>(USECASES_TYPES._BulkCourseLoading).to(
    BulkCourseLoadingUseCase
  );

  bind<CreateWorkPlanUseCase>(USECASES_TYPES._CreateWorkPlanUseCase).to(
    CreateWorkPlanUseCase
  );

  bind<GetWorkPlanReportUseCase>(USECASES_TYPES._GetWorkPlanReportUseCase).to(
    GetWorkPlanReportUseCase
  );

  bind<GetMilestonesReportUseCase>(
    USECASES_TYPES._GetMilestonesReportUseCase
  ).to(GetMilestonesReportUseCase);

  bind<BulkScheduleLoadingUseCase>(USECASES_TYPES._BulkScheduleLoading).to(
    BulkScheduleLoadingUseCase
  );

  bind<BulkSesionLoadingUseCase>(USECASES_TYPES._BulkSesionLoading).to(
    BulkSesionLoadingUseCase
  );

  bind<CreateGrowthPlanUseCase>(USECASES_TYPES._CreateGrowthPlanUseCase).to(
    CreateGrowthPlanUseCase
  );

  bind<GetGrowthPlanUseCase>(USECASES_TYPES._GetGrowthPlanUseCase).to(
    GetGrowthPlanUseCase
  );

  bind<UpdateGrowthPlanUseCase>(USECASES_TYPES._UpdateGrowthPlanUseCase).to(
    UpdateGrowthPlanUseCase
  );

  bind<findAllProgramsUseCase>(USECASES_TYPES._findAllPrograms).to(
    findAllProgramsUseCase
  );

  bind<FindAllProgramScheduleUseCase>(
    USECASES_TYPES._FindAllProgramSchedulesByProgram
  ).to(FindAllProgramScheduleUseCase);

  bind<CreateProgramScheduleUseCase>(USECASES_TYPES._CreateProgramSchedule).to(
    CreateProgramScheduleUseCase
  );

  bind<FindProgramScheduleUseCase>(USECASES_TYPES._FindProgramSchedule).to(
    FindProgramScheduleUseCase
  );
  bind<UpdateProgramScheduleUseCase>(USECASES_TYPES._UpdateProgramSchedule).to(
    UpdateProgramScheduleUseCase
  );

  bind<CreateProgramSessionUseCase>(USECASES_TYPES._CreateProgramSession).to(
    CreateProgramSessionUseCase
  );

  bind<FindAllProgramSessionsByScheduleUseCase>(
    USECASES_TYPES._FindAllProgramSessionsBySchedule
  ).to(FindAllProgramSessionsByScheduleUseCase);

  bind<UpdateProgramSessionUseCase>(USECASES_TYPES._UpdateProgramSession).to(
    UpdateProgramSessionUseCase
  );

  bind<FindProgramSessionUseCase>(USECASES_TYPES._FindProgramSession).to(
    FindProgramSessionUseCase
  );

  bind<FindUnvalidatedBusinessUseCase>(
    USECASES_TYPES._FindUnvalidatedBusiness
  ).to(FindUnvalidatedBusinessUseCase);

  bind<FindBusinessAuthorizedByScheduleUseCase>(
    USECASES_TYPES._FindBusinessAuthorizedBySchedule
  ).to(FindBusinessAuthorizedByScheduleUseCase);

  bind<AssignBusinessToScheduleUseCase>(
    USECASES_TYPES._AssignBusinessToSchedule
  ).to(AssignBusinessToScheduleUseCase);

  bind<FindBusinessToAssignConsultantUseCase>(
    USECASES_TYPES._FindBusinessToAssignConsultant
  ).to(FindBusinessToAssignConsultantUseCase);

  bind<FindConsultantsAssignedToBusinessUseCase>(
    USECASES_TYPES._FindConsultantsAssignedToBusiness
  ).to(FindConsultantsAssignedToBusinessUseCase);

  bind<FindAdministratorsAssignedToBusinessUseCase>(
    USECASES_TYPES._FindAdministratorsAssignedToBusinessUseCase
  ).to(FindAdministratorsAssignedToBusinessUseCase);

  bind<AssignConsultantToBusinessUseCase>(
    USECASES_TYPES._AssignConsultantToBusiness
  ).to(AssignConsultantToBusinessUseCase);
  bind<RescheduleAppointmentUseCase>(USECASES_TYPES._RescheduleAppointment).to(
    RescheduleAppointmentUseCase
  );

  bind<IsUserRegisteredUseCase>(USECASES_TYPES._IsUserRegistered).to(
    IsUserRegisteredUseCase
  );

  bind<GetRejectedBusinessExcelReportUseCase>(
    USECASES_TYPES._GetRejectedBusinessExcelReportUseCase
  ).to(GetRejectedBusinessExcelReportUseCase);
});
