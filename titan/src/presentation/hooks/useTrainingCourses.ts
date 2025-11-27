"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AvailableTrainingCourse } from "lib";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import GetAvailableCoursesUserUseCase from "domain/usecases/userData/userCoursesAvailable.usecase";
import GetActiveWorkerCoursesUseCase from "domain/usecases/userData/userActiveWorkerCourses.usecase";
import { jwtDecode } from "jwt-decode";
import { UserDataInterface } from "lib";

export const useTrainingCourses = () => {
  const { data: session } = useSession();
  const [coursesList, setCoursesList] = useState<AvailableTrainingCourse[]>([]);

  const getAvailableCourses = async () => {
    const token = session?.access_token;
    if (!token) return;

    const getActiveUserAvailableCourses =
      appContainer.get<GetAvailableCoursesUserUseCase>(
        USECASES_TYPES._GetAvailableCoursesUserUseCase
      );
    const response = await getActiveUserAvailableCourses.execute({}, token);
    setCoursesList(response || []);
  };

  const getActiveWorkerCourses = async () => {
    const token = session?.access_token;
    if (!token) return;

    const userData = jwtDecode(token) as UserDataInterface;
    const getActiveWorkerCourses =
      appContainer.get<GetActiveWorkerCoursesUseCase>(
        USECASES_TYPES._GetActiveWorkerCoursesUseCase
      );
    const response = await getActiveWorkerCourses.execute(
      { documentNumber: parseInt(userData.identification_number) },
      token
    );
    setCoursesList(response || []);
  };

  return {
    coursesList,
    getAvailableCourses,
    getActiveWorkerCourses,
  };
};
