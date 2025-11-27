import { ContainerModule, interfaces } from "inversify";
import { USECASES_TYPES } from "./usecases.types";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import createDataBusinessUseCase from "domain/usecases/Business/createDataBusiness.use.case";
import CreateDataLegalRepresentativeAndContactUseCase from "domain/usecases/Business/CreateDataLegalRepresentativeAndContact.use.case";
import createDataBusinessDescriptionUseCase from "domain/usecases/Business/createDataBusinessDescription.use.case";
import createDataDescriptionInfrastructureAndCapacityUseCase from "domain/usecases/Business/createDataDescriptionInfrastructureAndCapacity.use.case";
import createFinancialInformation from "domain/usecases/Business/createFinancialInformation.use.case";
import IsFormBusinessProfileCompleted from "domain/usecases/Business/IsFormBusinessProfileCompleted.use.case";
import getDataBusiness from "domain/usecases/Business/getDataBusiness.use.case";
import getDataLegalRepresentativeAndContact from "domain/usecases/Business/getDataLegalRepresentativeAndContact.use.case";
import getDataBusinessDescriptionUseCase from "domain/usecases/Business/getDataBusinessDescription.use.case";
import getDataDescriptionInfrastructureAndCapacityUseCase from "domain/usecases/Business/getDataDescriptionInfrastructureAndCapacity.use.case";
import getDataFinancialInformationUseCase from "domain/usecases/Business/getDataFinancialInformation.use.case";
import findAllDepartmentsUseCase from "domain/usecases/Business/findAllDepartments.use.case";
import FindAllCitiesUseCase from "domain/usecases/city/findAllCities.use.case";
import FindAllSectorsUseCase from "domain/usecases/sector/FindAllSectors.use.case";
import FindSubsectorsBySectorUseCase from "domain/usecases/sector/FindSubsectorsBySector.use.case copy";
import CreateSelfManagementUseCase from "domain/usecases/SelfManagement/createSelfManagement.use.case";
import GetAnalisysUseCase from "domain/usecases/SelfManagement/getAnalisys.use.case";
import IsSelfManagementAvailableUseCase from "domain/usecases/Business/IsSelfManagementAvailable.use.case";
import GetRuesInformationUseCase from "domain/usecases/Business/getRuesInformation.use.case";
import SaveRuesInformationUseCase from "domain/usecases/Business/saveRuesInformation.use.case";
import GetReportUseCase from "domain/usecases/SelfManagement/getReportUseCase.use.case";
import GetAppointmentByBusinessUseCase from "domain/usecases/Appointment/getAppointmentByBusiness.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import CreateAppointmentUseCase from "domain/usecases/Appointment/createAppointment.use.case";
import SaveAssistanceRecordFormUseCase from "domain/usecases/techAssistance/techAssistance.usecase";
import GetSelectOptionsFormUseCase from "domain/usecases/Business/userFormGetSelectOptions.usecase";
import SaveJobVacancyRegisterFormUseCase from "domain/usecases/Fomento/saveVacancyRegister.usecase";
import findAllCoursesUseCase from "domain/usecases/Business/findAllCourses.use.case";
import findCourseSheduleByCourseIdUseCase from "domain/usecases/Business/findCourseSheduleByCourseId.use.case";
import CreateCourseRegistrationUseCase from "domain/usecases/Business/createCourseRegistration.use.case";
import findCourseCurriculumByCourseSheduleIdUseCase from "domain/usecases/Business/findCourseCurriculumByCourseSheduleIdUseCase.use.case";
import CreateProgramUseCase from "domain/usecases/Business/createProgram.use.case";
import GetDataProgramUseCase from "domain/usecases/Business/getDataProgram.use.case";
import GetEmployeesAvailableByBussinessUseCase from "domain/usecases/worker-management/getEmployeesAvailableByBussiness.use.case";
import GetRegisteredEmployeesByScheduleUseCase from "domain/usecases/worker-management/getRegisteredRegisteredBySchedule.use.case";
import ValidateEmployeeCourseRegisterUseCase from "domain/usecases/worker-management/validateEmployeeCourseRegister.use.case";
import DeleteEmployeeCourseRegisterUseCase from "domain/usecases/worker-management/deleteEmployeeCourseRegister.use.case";
import PrevalidationBusinessUseCase from "domain/usecases/Business/prevalidationBusiness.use.case";
import ValidationRuesBusinessUseCase from "domain/usecases/Business/validationRuesBusiness.use.case";
import IsValidatedBusinessUseCase from "domain/usecases/Business/IsValidatedBusiness.use.case";
import GetTechRecordSignListUseCase from "domain/usecases/techAssistance/getTechRecordSignList";
import GetAnalystTechReportUseCase from "domain/usecases/techAssistance/getAnalystTechAssistanceRecord";
import QueryBusinessTechReportSignUseCase from "domain/usecases/techAssistance/queryBusinessTechReportSign";
import GetBusinessStatusUseCase from "domain/usecases/Business/getBusinessStatus.use.case";
import FindScheduleUseCase from "domain/usecases/worker-management/FindSchedule.use.case";
import FindAllSessionByScheduleUseCase from "domain/usecases/worker-management/FindAllSessionBySchedule.use.case";
import findAllProgramsUseCase from "domain/usecases/Business/findAllPrograms.use.case";
import findSchedulesByProgramId from "domain/usecases/Business/findSchedulesByProgram.use.case";
import createBusinessProgramInscriptionUseCase from "domain/usecases/Business/createBusinessProgramInscription.use.case";
import SendSelfManagementToMailUseCase from "domain/usecases/SelfManagement/sendSelfManagementToMail.use.case";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  // ===== KEYCLOAK / DIGITAL IDENTITY

  bind<LogoutKeycloakUseCase>(USECASES_TYPES._LogoutKeycloakUseCase).to(
    LogoutKeycloakUseCase
  );

  // ===== API EMPRESAS

  bind<IsFormBusinessProfileCompleted>(
    USECASES_TYPES._IsFormBusinessProfileCompleted
  ).to(IsFormBusinessProfileCompleted);

  bind<IsSelfManagementAvailableUseCase>(
    USECASES_TYPES._IsSelfManagementAvailable
  ).to(IsSelfManagementAvailableUseCase);

  bind<getDataBusiness>(USECASES_TYPES._GetDataBusiness).to(getDataBusiness);

  bind<getDataLegalRepresentativeAndContact>(
    USECASES_TYPES._GetDataLegalRepresentativeAndContact
  ).to(getDataLegalRepresentativeAndContact);

  bind<getDataBusinessDescriptionUseCase>(
    USECASES_TYPES._GetDataBusinessDescription
  ).to(getDataBusinessDescriptionUseCase);

  bind<getDataDescriptionInfrastructureAndCapacityUseCase>(
    USECASES_TYPES._GetDataDescriptionInfrastructureAndCapacity
  ).to(getDataDescriptionInfrastructureAndCapacityUseCase);

  bind<getDataFinancialInformationUseCase>(
    USECASES_TYPES._GetDataFinancialInformation
  ).to(getDataFinancialInformationUseCase);

  bind<createDataBusinessUseCase>(USECASES_TYPES._CreateDataBusiness).to(
    createDataBusinessUseCase
  );

  bind<CreateDataLegalRepresentativeAndContactUseCase>(
    USECASES_TYPES._CreateDataLegalRepresentativeAndContact
  ).to(CreateDataLegalRepresentativeAndContactUseCase);

  bind<createDataBusinessDescriptionUseCase>(
    USECASES_TYPES._CreateDataBusinessDescription
  ).to(createDataBusinessDescriptionUseCase);

  bind<createDataDescriptionInfrastructureAndCapacityUseCase>(
    USECASES_TYPES._CreateDataInfrastructureAndCapacity
  ).to(createDataDescriptionInfrastructureAndCapacityUseCase);

  bind<createFinancialInformation>(
    USECASES_TYPES._CreateDataFinancialInformation
  ).to(createFinancialInformation);

  bind<findAllDepartmentsUseCase>(USECASES_TYPES._FindAllDepartments).to(
    findAllDepartmentsUseCase
  );

  bind<FindAllCitiesUseCase>(USECASES_TYPES._FindAllCities).to(
    FindAllCitiesUseCase
  );

  bind<FindAllSectorsUseCase>(USECASES_TYPES._FindAllSectors).to(
    FindAllSectorsUseCase
  );

  bind<FindSubsectorsBySectorUseCase>(
    USECASES_TYPES._FindSubsectorsBySector
  ).to(FindSubsectorsBySectorUseCase);

  bind<CreateSelfManagementUseCase>(USECASES_TYPES._CreateSelfManagement).to(
    CreateSelfManagementUseCase
  );
  bind<GetAnalisysUseCase>(USECASES_TYPES._GetAnalisysSelfManagement).to(
    GetAnalisysUseCase
  );
  bind<GetReportUseCase>(USECASES_TYPES._GetReportSelfManagement).to(
    GetReportUseCase
  );

  bind<SaveRuesInformationUseCase>(USECASES_TYPES._SaveRuesInformation).to(
    SaveRuesInformationUseCase
  );

  bind<GetAppointmentByBusinessUseCase>(
    USECASES_TYPES._GetAppointmentsByBusiness
  ).to(GetAppointmentByBusinessUseCase);

  bind<GetOptionsUseCase>(USECASES_TYPES._GetOptionsUseCase).to(
    GetOptionsUseCase
  );

  bind<CreateAppointmentUseCase>(USECASES_TYPES._CreateAppointmentUseCase).to(
    CreateAppointmentUseCase
  );

  bind<findAllCoursesUseCase>(USECASES_TYPES._findAllCourses).to(
    findAllCoursesUseCase
  );

  bind<findCourseSheduleByCourseIdUseCase>(
    USECASES_TYPES._findCourseSheduleByCourseId
  ).to(findCourseSheduleByCourseIdUseCase);

  bind<CreateCourseRegistrationUseCase>(
    USECASES_TYPES._CreateCourseRegistration
  ).to(CreateCourseRegistrationUseCase);

  bind<findCourseCurriculumByCourseSheduleIdUseCase>(
    USECASES_TYPES._findCourseCurriculumByCourseScheduleId
  ).to(findCourseCurriculumByCourseSheduleIdUseCase);

  bind<ValidateEmployeeCourseRegisterUseCase>(
    USECASES_TYPES._ValidateEmployeeCourseRegisterUseCase
  ).to(ValidateEmployeeCourseRegisterUseCase);

  bind<DeleteEmployeeCourseRegisterUseCase>(
    USECASES_TYPES._DeleteEmployeeCourseRegisterUseCase
  ).to(DeleteEmployeeCourseRegisterUseCase);

  // Tech-Assistance
  bind<SaveAssistanceRecordFormUseCase>(
    USECASES_TYPES._SaveAssistanceRecordFormUseCase
  ).to(SaveAssistanceRecordFormUseCase);

  bind<GetTechRecordSignListUseCase>(
    USECASES_TYPES._GetTechRecordSignListUseCase
  ).to(GetTechRecordSignListUseCase);

  bind<GetAnalystTechReportUseCase>(
    USECASES_TYPES._GetAnalystTechReportUseCase
  ).to(GetAnalystTechReportUseCase);

  bind<QueryBusinessTechReportSignUseCase>(
    USECASES_TYPES._QueryBusinessTechReportSignUseCase
  ).to(QueryBusinessTechReportSignUseCase);

  // Job-Vacancy
  bind<SaveJobVacancyRegisterFormUseCase>(
    USECASES_TYPES._SaveJobVacancyRegisterFormUseCase
  ).to(SaveJobVacancyRegisterFormUseCase);

  // Form Utils Select
  bind<GetSelectOptionsFormUseCase>(
    USECASES_TYPES._GetSelectOptionsFormUseCase
  ).to(GetSelectOptionsFormUseCase);

  // Program
  bind<CreateProgramUseCase>(USECASES_TYPES._CreateProgram).to(
    CreateProgramUseCase
  );

  bind<GetDataProgramUseCase>(USECASES_TYPES._GetDataProgram).to(
    GetDataProgramUseCase
  );

  bind<findAllProgramsUseCase>(USECASES_TYPES._findAllProgramsUseCase).to(
    findAllProgramsUseCase
  );

  bind<findSchedulesByProgramId>(USECASES_TYPES._findSchedulesByProgramId).to(
    findSchedulesByProgramId
  );

  bind<createBusinessProgramInscriptionUseCase>(
    USECASES_TYPES._createBusinessProgramInscriptionUseCase
  ).to(createBusinessProgramInscriptionUseCase);

  bind<GetEmployeesAvailableByBussinessUseCase>(
    USECASES_TYPES._GetEmployeesAvailableByBussiness
  ).to(GetEmployeesAvailableByBussinessUseCase);

  bind<GetRegisteredEmployeesByScheduleUseCase>(
    USECASES_TYPES._GetRegisteredEmployeesBySchedule
  ).to(GetRegisteredEmployeesByScheduleUseCase);

  bind<PrevalidationBusinessUseCase>(USECASES_TYPES._PrevalidationBusiness).to(
    PrevalidationBusinessUseCase
  );

  bind<ValidationRuesBusinessUseCase>(
    USECASES_TYPES._ValidationRuesBusiness
  ).to(ValidationRuesBusinessUseCase);

  bind<IsValidatedBusinessUseCase>(USECASES_TYPES._IsValidatedBusiness).to(
    IsValidatedBusinessUseCase
  );

  bind<GetBusinessStatusUseCase>(USECASES_TYPES._GetBusinessStatus).to(
    GetBusinessStatusUseCase
  );

  bind<FindScheduleUseCase>(USECASES_TYPES._FindSchedule).to(
    FindScheduleUseCase
  );

  bind<FindAllSessionByScheduleUseCase>(
    USECASES_TYPES._findAllSessionBySchedule
  ).to(FindAllSessionByScheduleUseCase);

  bind<SendSelfManagementToMailUseCase>(
    USECASES_TYPES._SendSelfManagementToMail
  ).to(SendSelfManagementToMailUseCase);
});
