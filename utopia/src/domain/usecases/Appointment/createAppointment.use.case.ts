import { AppointmentType } from "domain/models";
import { DataBusinessTypes } from "domain/models/dataBusinessType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateAppointmentUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    apoointment: AppointmentType,
    accessToken?: string
  ): Promise<Request | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .createAppointment(accessToken, apoointment)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}
