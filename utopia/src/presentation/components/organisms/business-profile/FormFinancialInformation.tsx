"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  Button,
  CustomInputOne,
  CustomPriceInput,
  MainTitle,
  ModalWithChildren,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
  SectionSeparator,
} from "presentation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { FinancialInformationType } from "domain/models";
import { useRouter } from "next/navigation";
import createFinancialInformationUseCase from "domain/usecases/Business/createFinancialInformation.use.case";
import { useEffect, useState } from "react";
import getDataFinancialInformationUseCase from "domain/usecases/Business/getDataFinancialInformation.use.case";
import { ONLY_NUMBERS_REGEXP } from "lib";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";

const initialValues: FinancialInformationType = {
  SalesYears1: "0",
  SalesYears2: "0",
  SalesYears3: "0",
  ValueAssetsYear1: "0",
  ValueAssetsYear2: "0",
  ValueAssetsYear3: "0",
  ValueFinancialObligations: "0",
  ValueRawMaterialsInventory: "0",
  ValueFinishedProductInventory: "0",
  CompletedBy: "",
  Phone: null,
};

const validationSchema = Yup.object().shape({
  SalesYears1: Yup.string().required("Este campo es obligatorio"),
  SalesYears2: Yup.string().required("Este campo es obligatorio"),
  SalesYears3: Yup.string().required("Este campo es obligatorio"),
  ValueAssetsYear1: Yup.string().required("Este campo es obligatorio"),
  ValueAssetsYear2: Yup.string().required("Este campo es obligatorio"),
  ValueAssetsYear3: Yup.string().required("Este campo es obligatorio"),
  ValueFinancialObligations: Yup.string().required("Este campo es obligatorio"),
  ValueRawMaterialsInventory: Yup.string().required(
    "Este campo es obligatorio"
  ),
  ValueFinishedProductInventory: Yup.string().required(
    "Este campo es obligatorio"
  ),
  CompletedBy: Yup.string().required("Este campo es obligatorio"),
  Phone: Yup.string()
    .required("Este campo es obligatorio")
    .matches(ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
    .min(7, "El número de teléfono debe tener minimo 7 dígitos")
    .max(10, "El número de teléfono debe tener máximo 10 dígitos"),
});

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormFinancialInformation: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getDataFinancialInformation();
  }, []);

  const getDataFinancialInformation = async () => {
    const getDataBusiness =
      appContainer.get<getDataFinancialInformationUseCase>(
        USECASES_TYPES._GetDataFinancialInformation
      );
    const response = await getDataBusiness.execute(session?.access_token);
    if (response) {
      setValues(response);
    }
  };

  const NextForm = () => {
    router.push("/");
  };

  const previousForm = () => {
    setCurrentForm(6);
  };

  const onSubmit = async (values: FinancialInformationType) => {
    const createDataFinancialInformation =
      appContainer.get<createFinancialInformationUseCase>(
        USECASES_TYPES._CreateDataFinancialInformation
      );
    const response = await createDataFinancialInformation.execute(
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
    setOpenModal(true);
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
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
          <NumberCircle number={6} />
          <TertiaryTitle text="Información financiera" className="ml-3" />
        </div>
        <SecondaryText text="Completa la Información " />

        <div className="w-full grid grid-cols-1 gap-6">
          <NeutralBlackText
            className={"text-principal-450 h-[calc(20px)] pt-3"}
            text="Ventas de los últimos 3 años"
          />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            <CustomPriceInput
              name="SalesYears1"
              id="SalesYears1"
              title="Año 1 (2022)"
              placeholder=""
              value={values.SalesYears1 ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.SalesYears1 || submitCount > 0) &&
                errors.SalesYears1 ? (
                  <NeutralBlackText
                    text={errors.SalesYears1}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomPriceInput
              name="SalesYears2"
              id="SalesYears2"
              title="Año 2 (2023)"
              placeholder=""
              value={values.SalesYears2 ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.SalesYears2 || submitCount > 0) &&
                errors.SalesYears2 ? (
                  <NeutralBlackText
                    text={errors.SalesYears2}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomPriceInput
              name="SalesYears3"
              id="SalesYears3"
              title="Año 3 (2024)"
              placeholder=""
              value={values.SalesYears3 ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.SalesYears3 || submitCount > 0) &&
                errors.SalesYears3 ? (
                  <NeutralBlackText
                    text={errors.SalesYears3}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
          <NeutralBlackText
            className={"text-principal-450 h-[calc(20px)] pt-3"}
            text="Valor activos de los últimos 3 años"
          />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            <CustomPriceInput
              name="ValueAssetsYear1"
              id="ValueAssetsYear1"
              title="Año 1 (2022)"
              placeholder=""
              value={values.ValueAssetsYear1 ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.ValueAssetsYear1 || submitCount > 0) &&
                errors.ValueAssetsYear1 ? (
                  <NeutralBlackText
                    text={errors.ValueAssetsYear1}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomPriceInput
              name="ValueAssetsYear2"
              id="ValueAssetsYear2"
              title="Año 2 (2023)"
              placeholder=""
              value={values.ValueAssetsYear2 ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.ValueAssetsYear2 || submitCount > 0) &&
                errors.ValueAssetsYear2 ? (
                  <NeutralBlackText
                    text={errors.ValueAssetsYear2}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomPriceInput
              name="ValueAssetsYear3"
              id="ValueAssetsYear3"
              title="Año 3 (2024)"
              placeholder=""
              value={values.ValueAssetsYear3 ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.ValueAssetsYear3 || submitCount > 0) &&
                errors.ValueAssetsYear3 ? (
                  <NeutralBlackText
                    text={errors.ValueAssetsYear3}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
          <CustomPriceInput
            name="ValueFinancialObligations"
            id="ValueFinancialObligations"
            title="Valor obligaciones financieras"
            placeholder="$100,000,000 COP"
            value={values.ValueFinancialObligations ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.ValueFinancialObligations || submitCount > 0) &&
              errors.ValueFinancialObligations ? (
                <NeutralBlackText
                  text={errors.ValueFinancialObligations}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomPriceInput
            name="ValueRawMaterialsInventory"
            id="ValueRawMaterialsInventory"
            title="Valor inventario material primas"
            placeholder="$166,000,000 COP"
            value={values.ValueRawMaterialsInventory ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.ValueRawMaterialsInventory || submitCount > 0) &&
              errors.ValueRawMaterialsInventory ? (
                <NeutralBlackText
                  text={errors.ValueRawMaterialsInventory}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomPriceInput
            name="ValueFinishedProductInventory"
            id="ValueFinishedProductInventory"
            title="Valor inventario producto terminado"
            placeholder="$166,000,000 COP"
            value={values.ValueFinishedProductInventory ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.ValueFinishedProductInventory || submitCount > 0) &&
              errors.ValueFinishedProductInventory ? (
                <NeutralBlackText
                  text={errors.ValueFinishedProductInventory}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <SectionSeparator />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomInputOne
              name="CompletedBy"
              id="CompletedBy"
              title="Diligenciado por"
              placeholder="Nombre Completo"
              value={values.CompletedBy}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.CompletedBy || submitCount > 0) &&
                errors.CompletedBy ? (
                  <NeutralBlackText
                    text={errors.CompletedBy}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="Phone"
              id="Phone"
              title="Telefono"
              type="number"
              placeholder="Telefono"
              value={values.Phone ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.Phone || submitCount > 0) && errors.Phone ? (
                  <NeutralBlackText
                    text={errors.Phone}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
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
      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/utopia/icons/check_ok.svg"
            alt="Close icon"
            width={80}
            height={80}
            className={`cursor-pointer`}
            priority
          />
          <ModalTitle
            text="¡Información registrada con éxito!"
            className="mt-2"
          />
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={() => {
                setOpenModal(false);
                NextForm();
              }}
              className="w-full"
              primary
            />
          </div>
        </ModalWithChildren>
      )}
    </div>
  );
};
