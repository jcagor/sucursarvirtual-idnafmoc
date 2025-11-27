"use client";

import { City, Department, Options } from "domain/models";
import { FormikProps } from "formik";
import {
  FormModuleOnePacs,
  FormModuleOnePacsValuesType,
} from "./FormModuleOnePacs";
import {
  FormSecondModulePacs,
  FormSecondModulePacsValuesType,
} from "./FormSecondModulePacs";
import {
  SpouceEmployeeForm,
  SpouceEmployeeFormValuesType,
} from "./SpouceEmployeeForm";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  CALI_CITY_CODE,
  CONFIG_SMM,
  DOCUMENTS_NOT_ALLOWED,
  KINDSHIP_SPOUCE_VALUE,
  SelectOption,
  VALLE_DEL_CAUCA_DEPARTMENT_CODE,
} from "lib";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import GetConfigurationUseCase from "domain/usecases/configuration/getConfiguration.use.case";
import { Divider } from "presentation/components/atoms";

type FormPropsType = {
  authDefined: boolean;
  options: Options;
  formikFormModuleOnePacs: FormikProps<
    FormModuleOnePacsValuesType & FormSecondModulePacsValuesType
  >;
  formikSpouceEmployeeForm: FormikProps<SpouceEmployeeFormValuesType>;
};
export const FormAddPacs: FC<FormPropsType> = ({
  authDefined,
  options,
  formikFormModuleOnePacs,
  formikSpouceEmployeeForm,
}) => {
  const { data: session, status } = useSession();
  const statusSession = status;
  /** States variables */
  const [documentTypeOption, setDocumentTypeOption] =
    useState<SelectOption[]>();
  const [departmentOptions, setDepartmentOptions] = useState<Department[]>();
  const [cityOptions, setCityOptions] = useState<City[]>();
  const [communityOptions, setCommunityOptions] = useState<SelectOption[]>();
  const [reserveOptions, setReserveOptions] = useState<SelectOption[]>();
  const [SMM, setSMM] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** Use cases */
  const configurationRepository = appContainer.get<GetConfigurationUseCase>(
    USECASES_TYPES._GetConfigurationUseCase
  );
  /** Methods */
  const GetOptions = async () => {
    if (!options) {
      return;
    }
    let documentTypesData = options.documentTypes;
    let departments = options.department;
    const citiesData = options.city;
    const reserveData = options.reserve;
    const communityData = options.community;

    const config = await configurationRepository.execute(
      CONFIG_SMM,
      session?.access_token
    );

    if (config) {
      setSMM(config.value.SMM);
    }

    // Validate available options data

    if (
      !documentTypesData ||
      !departments ||
      !citiesData ||
      !communityData ||
      !reserveData
    ) {
      return;
    }

    // Sets options data
    documentTypesData = documentTypesData.filter(
      (val) => !DOCUMENTS_NOT_ALLOWED.includes(val.code)
    );
    documentTypesData = documentTypesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const documentTypeOptionsMapped = documentTypesData.map(
      (documentTypeItem) => {
        return {
          value: documentTypeItem.code,
          label: documentTypeItem.name,
          shorthand: documentTypeItem.shorthand,
        };
      }
    );

    setDocumentTypeOption(documentTypeOptionsMapped);

    // Sort Departments
    const sortedDepartments = departments.sort((departmentA, departmentB) =>
      departmentA.code.toString() == VALLE_DEL_CAUCA_DEPARTMENT_CODE ? -1 : 0
    );
    setDepartmentOptions(sortedDepartments);

    const sortedCity = citiesData.sort((citiesDataA, citiesDataB) =>
      citiesDataA.code.toString() == CALI_CITY_CODE ? -1 : 0
    );
    setCityOptions(sortedCity);

    const reserveOptionsMapped: SelectOption[] = reserveData.map(
      (reserveItem) => {
        return {
          value: reserveItem.code.toString(),
          label: reserveItem.name,
        };
      }
    );
    setReserveOptions(reserveOptionsMapped);

    const communityOptionsMapped: SelectOption[] = communityData.map(
      (communityItem) => {
        return {
          value: communityItem.code.toString(),
          label: communityItem.name,
        };
      }
    );
    setCommunityOptions(communityOptionsMapped);
    setIsLoading(false);
  };
  /** Use effects*/

  useEffect(() => {
    setIsLoading(true);
    if (authDefined) {
      GetOptions();
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          {/* FIRST FORM */}
          <FormModuleOnePacs
            documentTypes={documentTypeOption!}
            formik={formikFormModuleOnePacs}
          />
          <Divider />
          {/* SECOND FORM */}
          <FormSecondModulePacs
            departmentOptions={departmentOptions}
            cityOptions={cityOptions}
            reserveOptions={reserveOptions!}
            communityOptions={communityOptions!}
            formik={formikFormModuleOnePacs}
            classnameContainer={
              "flex flex-wrap overflow-y-scroll no-scrollbar w-full pt-3"
            }
          />

          {/* THIRD FORM */}
          {formikFormModuleOnePacs.values.kindship == KINDSHIP_SPOUCE_VALUE && (
            <SpouceEmployeeForm
              documentTypes={documentTypeOption!}
              classnameContainer={
                "flex flex-wrap overflow-y-scroll no-scrollbar w-full pt-3"
              }
              formTitle="Datos del Cónyuge"
              formik={formikSpouceEmployeeForm}
              smm={SMM}
            />
          )}
        </>
      )}
    </>
  );
};
