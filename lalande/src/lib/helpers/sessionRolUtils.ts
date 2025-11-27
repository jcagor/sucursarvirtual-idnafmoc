import GetUserInformationUseCase from "domain/usecases/User/UserInformation.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

export const getAdminBusinessList = async(token:string) =>{
    const getUserInformation =
      appContainer.get<GetUserInformationUseCase>(
        USECASES_TYPES._GetUserInformationUseCase
      );
    const response = await getUserInformation.execute(
      {},
      token,
    );
    return response;
}