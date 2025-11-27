"use client";

import { EmployeeType } from "domain/models";
import CreateCourseRegistrationUseCase from "domain/usecases/Business/createCourseRegistration.use.case";
import FindScheduleUseCase from "domain/usecases/worker-management/FindSchedule.use.case";
import GetEmployeesAvailableByBussinessUseCase from "domain/usecases/worker-management/getEmployeesAvailableByBussiness.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import {
  ConfirmationMessage,
  ConfirmEmployees,
  DigitalSignature,
  ListEmployees,
} from "presentation/components/organisms";
import { addAlert } from "presentation/store/slices/alertSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface AssignEmployeesProps {
  id: string;
}

export const AssignEmployees: React.FC<AssignEmployeesProps> = ({ id }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [currentForm, setCurrentForm] = useState(1);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeType[]>(
    []
  );
  const [courseSchedule, setCourseSchedule] = useState<any>(null);

  const [numberEmployeesRegisteredNow, setnumberEmployeesRegisteredNow] =
    useState<number>(0);
  const [totalNumberRegisteredEmployees, setTotalNumberRegisteredEmployees] =
    useState<number>(0);
  const [numberEmployeesToStartCourse, setNumberEmployeesToStartCourse] =
    useState<number>(0);

  useEffect(() => {
    getEmployeesAvailable();
    findSchedule();
  }, []);

  const getEmployeesAvailable = async () => {
    setLoadingEmployees(true);
    const getEmployeesAvailableUseCase =
      appContainer.get<GetEmployeesAvailableByBussinessUseCase>(
        USECASES_TYPES._GetEmployeesAvailableByBussiness
      );
    const response = await getEmployeesAvailableUseCase.execute(
      id,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener los trabajadores disponibles, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }
    setEmployees(response);
    setLoadingEmployees(false);
  };

  const findSchedule = async () => {
    const findScheduleUseCase = appContainer.get<FindScheduleUseCase>(
      USECASES_TYPES._FindSchedule
    );
    const response = await findScheduleUseCase.execute(
      id,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener el cronograma, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }
    setCourseSchedule(response);
  };

  const createCourseRegistration = async () => {
    const createDataBusinessDescription =
      appContainer.get<CreateCourseRegistrationUseCase>(
        USECASES_TYPES._CreateCourseRegistration
      );
    const response = await createDataBusinessDescription.execute(
      id,
      selectedEmployees,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al registrar los trabajadores, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }
    if ((response as any).error) {
      dispatch(
        addAlert({
          message: (response as any).message,
          type: "error",
        })
      );
      return;
    }

    setnumberEmployeesRegisteredNow(response.numberEmployeesRegisteredNow);
    setTotalNumberRegisteredEmployees(response.totalNumberRegisteredEmployees);
    setNumberEmployeesToStartCourse(response.numberEmployeesToStartCourse);
    setCurrentForm(4);
  };

  return (
    <div>
      {currentForm === 1 && (
        <ListEmployees
          courseId={id}
          loadingEmployees={loadingEmployees}
          employees={employees}
          setSelectedEmployees={setSelectedEmployees}
          setCurrentForm={setCurrentForm}
        />
      )}
      {currentForm === 2 && (
        <ConfirmEmployees
          selectedEmployees={selectedEmployees}
          setCurrentForm={setCurrentForm}
          nameCourseSchedule={courseSchedule?.name}
        />
      )}
      {currentForm === 3 && (
        <DigitalSignature
          setCurrentForm={setCurrentForm}
          courseSheeduleId={id}
          createCourseRegistration={createCourseRegistration}
        />
      )}
      {currentForm === 4 && (
        <ConfirmationMessage
          numberEmployeesRegisteredNow={numberEmployeesRegisteredNow}
          totalNumberRegisteredEmployees={totalNumberRegisteredEmployees}
          numberEmployeesToStartCourse={numberEmployeesToStartCourse}
        />
      )}
    </div>
  );
};
