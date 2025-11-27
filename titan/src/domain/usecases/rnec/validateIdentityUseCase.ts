import type { IRNECRepository } from "domain/repositories/RnecRepository";
import { DocumentResponse } from "domain/models/identityWorker";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { injectable, inject } from "inversify";

@injectable()
export default class ValidateIdentityUseCase {
  private readonly rnecRepository: IRNECRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RNECRepository)
    rnecRepository: IRNECRepository
  ) {
    this.rnecRepository = rnecRepository;
  }

  async execute(
    accessToken: string,
    documentNumber: string,
    documentType: string
  ): Promise<DocumentResponse | undefined> {
    try {
      if (!accessToken) {
        throw new Error("Token de acceso no proporcionado");
      }

      if (!documentNumber || !documentType) {
        throw new Error("Número y tipo de documento son requeridos");
      }

      const result = await this.rnecRepository.validateIdentity(
        accessToken,
        documentNumber,
        documentType
      );

      return result;
    } catch (error) {
      console.error("Error validando identidad en RNEC:", error);
      return undefined;
    }
  }
}
