export const USECASES_TYPES = {
  // KEYCLOAK
  _UpdateUserInformationUseCase: Symbol.for("UpdateUserInformationUseCase"),
  _LogoutKeycloakUseCase: Symbol.for("LogoutKeycloakUseCase"),

  // DIGITAL IDENTITY
  _FindStatusByUserUseCase: Symbol.for("FindStatusByUserUseCase"),
  _GetLastTransactionUseCase: Symbol.for("GetLastTransactionUseCase"),
  _PushDatabaseUseCase: Symbol.for("PushDatabaseUseCase"),

  // USER DATA
  _SendUserDataUseCase: Symbol.for("SendUserDataUseCase"),
  _SaveSiseAbsentUserUseCase: Symbol("SaveSiseAbsentUserUseCase"),
  _GetAvailableCoursesUserUseCase: Symbol.for("GetAvailableCoursesUserUseCase"),
  _GetHistoryCoursesUserUseCase: Symbol("GetHistoryCoursesUserUseCase"),
  _RegisterCourseUseCase: Symbol("RegisterCourseUseCase"),

  // USER POSTULATION
  _GetJobPostulationListUseCase: Symbol("GetJobPostulationListUseCase"),
  _SaveJobPostulationUseCase: Symbol("SaveJobPostulationUseCase"),

  // FORMS USER DATA
  _GetSelectOptionsFormUseCase: Symbol("GetSelectOptionsFormUseCase"),
  _GetUserResumeFileUseCase: Symbol("GetUserResumeFileUseCase"),
  _GetUserResumeStatusUseCase: Symbol("GetUserResumeStatusUseCase"),

  // SISE USER DATA
  _UserSiseValidationUseCase: Symbol("UserSiseValidationUseCase"),
  _UserSiseResumeUseCase: Symbol("UserSiseResumeUseCase"),

  // MPAC USER DATA
  _UserMpacDataUseCase: Symbol.for("UserMpacDataUseCase"),

  // FOSPEC USER DATA
  _UserFospecValidationUseCase: Symbol("UserFospecValidationUseCase"),
  _UserFospecMeetValidationUseCase: Symbol("UserFospecMeetValidationUseCase"),
  _UserFospecTrainingUseCase: Symbol.for("UserFospecTrainingUseCase"),
  _UserSaveUserResumeForm: Symbol("UserSaveUserResumeForm"),
  _UserGetUserResumeForm: Symbol("UserGetUserResumeForm"),
  _GetOpenJobsListUseCase: Symbol("GetOpenJobsListUseCase"),

  // USER SAVE MPAC VALIDATION HISTORY
  _SaveMpacValidationHistoryCase: Symbol("SaveMpacValidationHistoryCase"),

  // RIA
  _GetDocumentTypeUseCase: Symbol("GetDocumentTypeUseCase"),
  _GetDepartmentUseCase: Symbol("GetDepartmentUseCase"),
  _GetCityUseCase: Symbol("GetCityUseCase"),
  _GetCommunityUseCase: Symbol("GetCommunityUseCase"),
  _GetReserveUseCase: Symbol("GetReserveUseCase"),
  _CreateRequestUseCase: Symbol("CreateRequestUseCase"),
  _UpdateRequestUseCase: Symbol("UpdateRequestUseCase"),
  _AffiliatePacUseCase: Symbol("AffiliatePacUseCase"),
  _RightsVerifyUseCase: Symbol("RightsVerifyUseCase"),
  _FindAllCampaignsFilteredUseCase: Symbol("FindAllCampaignsFilteredUseCase"),
  _FindAllStatusUseCase: Symbol("FindAllStatusUseCase"),
  _FindAllRequestsTypesUseCase: Symbol("FindAllRequestsTypesUseCase"),
  _WithdrawalPacUseCase: Symbol("WithdrawalPacUseCase"),
  _DownloadFileUseCase: Symbol("DownloadFileUseCase"),
  _GetConfigurationUseCase: Symbol("GetConfigurationUseCase"),
  _GetEntitiesUseCase: Symbol("GetEntitiesUseCase"),
  _GetOptionsUseCase: Symbol("GetOptionsUseCase"),
  _GetEconomicActivityUseCase: Symbol("GetEconomicActivityUseCase"),
  _GetAportantStatusUseCase: Symbol("GetAportantStatusUseCase"),
  _GetOccupationUseCase: Symbol("GetOccupationUseCase"),
  _FindMassiveAttachmentByFiledIdUseCase: Symbol(
    "FindMassiveAttachmentByFiledIdUseCase"
  ),
  _GenerateCertificateUseCase: Symbol("GenerateCertificateUseCase"),
  _FindAllRequestsAuditsUseCase: Symbol("FindAllRequestsAuditsUseCase"),

  // TERMS AND CONDITIONS
  _CreatUserTermAndConditionUseCase: Symbol("CreatUserTermAndConditionUseCase"),
  _GetTermAndConditionDataUseCase: Symbol("GetTermAndConditionDataUseCase"),
  _ValidateUserTermsAndConditionsUseCase: Symbol(
    "ValidateUserTermsAndConditionsUseCase"
  ),
  _UserTermAndConditionsUseCase: Symbol("UserTermAndConditionsUseCase"),

  // TOPT VALIDATE
  _GetVerifyTotp: Symbol("GetVerifyTotp"),

  // COURSES MANAGEMENT
  _GetBeneficiaryCoursesUserUseCase: Symbol.for(
    "GetBeneficiaryCoursesUserUseCase"
  ),
  _UserTrainingCoursesUseCase: Symbol.for("UserTrainingCoursesUseCase"),
  _GetActiveWorkerCoursesUseCase: Symbol.for("GetActiveWorkerCoursesUseCase"),
  _GetCourseScheduleUseCase: Symbol("GetCourseScheduleUseCase"),
  _RegisterUnemployedInCourseUseCase: Symbol(
    "RegisterUnemployedInCourseUseCase"
  ),
  _RegisterEmployeeInCourseUseCase: Symbol("RegisterEmployeeInCourseUseCase"),
  _UserDataRepository: Symbol.for("UserDataRepository"),
  _GetCoursesForBeneficiaryUseCase: Symbol.for(
    "GetCoursesForBeneficiaryUseCase"
  ),

  // PSYCHOMETRIC TEST
  _FindPsyTestExamUseCase: Symbol.for("FindPsyTestExamUseCase"),
  _SaveSingleAnswerUseCase: Symbol.for("SaveSingleAnswerUseCase"),
  _ClosePsyTestExamUseCase: Symbol.for("ClosePsyTestExamUseCase"),
  _FindPsyTestResultsUseCase: Symbol.for("FindPsyTestResultsUseCase"),
  _ListPendingPsyTestUseCase: Symbol("ListPendingPsyTestUseCase"),

  // JUPITER VALIDATION
  _UserJupiterValidationUseCase: Symbol("UserJupiterValidationUseCase"),

  // RNEC VALIDATION
  _ValidateIdentityUseCase: Symbol("ValidateIdentityUseCase"),
};
