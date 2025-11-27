export const USECASES_TYPES = {
  // KEYCLOAK
  _UpdateUserInformationUseCase: Symbol("UpdateUserInformationUseCase"),
  _LogoutKeycloakUseCase: Symbol("LogoutKeycloakUseCase"),

  // API EMPRESAS
  _IsFormBusinessProfileCompleted: Symbol("IsFormBusinessProfileCompleted"),
  _IsSelfManagementAvailable: Symbol("IsSelfManagementAvailable"),
  _GetDataBusiness: Symbol("GetDataBusiness"),
  _GetDataLegalRepresentativeAndContact: Symbol(
    "GetDataLegalRepresentativeAndContact"
  ),
  _GetDataBusinessDescription: Symbol("GetDataBusinessDescription"),
  _GetDataDescriptionInfrastructureAndCapacity: Symbol(
    "GetDataDescriptionInfrastructureAndCapacity"
  ),
  _GetDataFinancialInformation: Symbol("GetDataFinancialInformation"),
  _CreateDataBusiness: Symbol("CreateDataBusiness"),
  _CreateDataLegalRepresentativeAndContact: Symbol(
    "CreateDataLegalRepresentativeAndContact"
  ),
  _CreateDataBusinessDescription: Symbol("CreateDataBusinessDescription"),
  _CreateDataInfrastructureAndCapacity: Symbol(
    "CreateDataInfrastructureAndCapacity"
  ),
  _CreateDataFinancialInformation: Symbol("CreateDataFinancialInformation"),
  _FindAllDepartments: Symbol("FindAllDepartments"),
  _FindAllCities: Symbol("FindAllCities"),
  _FindAllSectors: Symbol("FindAllSectors"),
  _FindSubsectorsBySector: Symbol("FindSubsectorsBySector"),
  _CreateSelfManagement: Symbol("CreateSelfManagement"),
  _GetAnalisysSelfManagement: Symbol("GetAnalisysSelfManagement"),
  _GetReportSelfManagement: Symbol("GetReportSelfManagement"),
  _SaveRuesInformation: Symbol("SaveRuesInformation"),
  _GetAppointmentsByBusiness: Symbol("GetAppointmentsByBusiness"),
  _GetOptionsUseCase: Symbol("GetOptionsUseCase"),
  _CreateAppointmentUseCase: Symbol("CreateAppointmentUseCase"),
  _SendSelfManagementToMail: Symbol("SendSelfManagementToMail"),

  // Courses management
  _findAllCourses: Symbol("findAllCourses"),
  _findCourseSheduleByCourseId: Symbol("findCourseSheduleByCourseId"),
  _CreateCourseRegistration: Symbol("CreateCourseRegistration"),
  _findCourseCurriculumByCourseScheduleId: Symbol(
    "findCourseCurriculumByCourseScheduleId"
  ),
  _ValidateEmployeeCourseRegisterUseCase: Symbol(
    "ValidateEmployeeCourseRegisterUseCase"
  ),

  _CreateProgram: Symbol("CreateProgram"),
  _GetDataProgram: Symbol("GetDataProgram"),
  _findAllProgramsUseCase: Symbol("findAllProgramsUseCase"),
  _findSchedulesByProgramId: Symbol("findSchedulesByProgramId"),
  _createBusinessProgramInscriptionUseCase: Symbol(
    "createBusinessProgramInscriptionUseCase"
  ),

  _GetEmployeesAvailableByBussiness: Symbol("GetEmployeesAvailableByBussiness"),
  _GetRegisteredEmployeesBySchedule: Symbol("GetRegisteredEmployeesBySchedule"),
  _DeleteEmployeeCourseRegisterUseCase: Symbol(
    "DeleteEmployeeCourseRegisterUseCase"
  ),
  _PrevalidationBusiness: Symbol("PrevalidationBusiness"),
  _ValidationRuesBusiness: Symbol("ValidationRuesBusiness"),
  _IsValidatedBusiness: Symbol("IsValidatedBusiness"),
  _FindSchedule: Symbol("FindSchedule"),
  _findAllSessionBySchedule: Symbol("findAllSessionBySchedule"),

  // Tech-Assistance-form
  _SaveAssistanceRecordFormUseCase: Symbol("SaveAssistanceRecordFormUseCase"),
  _GetTechRecordSignListUseCase: Symbol("GetTechRecordSignListUseCase"),
  _GetAnalystTechReportUseCase: Symbol("GetAnalystTechReportUseCase"),
  _QueryBusinessTechReportSignUseCase: Symbol(
    "QueryBusinessTechReportSignUseCase"
  ),

  // JobVacancy-form
  _SaveJobVacancyRegisterFormUseCase: Symbol(
    "SaveJobVacancyRegisterFormUseCase"
  ),

  // Form utils get select options
  _GetSelectOptionsFormUseCase: Symbol("GetSelectOptionsFormUseCase"),
  _GetBusinessStatus: Symbol("GetBusinessStatus"),
};
