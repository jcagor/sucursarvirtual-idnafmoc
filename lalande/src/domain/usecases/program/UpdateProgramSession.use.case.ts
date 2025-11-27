import { ProgramSessionType } from "domain/models/program/ProgramSessionType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class UpdateProgramSessionUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    session: ProgramSessionType
  ): Promise<ProgramSessionType | undefined> {
    const request = await this.rannRepository
      .updateProgramSession(session)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error("Error actualizando la sesión:", request.message);
      return;
    }

    return request;
  }
}
