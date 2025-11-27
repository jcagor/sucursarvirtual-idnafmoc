import { Log } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class WithdrawalPacUseCase {
  private withdrawalRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    withdrawalRepository: IRiaRepository
  ) {
    this.withdrawalRepository = withdrawalRepository;
  }

  async execute(
    tipoAfiliado: string,
    tipoDocumento: string,
    numeroDocumento: string,
    tipoDocumentoAfiliado: string,
    numeroDocumentoAfiliado: string,
    fechaVigenciaHasta: string,
    motivoRetiro: string,
    accessToken?: string
  ): Promise<Log[] | undefined> {
    if (!accessToken) return;

    const withdrawal = await this.withdrawalRepository
      .withdrawalPAC(
        accessToken,
        tipoAfiliado,
        tipoDocumento,
        numeroDocumento,
        tipoDocumentoAfiliado,
        numeroDocumentoAfiliado,
        fechaVigenciaHasta,
        motivoRetiro
      )
      .catch((error) => error);

    if (withdrawal instanceof Error) {
      console.log("error");
      console.log(withdrawal);

      return;
    }

    return withdrawal;
  }
}
