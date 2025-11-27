import { type ITermAndConditionRepository } from "domain/repositories/TermAndCondition.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { USER_AUTHORIZATION } from "lib";
import { IGetTermAndConditionData } from "lib/types/terms-conditions";

@injectable()
export default class GetTermAndConditionDataUseCase {
  private termAndConditionRepository: ITermAndConditionRepository;

  constructor(
    @inject(REPOSITORY_TYPES._TermAndConditionRepository)
    termAndConditionRepository: ITermAndConditionRepository
  ) {
    this.termAndConditionRepository = termAndConditionRepository;
  }

  async execute(
    name: string,
    accessToken: string | null
  ): Promise<IGetTermAndConditionData | any> {
    if (!accessToken) {
      console.log("No estas autenticado");
      return;
    }
    const result =
      await this.termAndConditionRepository.getTermAndConditionData(
        accessToken,
        USER_AUTHORIZATION.biometricTermsAndConditions
      );
    if (result && result.data) {
      return result?.data;
    }
  }
}
