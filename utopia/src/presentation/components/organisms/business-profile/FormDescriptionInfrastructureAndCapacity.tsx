"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  Button,
  CustomInputOne,
  MainTitle,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
  SectionSeparator,
  CardSelect,
} from "presentation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { DescriptionInfrastructureAndCapacityType } from "domain/models";
import createDataDescriptionInfrastructureAndCapacityUseCase from "domain/usecases/Business/createDataDescriptionInfrastructureAndCapacity.use.case";
import { useEffect } from "react";
import getDataDescriptionInfrastructureAndCapacityUseCase from "domain/usecases/Business/getDataDescriptionInfrastructureAndCapacity.use.case";
import { useDispatch } from "react-redux";
import { addAlert } from "presentation/store/slices/alertSlice";

const initialValues: DescriptionInfrastructureAndCapacityType = {
  TotalEmployees: null,
  NumberLocations: null,
  WorkingModality: "",
  MainProductsAndServices: "",
  MainMarkets: "",
  MainCompetitors: "",
  MainSuppliers: "",
  MainProductsOrServicesPurchased: "",
  RegistrationsOrCertificationsOrPatents: "",
  SocialResponsibilityActions: "",
};

const validationSchema = Yup.object().shape({
  TotalEmployees: Yup.number().required("Este campo es obligatorio"),
  NumberLocations: Yup.number().required("Este campo es obligatorio"),
  WorkingModality: Yup.string().required("Este campo es obligatorio"),
  MainProductsAndServices: Yup.string().required("Este campo es obligatorio"),
  MainMarkets: Yup.string().required("Este campo es obligatorio"),
  MainCompetitors: Yup.string().required("Este campo es obligatorio"),
  MainSuppliers: Yup.string().required("Este campo es obligatorio"),
  MainProductsOrServicesPurchased: Yup.string().required(
    "Este campo es obligatorio"
  ),
  RegistrationsOrCertificationsOrPatents: Yup.string().required(
    "Este campo es obligatorio"
  ),
  SocialResponsibilityActions: Yup.string().required(
    "Este campo es obligatorio"
  ),
});

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormDescriptionInfrastructureAndCapacity: React.FC<
  CurrentFormProps
> = ({ setCurrentForm }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    getDataDescriptionInfrastructureAndCapacity();
  }, []);

  const getDataDescriptionInfrastructureAndCapacity = async () => {
    const getDataBusiness =
      appContainer.get<getDataDescriptionInfrastructureAndCapacityUseCase>(
        USECASES_TYPES._GetDataDescriptionInfrastructureAndCapacity
      );
    const response = await getDataBusiness.execute(session?.access_token);
    if (response) {
      setValues(response);
    }
  };
  const NextForm = () => {
    setCurrentForm(7);
  };

  const previousForm = () => {
    setCurrentForm(5);
  };

  const onSubmit = async (values: DescriptionInfrastructureAndCapacityType) => {
    const createDataDescriptionInfrastructureAndCapacity =
      appContainer.get<createDataDescriptionInfrastructureAndCapacityUseCase>(
        USECASES_TYPES._CreateDataInfrastructureAndCapacity
      );
    const response =
      await createDataDescriptionInfrastructureAndCapacity.execute(
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
    setFieldValue,
    touched,
    handleBlur,
    submitCount,
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
          <NumberCircle number={5} />
          <TertiaryTitle
            text="Descripción de la infraestructura y la capacidad de producción / servicio / comercialización"
            className="ml-3"
          />
        </div>
        <SecondaryText text="Completa la Información " />

        <div className="w-full grid grid-cols-1 gap-6">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputOne
              name="TotalEmployees"
              title="No. Total de Empleados"
              type="number"
              placeholder="10"
              value={values.TotalEmployees ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.TotalEmployees || submitCount > 0) &&
                errors.TotalEmployees ? (
                  <NeutralBlackText
                    text={errors.TotalEmployees}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="NumberLocations"
              title="No. de sedes"
              type="number"
              placeholder="1"
              value={values.NumberLocations ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.NumberLocations || submitCount > 0) &&
                errors.NumberLocations ? (
                  <NeutralBlackText
                    text={errors.NumberLocations}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
          <CardSelect
            title="Modalidad de trabajo"
            value={values.WorkingModality}
            onChange={(value) => setFieldValue("WorkingModality", value)}
            cards={[
              {
                id: "InPerson",
                imageSrc: "/utopia/icons/ClasificacionEmpresa_Micro.png",
                text: "Presencial",
              },
              {
                id: "Remote",
                imageSrc: "/utopia/icons/teleworking.png",
                text: "Teletrabajo",
              },
              {
                id: "Hybrid ",
                imageSrc: "/utopia/icons/hybrid-work.png",
                text: "Hibrido",
              },
            ]}
            errors={
              errors.WorkingModality ? (
                <NeutralBlackText
                  text={errors.WorkingModality}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MainProductsAndServices"
            title="Principales productos y servicios "
            placeholder="Carne de Res, Carne de Cerdo "
            value={values.MainProductsAndServices}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MainProductsAndServices || submitCount > 0) &&
              errors.MainProductsAndServices ? (
                <NeutralBlackText
                  text={errors.MainProductsAndServices}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MainMarkets"
            title="Principales mercados"
            placeholder="Restaurantes y Comedores, Supermercados y Tiendas de Alimentos"
            value={values.MainMarkets}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MainMarkets || submitCount > 0) && errors.MainMarkets ? (
                <NeutralBlackText
                  text={errors.MainMarkets}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MainCompetitors"
            title="Principales competidores"
            placeholder="Colanta, El bosque, Cargill"
            value={values.MainCompetitors}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MainCompetitors || submitCount > 0) &&
              errors.MainCompetitors ? (
                <NeutralBlackText
                  text={errors.MainCompetitors}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MainSuppliers"
            title="Principales proveedores"
            placeholder="Grupo Nutresa, Red Cárnica"
            value={values.MainSuppliers}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MainSuppliers || submitCount > 0) &&
              errors.MainSuppliers ? (
                <NeutralBlackText
                  text={errors.MainSuppliers}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MainProductsOrServicesPurchased"
            title="Principales productos o servicios comprados "
            placeholder="Ganado Vivo, Ingredientes y Aditivos"
            value={values.MainProductsOrServicesPurchased}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MainProductsOrServicesPurchased || submitCount > 0) &&
              errors.MainProductsOrServicesPurchased ? (
                <NeutralBlackText
                  text={errors.MainProductsOrServicesPurchased}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="RegistrationsOrCertificationsOrPatents"
            title="Registros / Certificaciones / Patentes"
            placeholder="N/A"
            value={values.RegistrationsOrCertificationsOrPatents}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.RegistrationsOrCertificationsOrPatents ||
                submitCount > 0) &&
              errors.RegistrationsOrCertificationsOrPatents ? (
                <NeutralBlackText
                  text={errors.RegistrationsOrCertificationsOrPatents}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="SocialResponsibilityActions"
            title="Acciones de responsabilidad social empresarial"
            placeholder="Donaciones de Alimentos, Apoyo a Bancos de Alimentos Locales"
            value={values.SocialResponsibilityActions}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.SocialResponsibilityActions || submitCount > 0) &&
              errors.SocialResponsibilityActions ? (
                <NeutralBlackText
                  text={errors.SocialResponsibilityActions}
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
