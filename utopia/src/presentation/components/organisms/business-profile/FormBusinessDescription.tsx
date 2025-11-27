"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  Button,
  CustomInputOne,
  CustomTextarea,
  MainTitle,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
  SectionSeparator,
  CardSelect,
  CustomSelectOne,
} from "presentation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import {
  BusinessDescriptionTypes,
  SectorTypes,
  SubsectorTypes,
} from "domain/models";
import CreateDataBusinessDescriptionUseCase from "domain/usecases/Business/createDataBusinessDescription.use.case";
import { useEffect } from "react";
import getDataBusinessDescriptionUseCase from "domain/usecases/Business/getDataBusinessDescription.use.case";
import FindAllSectorsUseCase from "domain/usecases/sector/FindAllSectors.use.case";
import FindSubsectorsBySectorUseCase from "domain/usecases/sector/FindSubsectorsBySector.use.case copy";
import { useDispatch } from "react-redux";
import { addAlert } from "presentation/store/slices/alertSlice";

const initialValues: BusinessDescriptionTypes = {
  History: "",
  Sector: "",
  MainEconomicActivity: "",
  Rating: "",
  YearsOfOperation: null,
  ValueProposition: "",
};

const validationSchema = Yup.object().shape({
  History: Yup.string().required("Este campo es obligatorio"),
  Sector: Yup.string().required("Este campo es obligatorio"),
  MainEconomicActivity: Yup.string().required("Este campo es obligatorio"),
  Rating: Yup.string().required("Este campo es obligatorio"),
  YearsOfOperation: Yup.number().required("Este campo es obligatorio"),
  ValueProposition: Yup.string().required("Este campo es obligatorio"),
});

let sectors: SectorTypes[] | undefined = [];
let subsectors: SubsectorTypes[] | undefined = [];

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormBusinessDescription: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    findAllSectors();
    getDataBusinessDescription();
  }, []);

  const getDataBusinessDescription = async () => {
    const getDataBusinessDescription =
      appContainer.get<getDataBusinessDescriptionUseCase>(
        USECASES_TYPES._GetDataBusinessDescription
      );
    const response = await getDataBusinessDescription.execute(
      session?.access_token
    );
    if (response) {
      setValues(response);
    }
  };

  const findAllSectors = async () => {
    const findAllSectors = appContainer.get<FindAllSectorsUseCase>(
      USECASES_TYPES._FindAllSectors
    );
    const response = await findAllSectors.execute(session?.access_token);
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener los sectores, intenta más tarde",
          type: "error",
        })
      );
      return;
    }
    sectors = response;
  };

  const onSubmit = async (values: BusinessDescriptionTypes) => {
    const createDataBusinessDescription =
      appContainer.get<CreateDataBusinessDescriptionUseCase>(
        USECASES_TYPES._CreateDataBusinessDescription
      );
    const response = await createDataBusinessDescription.execute(
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

  const NextForm = () => {
    setCurrentForm(6);
  };

  const previousForm = () => {
    setCurrentForm(4);
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
    touched,
    submitCount,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <MainTitle text="Perfil Empresarial " />
      <SecondaryText text="Diligencia todos los campos, en aquellas preguntas que no aplican para la empresa selecciona con N/A." />
      <SectionSeparator />

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-row items-center my-4">
          <NumberCircle number={4} />
          <TertiaryTitle text="Descripción de la empresa" className="ml-3" />
        </div>
        <SecondaryText text="Completa la Información " />

        <div className="w-full grid grid-cols-1 gap-6">
          <CustomTextarea
            name="History"
            id="History"
            title="Historia de los inicios y breve descripción de las actividades que la empresa realiza hoy"
            placeholder='Una familia con una pasión incomparable por la carne. La familia Sánchez, conocida por su tradición culinaria y amor por la buena comida, decidió convertir su pasión en un negocio. Así nació "Carnesanchez".'
            value={values.History}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.History || submitCount > 0) && errors.History ? (
                <NeutralBlackText
                  text={errors.History}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomSelectOne
            name="Sector"
            label="Sector"
            placeholder="Agroindustrial"
            defaultValue={values.Sector}
            value={values.Sector}
            options={(sectors ?? []).map((sector) => ({
              label: sector.name,
              value: sector.name,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.Sector || submitCount > 0) && errors.Sector ? (
                <NeutralBlackText
                  text={errors.Sector}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="MainEconomicActivity"
            title="Actividad Económica Principal / CIIU "
            placeholder="Procesamiento y comercialización de productos cárnicos"
            value={values.MainEconomicActivity}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MainEconomicActivity || submitCount > 0) &&
              errors.MainEconomicActivity ? (
                <NeutralBlackText
                  text={errors.MainEconomicActivity}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CardSelect
            title="Clasificación de la empresa"
            value={values.Rating}
            onChange={(value) => setFieldValue("Rating", value)}
            cards={[
              {
                id: "Micro",
                imageSrc: "/utopia/icons/ClasificacionEmpresa_Micro.png",
                text: "Micro",
              },
              {
                id: "Small",
                imageSrc: "/utopia/icons/ClasificacionEmpresa_Pequeña.png",
                text: "Pequeña",
              },
              {
                id: "Median",
                imageSrc: "/utopia/icons/ClasificacionEmpresa_Mediana.png",
                text: "Mediana",
              },
            ]}
            errors={
              errors.Rating ? (
                <NeutralBlackText
                  text={errors.Rating}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="YearsOfOperation"
            title="Años de funcionamiento "
            type="number"
            placeholder="3"
            value={values.YearsOfOperation ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.YearsOfOperation || submitCount > 0) &&
              errors.YearsOfOperation ? (
                <NeutralBlackText
                  text={errors.YearsOfOperation}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomTextarea
            name="ValueProposition"
            id="ValueProposition"
            title="Propuesta de valor de la empresa"
            placeholder="En Carnesanchez, transformamos nuestra pasión por la carne en experiencias culinarias excepcionales. Nos comprometemos a ofrecer productos cárnicos frescos y de la más alta calidad, elaborados con técnicas tradicionales y un toque de innovación."
            value={values.ValueProposition}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.ValueProposition || submitCount > 0) &&
              errors.ValueProposition ? (
                <NeutralBlackText
                  text={errors.ValueProposition}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>
        <div className="flex flex-row justify-between items-center">
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
          <Button
            type="submit"
            label="Siguiente"
            className="w-56 xl:w-72 self-end my-6"
            primary
          />
        </div>
      </form>
    </div>
  );
};
