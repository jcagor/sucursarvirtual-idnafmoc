"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { EmployeeType, QueryValidateEmployeeForCourse } from "domain/models";
import { useFormik } from "formik";
import {
  Button,
  ModalWithChildren,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
  TextSearchInput,
} from "presentation/components/atoms";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { CiFilter } from "react-icons/ci";
import { MdCleaningServices } from "react-icons/md";
import { SearchValidationSchema } from "./validations/form.validations";
import ValidateEmployeeCourseRegisterUseCase from "domain/usecases/worker-management/validateEmployeeCourseRegister.use.case";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { HttpStatusCode } from "axios";
import Image from "next/image";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { EMPLOYEES_STATUS, EMPLOYEES_STATUS_TEXT } from "lib";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 5;

interface ListEmployeesProps {
  employees: EmployeeType[];
  loadingEmployees: boolean;
  courseId: string;
  setSelectedEmployees: (employees: EmployeeType[]) => void;
  setCurrentForm: (page: number) => void;
}

export const ListEmployees: React.FC<ListEmployeesProps> = ({
  employees,
  loadingEmployees,
  courseId,
  setSelectedEmployees,
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [arrEmployees, setArrEmployees] = useState<Array<EmployeeType>>([]);
  const [selectedEmployees, setSelectedEmployeesState] = useState<
    EmployeeType[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loadingModal, setLoadingModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(true);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return arrEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [arrEmployees, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(arrEmployees.length / ITEMS_PER_PAGE),
    [arrEmployees]
  );

  const handleNextPage = () => {
    setSelectedEmployees(selectedEmployees);
    setCurrentForm(2);
  };

  const previousForm = () => {
    router.back();
  };

  // Search component functions //
  interface SearchTerm {
    searchString?: string;
  }

  /////////////////////////////////
  // Search input manage        //
  const searchFormRef = useRef<HTMLFormElement>(null);

  const initialFormState: SearchTerm = {
    searchString: "",
  };

  const submitSearch = async (searchString: SearchTerm) => {
    // The form update onChange, ignore submit.
    //console.log("Search term received: ", searchString);
  };

  const filterEmployeesJobs = (searchString: string) => {
    const SEARCH_STR_MIN_LENGTH = 3;

    //console.log("search:", searchString);

    if (
      searchString &&
      employees.length >= 1 &&
      searchString.length >= SEARCH_STR_MIN_LENGTH
    ) {
      let filteredList = employees?.filter((employee, idx, arr) => {
        const employeeInformation: EmployeeType | undefined = employee;

        const searchData =
          employeeInformation?.firstName +
          " " +
          employeeInformation?.firstLastName +
          " " +
          employeeInformation?.middleName +
          " " +
          employeeInformation?.middleLastName +
          " " +
          employeeInformation.document_number;

        if (
          searchData.toLocaleLowerCase().includes(searchString.toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      console.log("filtered:", filteredList);

      if (filteredList) {
        setArrEmployees([...filteredList]);
        //console.log("filtered result:", filteredList);
      }
    }
  };

  const onChangeSearch = (event: SearchTerm) => {
    //console.log("change event:", event);
    if (event.searchString) {
      filterEmployeesJobs(event.searchString ?? "");
    } else {
      setArrEmployees(employees);
      setCurrentPage(1);
    }
  };

  const resetFilters = () => {
    resetForm();
    setArrEmployees(employees);
    setCurrentPage(1);
  };

  const validation = new SearchValidationSchema().getSearchFormValidation();

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialFormState,
    onSubmit: submitSearch,
    validationSchema: validation,
  });
  // Search component functions //
  ///////////////////////////////

  const validateEmployeeCheck = async (
    employee: EmployeeType
  ): Promise<boolean> => {
    setLoadingModal(true);
    setIsLoadingModal(true);

    const query = {
      courseId: courseId,
      documentNumber: employee.document_number,
      documentType: employee.document_type,
    } as QueryValidateEmployeeForCourse;
    const createDataBusinessDescription =
      appContainer.get<ValidateEmployeeCourseRegisterUseCase>(
        USECASES_TYPES._ValidateEmployeeCourseRegisterUseCase
      );
    const response = await createDataBusinessDescription.execute(
      query,
      session?.access_token ?? ""
    );

    setLoadingModal(false);
    setIsLoadingModal(false);

    if (!response) {
      console.error("Error al solicitar el estado del usuario.");
      return false;
    }

    if (response?.response_code == HttpStatusCode.Ok) {
      if (response.status) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setArrEmployees(employees);
  }, [employees]);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Listado de trabajadores" />
      <SecondaryText text="Selecciona entre 5 y 30 trabajadores activos para su asignación en los entrenamientos." />
      <SectionSeparator />

      <div className="pb-5">
        <div className="py-5">
          <p className="font-bold mx-3 text-[2rem] flex">
            <CiFilter />{" "}
            <span className="mx-2 mt-[-8px] w-[500px]">Filtros</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} ref={searchFormRef}>
          <div className="flex flex-wrap">
            <div>
              <TextSearchInput
                id={"inputSearchJob"}
                name={"searchString"}
                label={false}
                hasIcon={true}
                onChange={(event) => {
                  handleChange(event);
                  onChangeSearch({
                    searchString: event.target.value,
                  } as SearchTerm);
                }}
                errors={
                  errors.searchString ? (
                    <NeutralBlackText
                      text={errors.searchString}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
                placeholder={"Nombre o Documento"}
                classNameText="text-principal-450 placeholder-principal-450 border-[calc(1px)] rounded-r-[calc(5px)]"
                value={values.searchString}
              />
            </div>
            <div className="ml-5">
              <button
                onClick={(e) => {
                  resetFilters();
                }}
                onKeyUp={() => {}}
                className="success m-1 bg-principal-180 text-principal-150 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <span className="flex">
                  Limpiar <MdCleaningServices className="mx-2 h-5" />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {paginatedAppointments.length > 0 ? (
        <>
          <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-4 px-8">
            <div className="w-full grid grid-cols-5 gap-1 items-center justify-center text-center text-principal-350 rounded-t-lg py-3 border-b-[2px] border-principal-450/20">
              <div>Seleccionar</div>
              <div>Nombre del trabajador</div>
              <div>Numero de documento</div>
              <div>Observaciones</div>
              <div>Estado</div>
            </div>
            <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
              {paginatedAppointments.map((employee) => (
                <div
                  key={employee.document_number}
                  className="w-full grid grid-cols-5 gap-1 items-center justify-center text-center text-principal-450 py-4"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmployees.some(
                      (e) => e.document_number === employee.document_number
                    )}
                    onChange={async (e) => {
                      const currentTarget = e.currentTarget;
                      const canRegister = await validateEmployeeCheck(employee);

                      if (canRegister) {
                        currentTarget.checked = true;
                        const isChecked = e.target.checked;
                        setSelectedEmployeesState((prev) =>
                          isChecked
                            ? [...prev, employee]
                            : prev.filter(
                                (e) =>
                                  e.document_number !== employee.document_number
                              )
                        );
                      }
                    }}
                    className="mx-auto appearance-none w-4 h-4 border border-principal-450 rounded-full checked:bg-principal-180 checked:border-principal-180"
                  />
                  <div>
                    {employee.firstName +
                      " " +
                      employee.middleName +
                      " " +
                      employee.firstLastName}
                  </div>
                  <div>{employee.document_number}</div>
                  <div>{employee.observations}</div>
                  <div
                    className={`flex w-2/3 mx-auto items-center justify-center gap-2 rounded-xl ${
                      employee.status === EMPLOYEES_STATUS.SUSPENDED
                        ? "bg-principal-500/15"
                        : "bg-principal-700/15"
                    }`}
                  >
                    <span
                      className={`${
                        employee.status === EMPLOYEES_STATUS.SUSPENDED
                          ? "text-principal-500"
                          : "text-principal-700"
                      }`}
                    >
                      {EMPLOYEES_STATUS_TEXT[employee.status] ||
                        employee.status}
                    </span>
                    <span
                      className={`w-3 h-3 rounded-full ${
                        employee.status === EMPLOYEES_STATUS.SUSPENDED
                          ? "bg-principal-500"
                          : "bg-principal-700"
                      }`}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4 rounded-xl justify-center">
            <div className="flex bg-principal-150 rounded-xl">
              <button
                className="px-3 py-1 rounded-lg disabled:text-principal-450"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      className={`px-2 py-1 rounded-lg ${
                        page === currentPage
                          ? "font-bold"
                          : "text-principal-450"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                className="px-3 py-1 rounded-lg disabled:text-principal-450"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button
              label="Siguiente"
              className="w-56 xl:w-72 self-end my-6"
              primary
              onClick={handleNextPage}
            />
          </div>
        </>
      ) : loadingEmployees ? (
        <>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
            <div className="text-principal-180 mt-2">Cargando empleados...</div>
          </div>
        </>
      ) : (
        <div className="w-full py-3 items-center justify-center text-center text-principal-450 bg-principal-150 rounded-lg">
          <div className="text-lg font-bold">No se encontraron empleados</div>
        </div>
      )}

      <div className="flex flex-row justify-start items-center">
        <a
          className="cursor-pointer"
          onClick={previousForm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              previousForm();
            }
          }}
        >
          Atrás
        </a>
      </div>

      {loadingModal && (
        <ModalWithChildren
          onClose={() => {
            setLoadingModal(false);
            setIsErrorModal(false);
            setIsLoadingModal(false);
          }}
          className="md:w-[463px] xl:w-[600px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased"
        >
          {isLoadingModal ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
              <div className="text-principal-180 mt-2">
                Validando información del usuario
              </div>
            </>
          ) : isErrorModal ? (
            <>
              <Image
                src="/utopia/icons/hello_full.png"
                alt="Success icon"
                width={80}
                height={80}
                className="cursor-pointer"
                priority
              />
              <ModalTitle text="Errores en la información" className="mt-2" />
              <div className="flex flex-col w-[70%] space-y-3 pt-5 pb-2">
                <Button
                  label="Continuar"
                  onClick={() => {
                    setLoadingModal(false);
                    setIsLoadingModal(false);
                    setIsErrorModal(false);
                  }}
                  className="w-full"
                  primary
                />
              </div>
            </>
          ) : null}
        </ModalWithChildren>
      )}
    </div>
  );
};
