import { IsNitValidType, RuesType, VacantRegisterFormSaveStatus } from "domain/models";

export interface IFomentoRepository {
  saveJobVacancyForm(formData: {}, accessToken: string): Promise<VacantRegisterFormSaveStatus | undefined>;
}
