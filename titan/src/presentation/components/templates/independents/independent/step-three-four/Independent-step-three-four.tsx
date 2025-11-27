"use client";
import { useRouter } from "next/navigation";
import { IndependentTemplate } from "../../IndependentTemplate";
import { StepSection } from "presentation/components/molecules";
import { useEffect, useState } from "react";
import GetDocumentTypeUseCase from "domain/usecases/documentType/getDocumentType.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  DemographicForm,
  DemographicFormValuesType,
  Divider,
  PersonalForm,
  PersonalFormValuesType,
  useAppDispatch,
  useAppSelector,
} from "presentation";
import * as Yup from "yup";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import { useSession } from "next-auth/react";
import {
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  DOCUMENTS_NOT_ALLOWED_INDIVIDUAL,
  SelectOption,
  UserDataInterface,
} from "lib";
import { DocumentType, independentForm } from "domain/models";
import { jwtDecode } from "jwt-decode";
import { setIndependentState } from "presentation/store/independent/independentSlice";
import { DateObject } from "react-multi-date-picker";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";

export const IndependentStepThreeFour = () => {
  // --- UseCases
  const optionsRepository = appContainer.get<GetOptionsUseCase>(
    USECASES_TYPES._GetOptionsUseCase
  );

  const router = useRouter();
  const { data: session, status } = useSession();
  const statusSession = status;
  const dispatch = useAppDispatch();
  const independentForm = useAppSelector((state) => state.independentSlice);
  // --- UseStates
  const [documentTypeOption, setDocumentTypeOption] =
    useState<SelectOption[]>();
  const [communityOptions, setCommunityOptions] = useState<SelectOption[]>();
  const [reserveOptions, setReserveOptions] = useState<SelectOption[]>();
  const [nationsOptions, setNationsOptions] = useState<SelectOption[]>();
  const [authDefined, setAuthDefined] = useState<boolean>();

  const [loading, setLoading] = useState<boolean>(true);

  let formikInitialValues: PersonalFormValuesType = {
    typeDoc: "",
    numDoc: "",
    firstName: "",
    firstLastName: "",
    secondName: "",
    secondLastName: "",
    bornDate: undefined,
  };
  let formikInitialValues1: DemographicFormValuesType = {
    civilStatus: "",
    gender: "",
    educationalLevel: "",
    sexualPreference: "",
    vulnerabilityFactor: "",
    nationality: "",
    ethnicity: "",
    shelter: "",
    village: "",
    residenceCity: "",
    residenceDepartment: "",
    taxi: "0",
  };
  const formSchema = Yup.object().shape({});
  const formSchema1 = Yup.object().shape({
    civilStatus: Yup.string().required("Campo obligatorio *"),
    gender: Yup.string().required("Campo obligatorio *"),
    educationalLevel: Yup.string().required("Campo obligatorio *"),
    sexualPreference: Yup.string().required("Campo obligatorio *"),
    vulnerabilityFactor: Yup.string().required("Campo obligatorio *"),
    nationality: Yup.string().required("Campo obligatorio *"),
    ethnicity: Yup.string().required("Campo obligatorio *"),
  });

  const formikForm: FormikProps<PersonalFormValuesType> = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formSchema,
  });
  const formikForm1: FormikProps<DemographicFormValuesType> = useFormik({
    initialValues: formikInitialValues1,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formSchema1,
  });

  // Methods
  const getOptions = async () => {
    console.log(independentForm.independentForm!.ValorIngreso);

    if (
      !independentForm.independentForm ||
      !independentForm.independentForm.ValorIngreso ||
      !independentForm.independentForm.SPCACTEcon ||
      !independentForm.independentForm.Ocupacion ||
      !independentForm.independentForm.CodEPS ||
      !independentForm.independentForm.CajaCompensacion
    ) {
      router.push("/");
      return;
    }
    const options = await optionsRepository.execute(session?.access_token);

    if (!options) {
      return;
    }

    if (options.documentTypes) {
      let documentTypeM: DocumentType[];
      documentTypeM = options.documentTypes.filter(
        (val) => !DOCUMENTS_NOT_ALLOWED_INDIVIDUAL.includes(val.code)
      );
      documentTypeM = documentTypeM.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      let documentTypeC = documentTypeM.map((documentTypeT) => {
        return {
          value: documentTypeT.code,
          label: documentTypeT.name,
          shorthand: documentTypeT.shorthand,
        };
      });
      setDocumentTypeOption(documentTypeC);
    }
    if (options.reserve) {
      const reserveC = options.reserve.map((reserveT) => {
        return { value: reserveT.code.toString(), label: reserveT.name };
      });
      setReserveOptions(reserveC);
    }

    if (options.community) {
      const communityC = options.community.map((communityT) => {
        return { value: communityT.code.toString(), label: communityT.name };
      });
      setCommunityOptions(communityC);
    }

    if (options.nationality) {
      const nationalityN = options.nationality.map((cityT) => {
        return { value: cityT.code.toString(), label: cityT.name };
      });
      setNationsOptions(nationalityN);
    }

    setLoading(false);
  };

  const getDate = (date: DateObject, split: string) => {
    const dateSplit: string[] = date.toString().split(split);
    if (dateSplit.length == 0) {
      return "";
    }

    return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
  };

  const getDateForward = (date: DateObject, split: string) => {
    const dateSplit: string[] = date.toString().split(split);
    if (dateSplit.length == 0) {
      return "";
    }

    return `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;
  };

  const sendData = async () => {
    if (!session || !session.access_token) {
      return;
    }

    if (!formikForm.values.bornDate) {
      formikForm.setFieldError("bornDate", "Campo obligatorio *");
      return;
    }
    await formikForm.submitForm();
    await formikForm1.submitForm();

    const errorsFormObject = await formikForm.validateForm();
    const errorsFormObject1 = await formikForm1.validateForm();

    // Catch errors array
    const errorsFirtForm = Object.values(errorsFormObject);
    const errorsFirtForm1 = Object.values(errorsFormObject1);

    let { identification_number, preferred_username, email } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;
    let independentAux: independentForm = {};
    if (isEmptyArray(errorsFirtForm) && isEmptyArray(errorsFirtForm1)) {
      independentAux = {
        ...independentForm.independentForm,
        TipoIdentTrab: formikForm.values.typeDoc,
        NroIdentTrab: formikForm.values.numDoc,
        PrimerApellido: formikForm.values.firstLastName?.toUpperCase() ?? "",
        SegundoApellido: formikForm.values.secondLastName?.toUpperCase() ?? "",
        Nombre1: formikForm.values.firstName?.toUpperCase() ?? "",
        Nombre2: formikForm.values.secondName?.toUpperCase() ?? "",
        FechaNacimiento: getDate(formikForm.values.bornDate!, " | "),
        EstadoCivil: formikForm1.values.civilStatus,
        Sexo: formikForm1.values.gender,
        NivelEscolaridad: formikForm1.values.educationalLevel,
        OrientacionSexual: formikForm1.values.sexualPreference,
        FactorVulnerabilidad: formikForm1.values.vulnerabilityFactor,
        Nacionalidad: formikForm1.values.nationality,
        Pertenencia_Etnica: formikForm1.values.ethnicity,
        Resguardo: formikForm1.values.shelter,
        PuebloIndigena: formikForm1.values.village,
        Taxi: formikForm1.values.taxi,
        TelefonoCel: preferred_username,
        CorreoElectronico: email,
        TipoAfiliado: "1",
        FechaAporte: getDateForward(new DateObject(), "/"),
        FechaAfiliacion: getDateForward(new DateObject(), "/"),
      };

      dispatch(setIndependentState(independentAux));
      router.push("./step-five");
    } else {
      return;
    }
  };

  useEffect(() => {
    // Loading
    setLoading(true);
    if (authDefined) {
      getOptions();
    }
  }, [authDefined]);

  // When not authenticated redirects to home
  useEffect(() => {
    if (statusSession == AUTH_LOADING_STATUS) {
      setAuthDefined(false);
      return;
    }
    setAuthDefined(true);
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      router.push("affiliations");
    }
  }, [statusSession]);

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
        number={3}
        descriptionStep="Confirma tus datos personales"
        className="w-4/5"
      />

      {!loading ? (
        <PersonalForm
          formik={formikForm}
          documentTypes={documentTypeOption!}
          classnameContainer="mt-5"
        />
      ) : (
        <></>
      )}

      <Divider className="w-4/5 my-8" />
      <StepSection
        number={4}
        descriptionStep="Información demográfica"
        className="w-4/5"
      />
      {!loading ? (
        <DemographicForm
          nationsOptions={nationsOptions!}
          reserveOptions={reserveOptions!}
          communityOptions={communityOptions!}
          formik={formikForm1}
          isTaxi={true}
          classnameContainer="mt-5"
        />
      ) : (
        <></>
      )}
    </IndependentTemplate>
  );
};
