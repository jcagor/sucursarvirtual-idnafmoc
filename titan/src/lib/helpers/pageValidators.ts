import UserMpacDataUseCase from "domain/usecases/userData/userdataMpac.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { UserDataInterface, UserMpacDataInterface } from "lib/types";
import { GenerateMpacUser } from "./generateMpacUser";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  FOSPEC_USER_STATUS_MESSAGE,
  MPAC_API_RESULT_CODE,
  MPAC_API_RESULT_CODE_ENUM,
  MPAC_API_USER_REQUIREMENT_STATUS,
  MPAC_API_USER_REQUIREMENT_STATUS_CODE_ENUM,
  MPAC_API_USER_REQUIREMENT_STATUS_ENUM,
  MPAC_API_USER_TYPE_ENUM,
  MPAC_USER_STATUS_MESSAGE,
  SISE_API_RESULT_CODE,
  SISE_API_RESULT_CODE_ENUM,
  SISE_USER_STATUS_MESSAGE,
} from "lib/config";
import UserSiseValidationUseCase from "domain/usecases/userData/userSiseValidation.usecase";
import { GenerateSiseQuery } from "./generateSiseQuery";
import GetHistoryCoursesUserUseCase from "domain/usecases/userData/userCoursesHistory.usecase";
import UserFospecValidationUseCase from "domain/usecases/userData/userFospecValidation.usecase";
import { GenerateFospecQuery } from "./generateFospecQuery";
import { HttpStatusCode } from "axios";
import UserFospecMeetValidationUseCase from "domain/usecases/fospec/UserFospecMeetValidation.usecase";
import GetUserResumeStatusUseCase from "domain/usecases/userData/userGetResumeStatus.usecase";
import {
  JupiterDocumentResult,
  JupiterStatusQuery,
} from "domain/models/jupiterResultsType";
import UserJupiterValidationUseCase from "domain/usecases/userJupiter/UserJupiterValidation.usecase";
import ListPendingPsyTestUseCase from "domain/usecases/psicometric-test/listPendingPsyTests.usecase";

export const queryMpacValidation = async (accessToken: string) => {
  try {
    const sessionData: UserDataInterface = jwtDecode(accessToken);

    // Generamos y enviamos los datos del usuario al servicio prevalidador MPAC.
    const sendUserMpacDataUseCase = appContainer.get<UserMpacDataUseCase>(
      USECASES_TYPES._UserMpacDataUseCase
    );

    const userData = GenerateMpacUser(
      sessionData.identification_type!,
      sessionData.identification_number!
    );

    const dataMpac = await sendUserMpacDataUseCase.execute(
      userData,
      accessToken
    );

    //console.log("MPAC DATA RAW:", dataMpac);

    // 1. Validamos respuesta correcta de la API.
    if (dataMpac?.OUT_Salida === MPAC_API_RESULT_CODE.OK) {
      // 2. Verificamos el estado actual del usuario cumple.
      if (
        dataMpac?.OUT_IdState.trim() ===
          MPAC_API_USER_REQUIREMENT_STATUS_CODE_ENUM.OK ||
        dataMpac?.OUT_Description.trim() ===
          MPAC_API_USER_REQUIREMENT_STATUS.OK ||
        dataMpac?.OUT_Description.trim() ===
          MPAC_API_USER_REQUIREMENT_STATUS.OK_2
      ) {
        // 3. Se actualiza el estado y la descripcion del estado actual.
        return {
          mpacData: dataMpac,
          mpac_status: MPAC_USER_STATUS_MESSAGE.COMPLETE,
        };
      }
      // Si el estado actual del usuario no cumple.
      else {
        return {
          mpacData: dataMpac,
          mpac_status: MPAC_USER_STATUS_MESSAGE.OBSERVATIONS,
        };
      }
    }
    if (dataMpac?.OUT_Salida === MPAC_API_RESULT_CODE.NOT_FOUND) {
      return {
        mpacData: {
          OUT_Fecha_Nacimiento_Cliente_Fmt1: "",
          OUT_Fecha_Retiro_Empresa_Fmt2: "",
          OUT_IdState: "001",
          OUT_reason: "Ok",
          OUT_Description: MPAC_API_USER_REQUIREMENT_STATUS_ENUM.OK,
          OUT_Salario_Pila: "",
          OUT_Salida: MPAC_API_RESULT_CODE_ENUM.NOT_FOUND,
          OUT_Numero_Documento_Cliente: sessionData.identification_number,
          OUT_Tipo_Documento_Cliente: sessionData.identification_type,
          OUT_Tipo_Actor: MPAC_API_USER_TYPE_ENUM.UNIVERSAL,
        } as UserMpacDataInterface,
        mpac_status: MPAC_USER_STATUS_MESSAGE.COMPLETE,
      };
    } else {
      // Error al solicitar la API
      return false;
    }
  } catch (error) {
    // Un-handled error:
    console.error("error al consultar el estado MPAC", error);
    return false;
  }
};

export const querySiseValidation = async (accessToken: string) => {
  try {
    const sessionData: UserDataInterface = jwtDecode(accessToken);

    // Generamos y enviamos los datos del usuario al servicio pre-validador Sise.
    const sendSiseQueryUseCase = appContainer.get<UserSiseValidationUseCase>(
      USECASES_TYPES._UserSiseValidationUseCase
    );
    const userData = GenerateSiseQuery(
      sessionData.identification_type!,
      sessionData.identification_number!
    );

    const dataSise = await sendSiseQueryUseCase.execute(userData, accessToken);

    //console.log("SISE DATA RAW:", dataSise);

    // 1. Validamos respuesta correcta de la API.
    if (dataSise?.Estado_HV === SISE_API_RESULT_CODE.ACTIVO) {
      // TODO: Agregar validaciones adicionales
      return SISE_USER_STATUS_MESSAGE.COMPLETE;
    } else if (
      dataSise !== undefined &&
      dataSise?.Salida_Error == SISE_API_RESULT_CODE_ENUM.NOT_REGISTERED
    ) {
      // El estado del usuario no es correcto

      // ALL-WAYS PASS
      //return SISE_USER_STATUS_MESSAGE.INCOMPLETE;
      return SISE_USER_STATUS_MESSAGE.COMPLETE;
    } else {
      // Error al solicitar la API
      return SISE_USER_STATUS_MESSAGE.IN_PROCESS;
    }
  } catch (error) {
    console.error("error al consultar el estado SISE", error);
    return undefined;
  }
};

export const queryUnemployedCourseHistory = async (accessToken: string) => {
  const sessionData: UserDataInterface = jwtDecode(accessToken);

  const coursesHistoryUseCase = appContainer.get<GetHistoryCoursesUserUseCase>(
    USECASES_TYPES._GetHistoryCoursesUserUseCase
  );
  const userData = {
    documentType: sessionData.identification_type!,
    documentNumber: sessionData.identification_number!,
  };
  const coursesTaken = await coursesHistoryUseCase.execute(
    userData,
    accessToken
  );
  return coursesTaken;
};

export const queryUnemployedResumeStatus = async (accessToken: string) => {
  const resumeStatusQuery = appContainer.get<GetUserResumeStatusUseCase>(
    USECASES_TYPES._GetUserResumeStatusUseCase
  );
  const userData = {};
  const resumeStatus = await resumeStatusQuery.execute(userData, accessToken);
  return resumeStatus;
};

export const queryFomentoMeetValidator = async (accessToken: string) => {
  try {
    if (!accessToken || accessToken == "") {
      return FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE;
    }

    const sessionData: UserDataInterface = jwtDecode(accessToken);

    // Generamos y enviamos los datos del usuario al servicio prevalidador FOSPEC.
    const sendFospecQuery = appContainer.get<UserFospecMeetValidationUseCase>(
      USECASES_TYPES._UserFospecMeetValidationUseCase
    );
    const userData = GenerateFospecQuery(
      sessionData.identification_type!,
      sessionData.identification_number!
    );

    const dataFospec = await sendFospecQuery.execute(userData, accessToken);

    // 1. Validamos respuesta correcta de la API.
    if (dataFospec?.response_code === HttpStatusCode.Ok) {
      if (dataFospec?.status) {
        return FOSPEC_USER_STATUS_MESSAGE.COMPLETE;
      } else {
        return FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE;
      }
    } else if (dataFospec?.response_code === HttpStatusCode.PayloadTooLarge) {
      // El estado del usuario no es correcto
      return FOSPEC_USER_STATUS_MESSAGE.ERROR;
    } else {
      // Error al solicitar la API
      return FOSPEC_USER_STATUS_MESSAGE.ERROR;
    }
  } catch (error) {
    console.error("error al consultar el estado Fomento", error);
    return undefined;
  }
};

export const queryFomentoPostulationValidator = async (accessToken: string) => {
  try {
    if (!accessToken || accessToken == "") {
      return FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE;
    }

    const sessionData: UserDataInterface = jwtDecode(accessToken);

    // Generamos y enviamos los datos del usuario al servicio prevalidador FOSPEC.
    const sendFospecQuery = appContainer.get<UserFospecValidationUseCase>(
      USECASES_TYPES._UserFospecValidationUseCase
    );
    const userData = GenerateFospecQuery(
      sessionData.identification_type!,
      sessionData.identification_number!
    );

    const dataFospec = await sendFospecQuery.execute(userData, accessToken);

    // 1. Validamos respuesta correcta de la API.
    if (dataFospec?.response_code === HttpStatusCode.Ok) {
      if (dataFospec?.status) {
        return FOSPEC_USER_STATUS_MESSAGE.COMPLETE;
      } else {
        return FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE;
      }
    } else if (dataFospec?.response_code === HttpStatusCode.PayloadTooLarge) {
      // El estado del usuario no es correcto
      return FOSPEC_USER_STATUS_MESSAGE.ERROR;
    } else {
      // Error al solicitar la API
      return FOSPEC_USER_STATUS_MESSAGE.ERROR;
    }
  } catch (error) {
    console.error("error al consultar el estado Fomento", error);
    return undefined;
  }
};

export const queryJupiterValidator = async (
  accessToken: string
): Promise<JupiterDocumentResult | undefined> => {
  try {
    if (!accessToken || accessToken == "") {
      return;
    }

    const sessionData: UserDataInterface = jwtDecode(accessToken);

    // Generamos y enviamos los datos del usuario al servicio prevalidador FOSPEC.
    const sendJupiterValidationQuery =
      appContainer.get<UserJupiterValidationUseCase>(
        USECASES_TYPES._UserJupiterValidationUseCase
      );
    const userData = {
      documents: [
        {
          document_abbreviation: sessionData.identification_type
            .trim()
            .toUpperCase(),
          document: sessionData.identification_number.trim(),
        },
      ],
    } as JupiterStatusQuery;

    const dataJupiter = await sendJupiterValidationQuery.execute(
      userData,
      accessToken
    );

    // 1. Validamos respuesta de la API.
    if (dataJupiter && dataJupiter.length) {
      return dataJupiter[0] as JupiterDocumentResult;
    } else {
      console.error("invalid jupiter response:", dataJupiter);
      return;
    }
  } catch (error) {
    console.error("error al consultar el estado Fomento", error);
    return undefined;
  }
};

export const queryPendingPsyTest = async (accessToken: string) => {
  const pendingTestQuery = appContainer.get<ListPendingPsyTestUseCase>(
    USECASES_TYPES._ListPendingPsyTestUseCase
  );  
  const pendingTestsInfo = await pendingTestQuery.execute();
  return pendingTestsInfo;
};
