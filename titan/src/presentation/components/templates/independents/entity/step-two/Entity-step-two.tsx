"use client";
import { StepSection } from "presentation/components/molecules";
import { IndependentTemplate } from "../../IndependentTemplate";
import { useRouter } from "next/navigation";
import {
  DemographicForm,
  DemographicFormValuesType,
  EntityForm,
  EntityFormValuesType,
  PersonalForm,
  PersonalFormValuesType,
} from "presentation/components/organisms";
import { useEffect, useState } from "react";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import * as Yup from "yup";
import {
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  DOCUMENTS_NOT_ALLOWED_INDIVIDUAL,
  ENTITIES_CONST,
  SelectOption,
} from "lib";
import { DocumentType, Entities, independentForm } from "domain/models";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { Divider } from "presentation/components/atoms";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import GetEntitiesUseCase from "domain/usecases/entities/getEntities.use.case";
import { DateObject } from "react-multi-date-picker";
import { setIndependentState } from "presentation/store/independent/independentSlice";

export const EntityStepTwo = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const statusSession = status;
  const dispatch = useAppDispatch();
  const independentForm = useAppSelector((state) => state.independentSlice);
  // --- UseCases
  const optionsRepository = appContainer.get<GetOptionsUseCase>(
    USECASES_TYPES._GetOptionsUseCase
  );

  const entitiesRepository = appContainer.get<GetEntitiesUseCase>(
    USECASES_TYPES._GetEntitiesUseCase
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [documentTypeOption, setDocumentTypeOption] =
    useState<SelectOption[]>();
  const [communityOptions, setCommunityOptions] = useState<SelectOption[]>();
  const [reserveOptions, setReserveOptions] = useState<SelectOption[]>();
  const [nationsOptions, setNationsOptions] = useState<SelectOption[]>();
  const [entitiesOptions, setEntitiesOptions] = useState<Entities>();
  const [authDefined, setAuthDefined] = useState<boolean>();

  let formikInitialValues: PersonalFormValuesType = {
    typeDoc: "",
    numDoc: "",
    firstName: "",
    firstLastName: "",
    secondName: "",
    secondLastName: "",
    bornDate: undefined,
  };
  let formikInitialValues1: EntityFormValuesType = {
    entity: "",
  };
  let formikInitialValues2: DemographicFormValuesType = {
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
    entity: Yup.string().required("Campo obligatorio *"),
  });
  const formSchema2 = Yup.object().shape({
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
  const formikForm1: FormikProps<EntityFormValuesType> = useFormik({
    initialValues: formikInitialValues1,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formSchema1,
  });
  const formikForm2: FormikProps<DemographicFormValuesType> = useFormik({
    initialValues: formikInitialValues2,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formSchema2,
  });

  // Methods
  const getOptions = async () => {
    if (
      !independentForm.independentForm ||
      !independentForm.independentForm.Selection ||
      independentForm.independentForm.Selection === undefined ||
      independentForm.independentForm.Selection === null ||
      independentForm.independentForm.Selection === ""
    ) {
      router.back();
      return;
    }
    const options = await optionsRepository.execute(session?.access_token);
    const entities = await entitiesRepository.execute(
      ENTITIES_CONST,
      session?.access_token
    );

    if (!options || !entities) {
      return;
    }

    setEntitiesOptions(entities);

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

  const saveData = async () => {
    if (!session || !session.access_token) {
      return;
    }

    await formikForm.submitForm();
    await formikForm1.submitForm();
    await formikForm2.submitForm();

    const errorsFormObject = await formikForm.validateForm();
    const errorsFormObject1 = await formikForm1.validateForm();
    const errorsFormObject2 = await formikForm2.validateForm();

    const errorsFirtForm = Object.values(errorsFormObject);
    const errorsFirtForm1 = Object.values(errorsFormObject1);
    const errorsFirtForm2 = Object.values(errorsFormObject2);

    let independentAux: independentForm = {};

    if (!formikForm.values.bornDate) {
      formikForm.setFieldError("bornDate", "Campo obligatorio *");
      return;
    }
    if (
      isEmptyArray(errorsFirtForm) &&
      isEmptyArray(errorsFirtForm1) &&
      isEmptyArray(errorsFirtForm2)
    ) {
      const entity =
        entitiesOptions!.Entidades[parseInt(formikForm1.values.entity!)];
      if (!entity) {
        return;
      }

      independentAux = {
        ...independentForm.independentForm,
        TipoIdentTrab: formikForm.values.typeDoc,
        TituloTipoIdentTrab: documentTypeOption?.find(
          (doc) => doc.value == formikForm.values.typeDoc
        )?.label,
        NroIdentTrab: formikForm.values.numDoc,
        PrimerApellido: formikForm.values.firstLastName?.toUpperCase() ?? "",
        SegundoApellido: formikForm.values.secondLastName?.toUpperCase() ?? "",
        Nombre1: formikForm.values.firstName?.toUpperCase() ?? "",
        Nombre2: formikForm.values.secondName?.toUpperCase() ?? "",
        FechaNacimiento: getDate(formikForm.values.bornDate!, " | "),
        TipoIdentEntidad: "CO1N",
        NIFEntidad: entity.Nit.slice(0, -1),
        DigitoVerifica: entity.Nit.slice(-1),
        TituloEntidad: entity.RazonSocial,
        EstadoCivil: formikForm2.values.civilStatus,
        Sexo: formikForm2.values.gender,
        NivelEscolaridad: formikForm2.values.educationalLevel,
        OrientacionSexual: formikForm2.values.sexualPreference,
        FactorVulnerabilidad: formikForm2.values.vulnerabilityFactor,
        Nacionalidad: formikForm2.values.nationality,
        TituloNacionalidad: nationsOptions?.find(
          (values) => values.value == formikForm2.values.nationality
        )?.label,
        Pertenencia_Etnica: formikForm2.values.ethnicity,
        Resguardo: formikForm2.values.shelter,
        TituloResguardo: reserveOptions?.find(
          (values) => values.value == formikForm2.values.shelter
        )?.label,
        PuebloIndigena: formikForm2.values.village,
        TituloPuebloIndigena: communityOptions?.find(
          (values) => values.value == formikForm2.values.village
        )?.label,
      };
      dispatch(setIndependentState(independentAux));
      router.push("./step-three");
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
        number={2}
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
        number={3}
        descriptionStep="Datos de la entidad"
        className="w-4/5"
      />
      {!loading ? (
        <EntityForm
          formik={formikForm1}
          entitiesOptions={entitiesOptions!}
          classnameContainer="mt-5"
        />
      ) : (
        <></>
      )}
      <Divider className="w-4/5 my-8" />
      <StepSection
        number={4}
        descriptionStep="Información de identidad"
        className="w-4/5"
      />
      {!loading ? (
        <DemographicForm
          nationsOptions={nationsOptions!}
          reserveOptions={reserveOptions!}
          communityOptions={communityOptions!}
          formik={formikForm2}
          isTaxi={false}
          classnameContainer="mt-5"
        />
      ) : (
        <></>
      )}
    </IndependentTemplate>
  );
};
