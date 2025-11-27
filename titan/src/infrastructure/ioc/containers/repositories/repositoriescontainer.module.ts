import { ContainerModule, interfaces } from "inversify";
import { REPOSITORIES_TYPES } from "./repositories.types";
import { TrainingCoursesRepository, TrainingCoursesRepositoryImpl } from "domain/repositories/training-courses.repository";

export const repositoriesModule = new ContainerModule((bind: interfaces.Bind) => {
  // ... existing bindings ...

  // Training Courses
  bind<TrainingCoursesRepository>(REPOSITORIES_TYPES._TrainingCoursesRepository).to(
    TrainingCoursesRepositoryImpl
  );
}); 