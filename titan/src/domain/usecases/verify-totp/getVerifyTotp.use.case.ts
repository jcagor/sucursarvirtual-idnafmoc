import {type IValidateTotpRepository} from "domain/repositories/validateTotp.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

@injectable()
export default class GetVerifyTotp {
  private readonly validateTotpRepository: IValidateTotpRepository;

  constructor(
    @inject(REPOSITORY_TYPES._ValidateTotpRepository)
    validateTotpRepository: IValidateTotpRepository
  ){
    this.validateTotpRepository = validateTotpRepository;
  }

  async execute(
    totp: string,
    token: string  
  ){
    const result = await this.validateTotpRepository.getVerifyTotp(totp, token);

    if(Array.isArray(result?.message)){
      return {valid: result.valid, message: result.message[0]}
    }
    
    if (result) {
      return result;
    }
  }
}