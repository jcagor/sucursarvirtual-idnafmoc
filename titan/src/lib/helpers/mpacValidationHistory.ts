import SaveMpacValidationHistoryCase from "domain/usecases/userMpacHistory/userSaveMpacValidationHistory.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  SaveMpacStatusHistoryQuery,
  UserDataInterface,
  UserMpacDataInterface,
} from "lib/types";
import { getLawByUserType, validateAndSetLaw } from "../utils/mpacValidationHistory";

export const saveMpacValidationHistory = async (
  accessToken: string,
  mpacData: UserMpacDataInterface,
  validationStatus: boolean
) => {
  try {
    const sessionData: UserDataInterface = jwtDecode(accessToken);

    // Generamos y enviamos los datos del usuario al servicio pre-validador MPAC.
    const sendSiseQueryUseCase =
      appContainer.get<SaveMpacValidationHistoryCase>(
        USECASES_TYPES._SaveMpacValidationHistoryCase
      );

    const userData = {
      identificationNumber: sessionData.identification_number,
      identificationType: sessionData.identification_type,
      responseData: mpacData,
      businessName: mpacData.OUT_Nombre_Empresa??"not_found",
      businessIdentification: mpacData.OUT_NIT??"not_found",
      law: getLawByUserType(mpacData.OUT_Tipo_Actor),
      validationPass: validationStatus,
    } as SaveMpacStatusHistoryQuery;

    const dataMpacHistory = await sendSiseQueryUseCase.execute(
      userData,
      accessToken
    );

    //console.log("MPAC HISTORY DATA RAW:", dataMpacHistory);
    return dataMpacHistory;
  } catch (error) {
    console.error("error al guardar el historial MPAC", error);
    return undefined;
  }
};
