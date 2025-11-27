"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  MainTitle,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
  SectionSeparator,
} from "presentation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import CreateDataBusinessUseCase from "domain/usecases/Business/createDataBusiness.use.case";
import { useSession } from "next-auth/react";
import { DataBusinessTypes } from "domain/models/dataBusinessType";
import getDataBusinessUseCase from "domain/usecases/Business/getDataBusiness.use.case";
import { useEffect } from "react";
import FindAllDepartmentsUseCase from "domain/usecases/Business/findAllDepartments.use.case";
import { DepartmentTypes } from "domain/models/DepartmentTypes";
import FindAllCitiesUseCase from "domain/usecases/city/findAllCities.use.case";
import { CityTypes } from "domain/models/CityTypes";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { SelectOption } from "lib";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";

let initialValues: DataBusinessTypes = {
  BusinessName: "",
  RUT: null,
  Address: "",
  City: "",
  Department: "",
  WebPage: "",
};

const validationSchema = Yup.object().shape({
  BusinessName: Yup.string().required("Este campo es obligatorio"),
  RUT: Yup.number().required("Este campo es obligatorio"),
  Address: Yup.string().required("Este campo es obligatorio"),
  City: Yup.string().required("Este campo es obligatorio"),
  Department: Yup.string().required("Este campo es obligatorio"),
  WebPage: Yup.string().required("Este campo es obligatorio"),
});

let departments: DepartmentTypes[] | undefined = [];
let cities: CityTypes[] | undefined = [];
let Programs: SelectOption[] | undefined = [];

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormDataBusiness: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    findAllDepartments();
    findAllCities();
    getDataBusiness();
  }, []);

  const getDataBusiness = async () => {
    const getDataBusiness = appContainer.get<getDataBusinessUseCase>(
      USECASES_TYPES._GetDataBusiness
    );
    const response = await getDataBusiness.execute(session?.access_token);
    if (response) {
      setValues(response);
    }
  };

  const findAllDepartments = async () => {
    const findAllDepartments = appContainer.get<FindAllDepartmentsUseCase>(
      USECASES_TYPES._FindAllDepartments
    );
    const response = await findAllDepartments.execute(session?.access_token);
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al obtener los departamentos, intenta mas tarde",
          type: "error",
        })
      );
      return;
    }
    departments = response;
  };

  const findAllCities = async () => {
    const findAllCities = appContainer.get<FindAllCitiesUseCase>(
      USECASES_TYPES._FindAllCities
    );
    const response = await findAllCities.execute(session?.access_token);
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al obtener las ciudades, intenta mas tarde",
          type: "error",
        })
      );
      return;
    }
    cities = response;
  };

  const findAllPrograms = async () => {
    const findAllPrograms = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "PROGRAM_LIST";
    const response = await findAllPrograms.execute(
      SelectOptionName,
      session?.access_token
    );
    if (response) {
      Programs = response;
    }
  };

  const NextForm = () => {
    setCurrentForm(4);
  };

  const onSubmit = async (values: DataBusinessTypes) => {
    const createDataBusiness = appContainer.get<CreateDataBusinessUseCase>(
      USECASES_TYPES._CreateDataBusiness
    );

    const response = await createDataBusiness.execute(
      values,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al guardar la informacion, intenta mas tarde",
          type: "error",
        })
      );
      return;
    }
    NextForm();
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    touched,
    submitCount,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="w-full md:w-11/12 xl:w-2/3">
      <MainTitle text="Perfil Empresarial " />
      <SecondaryText text="Diligencia todos los campos, en aquellas preguntas que no aplican para la empresa selecciona con N/A." />
      <SectionSeparator />

      <form onSubmit={handleSubmit} className="flex flex-col">
        <TertiaryTitle text="Empresa / Razón Social" className="" />
        <CustomInputOne
          name="BusinessName"
          id="BusinessName"
          placeholder="Carnesanchez S.A.S"
          value={values.BusinessName ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.BusinessName || submitCount > 0) && errors.BusinessName ? (
              <NeutralBlackText
                text={errors.BusinessName}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <div className="flex flex-row items-center my-4">
          <NumberCircle number={1} />
          <TertiaryTitle text="Datos de la empresa " className="ml-3" />
        </div>
        <SecondaryText text="Completa la Información " />

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomInputOne
            name="RUT"
            id="RUT"
            title="RUT"
            type="number"
            placeholder="90000000"
            value={values.RUT ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.RUT || submitCount > 0) && errors.RUT ? (
                <NeutralBlackText
                  text={errors.RUT}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="Address"
            title="Dirección"
            placeholder="Carrera 23 No 26b - 46"
            value={values.Address}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.Address || submitCount > 0) && errors.Address ? (
                <NeutralBlackText
                  text={errors.Address}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomSelectOne
            name="City"
            label="Ciudad"
            placeholder="Santiago de Cali"
            defaultValue={values.City}
            value={values.City}
            options={(cities ?? []).map((city) => ({
              label: city.name,
              value: city.name,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.City || submitCount > 0) && errors.City ? (
                <NeutralBlackText
                  text={errors.City}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomSelectOne
            name="Department"
            label="Departamento"
            placeholder="Valle"
            defaultValue={values.Department}
            value={values.Department}
            options={(departments ?? []).map((department) => ({
              label: department.name,
              value: department.name,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.Department || submitCount > 0) && errors.Department ? (
                <NeutralBlackText
                  text={errors.Department}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="WebPage"
            title="Página Web / Redes"
            placeholder="www.carnesanchez.com"
            value={values.WebPage}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.WebPage || submitCount > 0) && errors.WebPage ? (
                <NeutralBlackText
                  text={errors.WebPage}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>
        <Button
          type="submit"
          label="Siguiente"
          className="w-56 xl:w-72 self-end my-6"
          primary
        />
      </form>
    </div>
  );
};
