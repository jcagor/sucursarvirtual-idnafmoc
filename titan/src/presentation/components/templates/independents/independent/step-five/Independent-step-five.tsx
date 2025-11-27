"use client";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { IndependentTemplate } from "../../IndependentTemplate";
import { StepSection } from "presentation/components/molecules";
import { useEffect, useState } from "react";
import { City, Department, independentForm } from "domain/models";
import { useSession } from "next-auth/react";
import {
  ALPHABETIC_SPACE_MESSAGE,
  ALPHABETIC_SPACE_REGEXP,
  CALI_CITY_CODE,
  ONLY_NUMBERS_REGEXP,
  SelectOption,
  VALLE_DEL_CAUCA_DEPARTMENT_CODE,
} from "lib";
import {
  AddressForm,
  AddressFormValuesType,
  Divider,
  LocationForm,
  LocationFormValuesType,
  useAppDispatch,
  useAppSelector,
} from "presentation";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import { useRouter } from "next/navigation";
import GetCityUseCase from "domain/usecases/city/getCity.use.case";
import GetDepartmentUseCase from "domain/usecases/department/getDepartment.use.case";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { setIndependentState } from "presentation/store/independent/independentSlice";

export const IndependentStepFive = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const independentForm = useAppSelector((state) => state.independentSlice);

  const [departmentOptions, setDepartmentOptions] = useState<Department[]>();
  const [cityOptions, setCityOptions] = useState<City[]>();
  const [sectorOptions, setSectorOptions] = useState<SelectOption[]>();

  const formikInitialValues: LocationFormValuesType = {
    residenceDepartment: "",
    residenceCity: "",
  };

  const formikInitialValues1: AddressFormValuesType = {
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

  const LocationFormSchema = Yup.object().shape({
    residenceDepartment: Yup.string().required("Campo obligatorio *"),
    residenceCity: Yup.string().required("Campo obligatorio *"),
  });

  const AdressFormSchema = Yup.object().shape({
    direccion: Yup.string().required("Tipo dirección es obligatoria"),
    nomenclatura: Yup.string().when("direccion", (direccion, schema) => {
      return direccion[0] !== "SECTOR_RURAL"
        ? schema.required("Detalles es obligatorio")
        : schema;
    }),
    numero: Yup.string()
      .matches(ONLY_NUMBERS_REGEXP, "Solo se permiten números")
      .when("direccion", (direccion, schema) => {
        return direccion[0] !== "SECTOR_RURAL"
          ? schema.required("Detalles es obligatorio")
          : schema;
      }),
    letra: Yup.string(),
    zona: Yup.string(),
    numero2: Yup.string()
      .matches(ONLY_NUMBERS_REGEXP, "Solo se permiten números")
      .when("direccion", (direccion, schema) => {
        return direccion[0] !== "SECTOR_RURAL"
          ? schema.required("Detalles es obligatorio")
          : schema;
      }),
    letra2: Yup.string(),
    numero3: Yup.string()
      .matches(ONLY_NUMBERS_REGEXP, "Solo se permiten números")
      .when("direccion", (direccion, schema) => {
        return direccion[0] !== "SECTOR_RURAL"
          ? schema.required("Detalles es obligatorio")
          : schema;
      }),
    otras: Yup.string(),
    detalle: Yup.string()
      .when("direccion", (direccion, schema) => {
        return direccion[0] === "SECTOR_RURAL"
          ? schema.required("Detalles es obligatorio")
          : schema;
      })
      .matches(ALPHABETIC_SPACE_REGEXP, ALPHABETIC_SPACE_MESSAGE)
      .when("direccion", (direccion, schema) => {
        return direccion[0] === "SECTOR_RURAL"
          ? schema.max(30, "Maximo de carateres es 30")
          : schema.max(20, "Maximo de carateres es 20");
      }),
  });

  const formikForm: FormikProps<LocationFormValuesType> = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      return;
    },
    validationSchema: LocationFormSchema,
  });

  const formikForm1: FormikProps<AddressFormValuesType> = useFormik({
    initialValues: formikInitialValues1,
    onSubmit: (values) => {
      return;
    },
    validationSchema: AdressFormSchema,
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

  const sendData = async () => {
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
        CodigoDepartamento: formikForm.values.residenceDepartment,
        TituloDepartamento: departmentOptions?.find(
          (department) =>
            department.code.toString() == formikForm.values.residenceDepartment
        )?.name,
        CodigoCiudad: formikForm.values.residenceCity,
        TituloCiudad: cityOptions?.find(
          (city) => city.code.toString() == formikForm.values.residenceCity
        )?.name,
        Direccion: formikForm1.values.compuesta
          ?.replace("#", "")
          .replaceAll("-", "")
          .replaceAll("  ", " "),
        DireccionRestante: `${formikForm1.values.zona} ${formikForm1.values.otras} ${formikForm1.values.detalle}`,
      };

      dispatch(setIndependentState(independentAux));
      router.push("./step-six");
    } else {
      return;
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <IndependentTemplate
      mainTitle="Afiliación independiente"
      description="Confirma tus datos personales para continuar la solicitud"
      onBackButton={() => {
        router.back();
      }}
      onNextButton={async () => {
        await sendData();
      }}
    >
      <StepSection
        number={5}
        descriptionStep="Datos de ubicación y contacto"
        className="w-4/5"
      />

      <LocationForm
        formik={formikForm}
        departmentOptions={departmentOptions}
        cityOptions={cityOptions}
        classnameContainer="mt-5"
      />

      <Divider className="w-4/5 my-12" />
      <AddressForm formik={formikForm1} classnameContainer="mt-5" />
    </IndependentTemplate>
  );
};
