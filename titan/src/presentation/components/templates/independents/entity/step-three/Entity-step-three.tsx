"use client";

import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useRouter } from "next/navigation";
import { IndependentTemplate } from "../../IndependentTemplate";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { StepSection } from "presentation/components/molecules";
import * as Yup from "yup";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import {
  AddressForm,
  AddressFormValuesType,
  LocationForm,
  LocationFormValuesType,
} from "presentation/components/organisms";
import { Divider } from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { City, Department, independentForm } from "domain/models";
import GetDepartmentUseCase from "domain/usecases/department/getDepartment.use.case";
import GetCityUseCase from "domain/usecases/city/getCity.use.case";
import {
  CALI_CITY_CODE,
  ONLY_NUMBERS_REGEXP,
  VALLE_DEL_CAUCA_DEPARTMENT_CODE,
} from "lib";
import { setIndependentState } from "presentation/store/independent/independentSlice";

export const EntityStepThree = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const statusSession = status;
  const dispatch = useAppDispatch();
  const independentForm = useAppSelector((state) => state.independentSlice);

  const [departmentOptions, setDepartmentOptions] = useState<Department[]>();
  const [cityOptions, setCityOptions] = useState<City[]>();

  const formikInitialValues: AddressFormValuesType = {
    direccion: "",
    nomenclatura: "",
    numero: "",
    letra: "",
    zona: "",
    numero2: "",
    letra2: "",
    numero3: "",
    otras: "",
    detalle: "",
  };

  let formikInitialValues1: LocationFormValuesType = {
    residenceDepartment: "",
    residenceCity: "",
    cellphone: "",
  };

  const formSchema = Yup.object().shape({
    nomenclatura: Yup.string().required("Nomenclatura es obligatoria"),
    numero: Yup.string()
      .required("Número es obligatorio")
      .matches(ONLY_NUMBERS_REGEXP, "Solo se permiten números"),
    letra: Yup.string(),
    zona: Yup.string(),
    numero2: Yup.string()
      .required("Número es obligatorio")
      .matches(ONLY_NUMBERS_REGEXP, "Solo se permiten números"),
    letra2: Yup.string(),
    numero3: Yup.string()
      .required("Número es obligatorio")
      .matches(ONLY_NUMBERS_REGEXP, "Solo se permiten números"),
    otras: Yup.string(),
    detalle: Yup.string(),
  });

  const formSchema1 = Yup.object().shape({
    residenceDepartment: Yup.string().required("Campo obligatorio *"),
    residenceCity: Yup.string().required("Campo obligatorio *"),
    cellphone: Yup.string()
      .required("Campo obligatorio *")
      .matches(ONLY_NUMBERS_REGEXP, "Campo solo debe ser númerico")
      .min(10, "Mínimo 10 dígitos")
      .max(10, "Máximo 10 dígitos"),
  });

  const formikForm: FormikProps<AddressFormValuesType> = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formSchema,
  });

  const formikForm1: FormikProps<LocationFormValuesType> = useFormik({
    initialValues: formikInitialValues1,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formSchema1,
  });

  const getDepartmentUseCase = appContainer.get<GetDepartmentUseCase>(
    USECASES_TYPES._GetDepartmentUseCase
  );
  const getCityUseCase = appContainer.get<GetCityUseCase>(
    USECASES_TYPES._GetCityUseCase
  );

  const getOptions = async () => {
    if (
      !independentForm.independentForm ||
      !independentForm.independentForm.FechaNacimiento ||
      !independentForm.independentForm.EstadoCivil ||
      !independentForm.independentForm.Sexo ||
      !independentForm.independentForm.NivelEscolaridad ||
      !independentForm.independentForm.Nacionalidad
    ) {
      router.back();
      return;
    }
    const departments = await getDepartmentUseCase.execute(
      session?.access_token
    );
    const citiesData = await getCityUseCase.execute(session?.access_token);

    if (!departments || !citiesData) {
      return;
    }
    const sortedDepartments = departments.sort((departmentA, departmentB) =>
      departmentA.code.toString() == VALLE_DEL_CAUCA_DEPARTMENT_CODE ? -1 : 0
    );
    setDepartmentOptions(sortedDepartments);

    const sortedCity = citiesData.sort((citiesDataA, citiesDataB) =>
      citiesDataA.code.toString() == CALI_CITY_CODE ? -1 : 0
    );
    setCityOptions(sortedCity);
  };

  const saveData = async () => {
    if (!session || !session.access_token) {
      return;
    }

    await formikForm.submitForm();
    await formikForm1.submitForm();

    const errorsFormObject = await formikForm.validateForm();
    const errorsFormObject1 = await formikForm1.validateForm();

    // Catch errors array
    const errorsFirtForm = Object.values(errorsFormObject);
    const errorsFirtForm1 = Object.values(errorsFormObject1);

    let independentAux: independentForm = {};
    if (isEmptyArray(errorsFirtForm) && isEmptyArray(errorsFirtForm1)) {
      independentAux = {
        ...independentForm.independentForm,
        CodigoDepartamento: formikForm1.values.residenceDepartment,
        TituloDepartamento: departmentOptions?.find(
          (department) =>
            department.code.toString() == formikForm1.values.residenceDepartment
        )?.name,
        CodigoCiudad: formikForm1.values.residenceCity,
        TituloCiudad: cityOptions?.find(
          (city) => city.code.toString() == formikForm1.values.residenceCity
        )?.name,
        TelefonoCel: formikForm1.values.cellphone,
        Direccion: formikForm.values.compuesta
          ?.replace("#", "")
          .replaceAll("-", "")
          .replaceAll("  ", " "),
        DireccionRestante: `${formikForm.values.zona} ${formikForm.values.otras} ${formikForm.values.detalle}`,
      };

      dispatch(setIndependentState(independentAux));
      router.push("./step-four");
    } else {
      return;
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <IndependentTemplate
      mainTitle="Afiliación independiente por entidad"
      description="Confirma tus datos personales para continuar la solicitud"
      onBackButton={() => {
        router.back();
      }}
      onNextButton={async () => {
        await saveData();
      }}
    >
      <StepSection
        number={5}
        descriptionStep="Datos de Ubicación y Contacto"
        className="w-4/5"
      />
      <AddressForm formik={formikForm} classnameContainer="w-4/5 mt-5" />
      <Divider className="w-4/5 my-8" />
      <LocationForm
        formik={formikForm1}
        departmentOptions={departmentOptions}
        cityOptions={cityOptions}
        isCellphone={true}
        classnameContainer="mt-5"
      />
    </IndependentTemplate>
  );
};
