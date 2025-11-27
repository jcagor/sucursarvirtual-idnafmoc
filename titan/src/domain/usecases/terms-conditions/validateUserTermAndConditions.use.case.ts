import { type IUserTermAndConditionRepository } from "domain/repositories/userTermAndCondition.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { injectable, inject } from "inversify";

@injectable()
export default class ValidateUserTermsAndConditionsUseCase {
  private userTermAndConditionRepository: IUserTermAndConditionRepository;
  constructor(
    @inject(REPOSITORY_TYPES._UserTermAndConditionRepository)
    userTermAndConditionRepository: IUserTermAndConditionRepository
  ) {
    this.userTermAndConditionRepository = userTermAndConditionRepository;
  }

  async execute(
    termAndConditionName: string,
    accessToken: string | null
  ): Promise<boolean | undefined> {
    try {
      if (!accessToken) {
        console.log("No estas autenticado");
        return;
      }
      const userTerm =
        await this.userTermAndConditionRepository.getLastUserTermsAndConditionsByName(
          accessToken,
          termAndConditionName
        );

      if (userTerm) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
