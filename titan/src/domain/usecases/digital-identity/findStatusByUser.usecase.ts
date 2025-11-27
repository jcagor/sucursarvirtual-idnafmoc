import { injectable, inject } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { type IDigitalIdentityRepository } from "domain/repositories/digitalIdentity.repository";

@injectable()
export class FindStatusByUserUseCase {
  private digitalIdentityRepository: IDigitalIdentityRepository;

  constructor(
    @inject(REPOSITORY_TYPES._DigitalIdentityRepository)
    digitalIdentityRepository: IDigitalIdentityRepository
  ) {
    this.digitalIdentityRepository = digitalIdentityRepository;
  }

  async execute(accessToken: string): Promise<any> {
    try {
      // Llama al método del repositorio para obtener todas las campañas
      const digitalIdentityStatus =
        await this.digitalIdentityRepository.findStatusByUser(accessToken);
      return digitalIdentityStatus;
    } catch (error) {
      // Manejar errores, log, y lanzar si es necesario
      throw new Error("Error al obtener el estatus de la identidad digital.");
    }
  }
}
