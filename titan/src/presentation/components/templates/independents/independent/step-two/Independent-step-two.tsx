"use client";
import { useRouter } from "next/navigation";
import { IndependentTemplate } from "../../IndependentTemplate";
import { ActionIconCard, StepSection } from "presentation/components/molecules";
import { useEffect, useState } from "react";
import {
  ConstributionFormValuesType,
  ContributionForm,
  useAppDispatch,
  useAppSelector,
} from "presentation";
import * as Yup from "yup";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import { setIndependentState } from "presentation/store/independent/independentSlice";
import { independentForm } from "domain/models";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import GetConfigurationUseCase from "domain/usecases/configuration/getConfiguration.use.case";
import {
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  CONFIG_SMM,
  INDEPENDET_0_6_PERCENT,
  INDEPENDET_2_PERCENT,
  SelectOption,
} from "lib";
import { useSession } from "next-auth/react";
import GetEconomicActivityUseCase from "domain/usecases/economicActivity/getEconomicActivity.use.case";
import GetOccupationUseCase from "domain/usecases/occupation/getOccupation.use.case";

export const IndependentStepTwo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const independentForm = useAppSelector((state) => state.independentSlice);
  const { data: session, status } = useSession();
  const statusSession = status;
  const [selectedId, setSelectedId] = useState<number>(0);
  const [smm, setSmm] = useState<number>(0);
  const [occupationOptions, setOccupationOptions] = useState<SelectOption[]>();
  const [activityOptions, setActivityOptions] = useState<SelectOption[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [authDefined, setAuthDefined] = useState<boolean>();

  const configurationRepository = appContainer.get<GetConfigurationUseCase>(
    USECASES_TYPES._GetConfigurationUseCase
  );

  const economicActivityUseCase = appContainer.get<GetEconomicActivityUseCase>(
    USECASES_TYPES._GetEconomicActivityUseCase
  );

  const ocupationUseCase = appContainer.get<GetOccupationUseCase>(
    USECASES_TYPES._GetOccupationUseCase
  );

  const options = [
    {
      text: "Quiero aportar el 2% para tener derecho a los servicios: recreación, turismo, capacitación, cultura y bibliotecas,  salud, droguerías, subsidio de vivienda, subsidio en especie, subsidio desempleo.",
      imageUrl: "",
      imageWidth: 0,
      imageHeight: 0,
      imageClassname: "",
      isSelected: false,
    },
    {
      text: "Quiero aportar el 0.6% para tener derecho a los servicios: recreación, turismo, capacitación, cultura y bibliotecas.",
      imageUrl: "",
      imageWidth: 0,
      imageHeight: 0,
      imageClassname: "",
      isSelected: false,
    },
  ];
  const formikInitialValues: ConstributionFormValuesType = {
    affiliation: "",
    economic: "",
    eps: "",
    income: "",
    ocupation: "",
  };
  const formModuleOnePacsSchema = Yup.object().shape({
    income: Yup.string().required("Campo obligatorio *"),
    economic: Yup.string().required("Campo obligatorio *"),
    ocupation: Yup.string().required("Campo obligatorio *"),
    eps: Yup.string().required("Campo obligatorio *"),
    affiliation: Yup.string().required("Campo obligatorio *"),
  });

  const formikForm: FormikProps<ConstributionFormValuesType> = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formModuleOnePacsSchema,
  });

  const getOptions = async () => {
    try {
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
      const [config, activities, occupations] = await Promise.all([
        configurationRepository.execute(CONFIG_SMM, session?.access_token),
        economicActivityUseCase.execute(session?.access_token),
        ocupationUseCase.execute(session?.access_token),
      ]);

      if (!config || !activities || !occupations) {
        throw new Error("Datos incompletos");
      }

      const activitiesAux = activities.map((activity) => ({
        value: activity.code,
        label: `${activity.code} - ${activity.name}`,
      }));

      const ocupationsAux = occupations.map((activity) => ({
        value: activity.code.toString(),
        label: `${activity.code} - ${activity.name}`,
      }));

      setSmm(parseInt(config.value.SMM));
      setOccupationOptions(ocupationsAux);
      setActivityOptions(activitiesAux);
    } catch (error) {
      console.error("Error al obtener las opciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    await formikForm.submitForm();
    const errorsFormObject = await formikForm.validateForm();

    // Catch errors array
    const errorsFirtForm = Object.values(errorsFormObject);

    const valueIncome = formikForm.values
      .income!.replaceAll(".", "")
      .replaceAll(" ", "")
      .replaceAll("$", "");

    if (parseInt(valueIncome) < smm) {
      formikForm.setFieldError(
        "income",
        "El valor ingresado no puede ser inferior al salario mínimo del año en curso."
      );
      return false;
    }
    let independentAux: independentForm = {};
    if (isEmptyArray(errorsFirtForm)) {
      independentAux = {
        ...independentForm.independentForm,
        CategoriaAportante:
          selectedId == 0 ? INDEPENDET_2_PERCENT : INDEPENDET_0_6_PERCENT,
        ValorIngreso: valueIncome,
        SPCACTEcon: formikForm.values.economic,
        Ocupacion: formikForm.values.ocupation,
        CodEPS: formikForm.values.eps,
        CajaCompensacion: formikForm.values.affiliation,
      };
      dispatch(setIndependentState(independentAux));
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Loading
    setLoading(true);
    if (authDefined) {
      getOptions();
    }
  }, [authDefined]);

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
        if (await saveData()) {
          router.push("./step-three-four");
        } else {
          return;
        }
      }}
    >
      <StepSection
        number={2}
        descriptionStep="Selecciona que beneficios quieres tener de acuerdo al tipo de aporte que quieres realizar"
        className="w-4/5"
      />
      <div>
        {options.map((value, index) => {
          return (
            <ActionIconCard
              key={index}
              index={index}
              text={value.text}
              imageUrl={value.imageUrl}
              imageWidth={value.imageWidth}
              imageHeight={value.imageHeight}
              imageClassname={value.imageClassname}
              isSelected={selectedId === index}
              onClickButton={() => {
                setSelectedId(index);
              }}
            />
          );
        })}
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <p>Cargando datos del formulario...</p>
        </div>
      ) : (
        <ContributionForm
          formik={formikForm}
          occupationOptions={occupationOptions!}
          activityOptions={activityOptions!}
          classnameContainer="mx-6 my-10"
        />
      )}
    </IndependentTemplate>
  );
};
