import { ContainerModule, interfaces } from "inversify";
import { USECASES_TYPES } from "./usecases.types";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { FindStatusByUserUseCase } from "domain/usecases/digital-identity/findStatusByUser.usecase";
import GetLastTransactionUseCase from "domain/usecases/digital-identity/getLastTransaction.usecase";
import GetDocumentTypeUseCase from "domain/usecases/documentType/getDocumentType.use.case";
import GetDepartmentUseCase from "domain/usecases/department/getDepartment.use.case";
import GetCityUseCase from "domain/usecases/city/getCity.use.case";
import GetCommunityUseCase from "domain/usecases/community/getCommunity.use.case";
import GetReserveUseCase from "domain/usecases/reserve/getReserve.use.case";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import AffiliatePacUseCase from "domain/usecases/affiliation/affiliastePac.use.case";
import RightsVerifyUseCase from "domain/usecases/rightsChecker/rightsVerify.use.case";
import UpdateRequestUseCase from "domain/usecases/request/updateRequest.use.case";
import FindAllCampaignsFilteredUseCase from "domain/usecases/campaign/findAllCampaignsFiltered.use.case";
import FindAllStatusUseCase from "domain/usecases/status/findAllStatus.use.case";
import FindAllRequestsUseCase from "domain/usecases/request/findAllRequests.use.case";
import WithdrawalPacUseCase from "domain/usecases/withdrawal/WithdrawalPac.use.case";
import SendUserDataUseCase from "domain/usecases/userData/sendUserData.usecase";
import UserMpacDataUseCase from "domain/usecases/userData/userdataMpac.usecase";
import PushDatabaseUseCase from "domain/usecases/digital-identity/pushDatabase.usecase";
import CreateUserTermAndConditionUseCase from "domain/usecases/terms-conditions/createUserTermAndCondition.use.case";
import ValidateUserTermsAndConditionsUseCase from "domain/usecases/terms-conditions/validateUserTermAndConditions.use.case";
import GetTermAndConditionDataUseCase from "domain/usecases/terms-conditions/getTermAndConditionData.use.case";
import GetVerifyTotp from "domain/usecases/verify-totp/getVerifyTotp.use.case";
import UpdateUserInformationUseCase from "domain/usecases/keycloak/updateUserData.usecase";
import DownloadFilesUseCase from "domain/usecases/Files/downloadFiles.use.case";
import GetConfigurationUseCase from "domain/usecases/configuration/getConfiguration.use.case";
import GetEntitiesUseCase from "domain/usecases/entities/getEntities.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import GetEconomicActivityUseCase from "domain/usecases/economicActivity/getEconomicActivity.use.case";
import GetAportantStatusUseCase from "domain/usecases/aportant/getAportantStatus";
import UserSiseValidationUseCase from "domain/usecases/userData/userSiseValidation.usecase";
import GetOccupationUseCase from "domain/usecases/occupation/getOccupation.use.case";
import UserFospecValidationUseCase from "domain/usecases/userData/userFospecValidation.usecase";
import SaveSiseAbsentUserUseCase from "domain/usecases/userData/saveSiseAbsentUser.usecase";
import GetAvailableCoursesUserUseCase from "domain/usecases/userData/userCoursesAvailable.usecase";
import UserFospecTrainingUseCase from "domain/usecases/userData/userFospecTraining.usecase";
import SaveUserResumeFormUseCase from "domain/usecases/userData/userSaveResumeForm.usecase";
import GetUserResumeFormUseCase from "domain/usecases/userData/userGetResumeForm.usecase";
import UserSiseResumeUseCase from "domain/usecases/userData/userSiseResume.usecase";
import GetSelectOptionsFormUseCase from "domain/usecases/userData/userFormGetSelectOptions.usecase";
import GetOpenJobsListUseCase from "domain/usecases/fospec/getFospecOpenJobList.usecase";
import GetUserResumeFileUseCase from "domain/usecases/userData/userGetResumeFile.usecase";
import GetJobPostulationListUseCase from "domain/usecases/userData/jobPostulation/userJobPostulationList.usecase";
import SaveJobPostulationUseCase from "domain/usecases/userData/jobPostulation/userSaveJobPostulation.usecase";
import SaveMpacValidationHistoryCase from "domain/usecases/userMpacHistory/userSaveMpacValidationHistory.usecase";
import GetHistoryCoursesUserUseCase from "domain/usecases/userData/userCoursesHistory.usecase";
import RegisterCourseUseCase from "domain/usecases/userData/registerCourse.usecase";
import UserTrainingCoursesUseCase from "domain/usecases/userData/userTrainingCourses.usecase";
import FindMassiveAttachmentByFiled from "domain/usecases/attachment/findMassiveAttachmentByFiled.use.case";
import GenerateCertificateUseCase from "domain/usecases/certificate/GenerateCertificate.use.case";
import FindAllRequestsAuditsUseCase from "domain/usecases/request/findAllRequestsAudits.use.case";
import UserFospecMeetValidationUseCase from "domain/usecases/fospec/UserFospecMeetValidation.usecase";
import GetCourseScheduleUseCase from "domain/usecases/courses/GetCourseSchedule.usecase";
import RegisterUnemployedInCourseUseCase from "domain/usecases/courses/RegisterUnemployedInCourse.usecase";
import GetUserResumeStatusUseCase from "domain/usecases/userData/userGetResumeStatus.usecase";
import RegisterEmployeeInCourseUseCase from "domain/usecases/courses/RegisterEmployeeInCourse.usecase";
import FindPsyTestExamUseCase from "domain/usecases/psicometric-test/findPsyTestExam";
import SaveSingleAnswerUseCase from "domain/usecases/psicometric-test/saveSingleAnswer.use.case";
import ClosePsyTestExamUseCase from "domain/usecases/psicometric-test/closePsyTestExam.use.case";
import FindPsyTestResultsUseCase from "domain/usecases/psicometric-test/findPsyTestResults";
import UserJupiterValidationUseCase from "domain/usecases/userJupiter/UserJupiterValidation.usecase";
import ListPendingPsyTestUseCase from "domain/usecases/psicometric-test/listPendingPsyTests.usecase";
import GetCoursesForBeneficiaryUseCase from "domain/usecases/userData/getCoursesForBeneficiary.usecase";
import ValidateIdentityUseCase from "domain/usecases/rnec/validateIdentityUseCase";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  // ===== KEYCLOAK / DIGITAL IDENTITY

  bind<UpdateUserInformationUseCase>(
    USECASES_TYPES._UpdateUserInformationUseCase
  ).to(UpdateUserInformationUseCase);

  bind<LogoutKeycloakUseCase>(USECASES_TYPES._LogoutKeycloakUseCase).to(
    LogoutKeycloakUseCase
  );

  bind<FindStatusByUserUseCase>(USECASES_TYPES._FindStatusByUserUseCase).to(
    FindStatusByUserUseCase
  );

  bind<GetLastTransactionUseCase>(USECASES_TYPES._GetLastTransactionUseCase).to(
    GetLastTransactionUseCase
  );

  bind<PushDatabaseUseCase>(USECASES_TYPES._PushDatabaseUseCase).to(
    PushDatabaseUseCase
  );

  // ===== USER DATA

  bind<SendUserDataUseCase>(USECASES_TYPES._SendUserDataUseCase).to(
    SendUserDataUseCase
  );

  bind<GetAvailableCoursesUserUseCase>(
    USECASES_TYPES._GetAvailableCoursesUserUseCase
  ).to(GetAvailableCoursesUserUseCase);

  bind<GetHistoryCoursesUserUseCase>(
    USECASES_TYPES._GetHistoryCoursesUserUseCase
  ).to(GetHistoryCoursesUserUseCase);

  bind<UserMpacDataUseCase>(USECASES_TYPES._UserMpacDataUseCase).to(
    UserMpacDataUseCase
  );

  bind<SaveMpacValidationHistoryCase>(
    USECASES_TYPES._SaveMpacValidationHistoryCase
  ).to(SaveMpacValidationHistoryCase);

  // SISE
  bind<SaveSiseAbsentUserUseCase>(USECASES_TYPES._SaveSiseAbsentUserUseCase).to(
    SaveSiseAbsentUserUseCase
  );

  bind<UserSiseValidationUseCase>(USECASES_TYPES._UserSiseValidationUseCase).to(
    UserSiseValidationUseCase
  );

  bind<UserSiseResumeUseCase>(USECASES_TYPES._UserSiseResumeUseCase).to(
    UserSiseResumeUseCase
  );

  // FOSPEC
  bind<UserFospecValidationUseCase>(
    USECASES_TYPES._UserFospecValidationUseCase
  ).to(UserFospecValidationUseCase);

  bind<UserFospecMeetValidationUseCase>(
    USECASES_TYPES._UserFospecMeetValidationUseCase
  ).to(UserFospecMeetValidationUseCase);

  bind<UserFospecTrainingUseCase>(USECASES_TYPES._UserFospecTrainingUseCase).to(
    UserFospecTrainingUseCase
  );

  bind<GetOpenJobsListUseCase>(USECASES_TYPES._GetOpenJobsListUseCase).to(
    GetOpenJobsListUseCase
  );

  // RESUME Module
  bind<SaveUserResumeFormUseCase>(USECASES_TYPES._UserSaveUserResumeForm).to(
    SaveUserResumeFormUseCase
  );

  bind<GetUserResumeFormUseCase>(USECASES_TYPES._UserGetUserResumeForm).to(
    GetUserResumeFormUseCase
  );

  bind<GetUserResumeStatusUseCase>(
    USECASES_TYPES._GetUserResumeStatusUseCase
  ).to(GetUserResumeStatusUseCase);

  // Forms
  bind<GetUserResumeFileUseCase>(USECASES_TYPES._GetUserResumeFileUseCase).to(
    GetUserResumeFileUseCase
  );

  bind<GetSelectOptionsFormUseCase>(
    USECASES_TYPES._GetSelectOptionsFormUseCase
  ).to(GetSelectOptionsFormUseCase);

  // POSTULATION
  bind<GetJobPostulationListUseCase>(
    USECASES_TYPES._GetJobPostulationListUseCase
  ).to(GetJobPostulationListUseCase);

  bind<SaveJobPostulationUseCase>(USECASES_TYPES._SaveJobPostulationUseCase).to(
    SaveJobPostulationUseCase
  );

  // ===== RIA
  bind<GetDocumentTypeUseCase>(USECASES_TYPES._GetDocumentTypeUseCase).to(
    GetDocumentTypeUseCase
  );
  bind<GetDepartmentUseCase>(USECASES_TYPES._GetDepartmentUseCase).to(
    GetDepartmentUseCase
  );
  bind<GetCityUseCase>(USECASES_TYPES._GetCityUseCase).to(GetCityUseCase);
  bind<GetCommunityUseCase>(USECASES_TYPES._GetCommunityUseCase).to(
    GetCommunityUseCase
  );
  bind<GetReserveUseCase>(USECASES_TYPES._GetReserveUseCase).to(
    GetReserveUseCase
  );
  bind<CreateRequestUseCase>(USECASES_TYPES._CreateRequestUseCase).to(
    CreateRequestUseCase
  );
  bind<UpdateRequestUseCase>(USECASES_TYPES._UpdateRequestUseCase).to(
    UpdateRequestUseCase
  );
  bind<AffiliatePacUseCase>(USECASES_TYPES._AffiliatePacUseCase).to(
    AffiliatePacUseCase
  );
  bind<RightsVerifyUseCase>(USECASES_TYPES._RightsVerifyUseCase).to(
    RightsVerifyUseCase
  );
  bind<FindAllCampaignsFilteredUseCase>(
    USECASES_TYPES._FindAllCampaignsFilteredUseCase
  ).to(FindAllCampaignsFilteredUseCase);
  bind<FindAllStatusUseCase>(USECASES_TYPES._FindAllStatusUseCase).to(
    FindAllStatusUseCase
  );
  bind<FindAllRequestsUseCase>(USECASES_TYPES._FindAllRequestsTypesUseCase).to(
    FindAllRequestsUseCase
  );
  bind<WithdrawalPacUseCase>(USECASES_TYPES._WithdrawalPacUseCase).to(
    WithdrawalPacUseCase
  );
  bind<DownloadFilesUseCase>(USECASES_TYPES._DownloadFileUseCase).to(
    DownloadFilesUseCase
  );

  bind<GetConfigurationUseCase>(USECASES_TYPES._GetConfigurationUseCase).to(
    GetConfigurationUseCase
  );
  bind<GetEntitiesUseCase>(USECASES_TYPES._GetEntitiesUseCase).to(
    GetEntitiesUseCase
  );
  bind<GetOptionsUseCase>(USECASES_TYPES._GetOptionsUseCase).to(
    GetOptionsUseCase
  );
  bind<GetEconomicActivityUseCase>(
    USECASES_TYPES._GetEconomicActivityUseCase
  ).to(GetEconomicActivityUseCase);

  bind<GetAportantStatusUseCase>(USECASES_TYPES._GetAportantStatusUseCase).to(
    GetAportantStatusUseCase
  );

  bind<GetOccupationUseCase>(USECASES_TYPES._GetOccupationUseCase).to(
    GetOccupationUseCase
  );
  bind<FindMassiveAttachmentByFiled>(
    USECASES_TYPES._FindMassiveAttachmentByFiledIdUseCase
  ).to(FindMassiveAttachmentByFiled);
  bind<GenerateCertificateUseCase>(
    USECASES_TYPES._GenerateCertificateUseCase
  ).to(GenerateCertificateUseCase);
  bind<FindAllRequestsAuditsUseCase>(
    USECASES_TYPES._FindAllRequestsAuditsUseCase
  ).to(FindAllRequestsAuditsUseCase);

  // ===== TERMS AND CONDITIONS
  bind<CreateUserTermAndConditionUseCase>(
    USECASES_TYPES._CreatUserTermAndConditionUseCase
  ).to(CreateUserTermAndConditionUseCase);

  bind<ValidateUserTermsAndConditionsUseCase>(
    USECASES_TYPES._ValidateUserTermsAndConditionsUseCase
  ).to(ValidateUserTermsAndConditionsUseCase);

  bind<GetTermAndConditionDataUseCase>(
    USECASES_TYPES._GetTermAndConditionDataUseCase
  ).to(GetTermAndConditionDataUseCase);

  // ===== TOTP VALIDATE
  bind<GetVerifyTotp>(USECASES_TYPES._GetVerifyTotp).to(GetVerifyTotp);

  // USER DATA
  bind<RegisterCourseUseCase>(USECASES_TYPES._RegisterCourseUseCase).to(
    RegisterCourseUseCase
  );

  // Training Courses
  bind<UserTrainingCoursesUseCase>(
    USECASES_TYPES._UserTrainingCoursesUseCase
  ).to(UserTrainingCoursesUseCase);

  bind<GetCourseScheduleUseCase>(USECASES_TYPES._GetCourseScheduleUseCase).to(
    GetCourseScheduleUseCase
  );

  bind<RegisterUnemployedInCourseUseCase>(
    USECASES_TYPES._RegisterUnemployedInCourseUseCase
  ).to(RegisterUnemployedInCourseUseCase);

  bind<RegisterEmployeeInCourseUseCase>(
    USECASES_TYPES._RegisterEmployeeInCourseUseCase
  ).to(RegisterEmployeeInCourseUseCase);

  bind<GetCoursesForBeneficiaryUseCase>(
    USECASES_TYPES._GetCoursesForBeneficiaryUseCase
  ).to(GetCoursesForBeneficiaryUseCase);

  // PSYCHOMETRIC TEST
  bind<FindPsyTestExamUseCase>(USECASES_TYPES._FindPsyTestExamUseCase).to(
    FindPsyTestExamUseCase
  );

  bind<SaveSingleAnswerUseCase>(USECASES_TYPES._SaveSingleAnswerUseCase).to(
    SaveSingleAnswerUseCase
  );

  bind<ClosePsyTestExamUseCase>(USECASES_TYPES._ClosePsyTestExamUseCase).to(
    ClosePsyTestExamUseCase
  );

  bind<FindPsyTestResultsUseCase>(USECASES_TYPES._FindPsyTestResultsUseCase).to(
    FindPsyTestResultsUseCase
  );

  bind<ListPendingPsyTestUseCase>(USECASES_TYPES._ListPendingPsyTestUseCase).to(
    ListPendingPsyTestUseCase
  );

  // JUPITER VALIDATION
  bind<UserJupiterValidationUseCase>(
    USECASES_TYPES._UserJupiterValidationUseCase
  ).to(UserJupiterValidationUseCase);

  // RNEC VALIDATION
  bind<ValidateIdentityUseCase>(USECASES_TYPES._ValidateIdentityUseCase).to(
    ValidateIdentityUseCase
  );
});
