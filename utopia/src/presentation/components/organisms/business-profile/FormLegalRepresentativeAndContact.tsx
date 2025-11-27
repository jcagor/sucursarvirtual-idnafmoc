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
} from "presentation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { LegalRepresentativeBusinessTypes } from "domain/models/LegalRepresentativeBusinessTypes";
import { ContactBusinessTypes } from "domain/models/ContactBusinessTypes";
import CreateDataLegalRepresentativeAndContactUseCase from "domain/usecases/Business/CreateDataLegalRepresentativeAndContact.use.case";
import { useEffect } from "react";
import getDataLegalRepresentativeAndContactUseCase from "domain/usecases/Business/getDataLegalRepresentativeAndContact.use.case";
import { ONLY_NUMBERS_REGEXP } from "lib";
import { useDispatch } from "react-redux";
import { addAlert } from "presentation/store/slices/alertSlice";

interface LegalRepresentativeAndContactTypes
  extends LegalRepresentativeBusinessTypes,
    ContactBusinessTypes {}

let initialValues: LegalRepresentativeAndContactTypes = {
  NameLegalRepresentative: "",
  IdentificationLegalRepresentative: null,
  PhoneLegalRepresentative: null,
  MailLegalRepresentative: "",
  NameContact: "",
  IdentificationContact: null,
  PhoneContact: null,
  MailContact: "",
};

const validationSchema = Yup.object().shape({
  NameLegalRepresentative: Yup.string().required("Este campo es obligatorio"),
  IdentificationLegalRepresentative: Yup.string()
    .required("Este campo es obligatorio")
    .matches(ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
    .min(5, "La identificación debe tener minimo 5 dígitos"),
  PhoneLegalRepresentative: Yup.string()
    .required("Este campo es obligatorio")
    .matches(ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
    .min(7, "El número de teléfono debe tener minimo 7 dígitos")
    .max(10, "El número de teléfono debe tener máximo 10 dígitos"),
  MailLegalRepresentative: Yup.string()
    .required("Este campo es obligatorio")
    .email("El email no es válido"),
  NameContact: Yup.string().required("Este campo es obligatorio"),
  IdentificationContact: Yup.string()
    .required("Este campo es obligatorio")
    .matches(ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
    .min(5, "La identificación debe tener minimo 5 dígitos"),
  PhoneContact: Yup.string()
    .required("Este campo es obligatorio")
    .matches(ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
    .min(7, "El número de teléfono debe tener minimo 7 dígitos")
    .max(10, "El número de teléfono debe tener máximo 10 dígitos"),
  MailContact: Yup.string()
    .required("Este campo es obligatorio")
    .email("El email no es válido"),
});

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormLegalRepresentativeAndContact: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    getDataLegalRepresentativeAndContact();
  }, []);

  const getDataLegalRepresentativeAndContact = async () => {
    const getDataBusiness =
      appContainer.get<getDataLegalRepresentativeAndContactUseCase>(
        USECASES_TYPES._GetDataLegalRepresentativeAndContact
      );
    const response = await getDataBusiness.execute(session?.access_token);
    if (response) {
      setValues(response);
    }
  };

  const onSubmit = async (values: LegalRepresentativeAndContactTypes) => {
    const createDataLegalRepresentativeAndContactUseCase =
      appContainer.get<CreateDataLegalRepresentativeAndContactUseCase>(
        USECASES_TYPES._CreateDataLegalRepresentativeAndContact
      );
    const response =
      await createDataLegalRepresentativeAndContactUseCase.execute(
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
    setCurrentForm(5);
  };

  const previousForm = () => {
    setCurrentForm(3);
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

      <form onSubmit={handleSubmit} className="flex flex-col ">
        <div className="relative flex flex-row items-center mt-6">
          <NumberCircle number={2} />
          <TertiaryTitle
            text="Datos del representante legal de la empresa"
            className="ml-3"
          />
        </div>
        <SecondaryText text="Completa la Información " />

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomInputOne
            name="NameLegalRepresentative"
            id="NameLegalRepresentative"
            title="Nombre"
            placeholder="Julio Martin Sanchez Rada"
            value={values.NameLegalRepresentative}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.NameLegalRepresentative || submitCount > 0) &&
              errors.NameLegalRepresentative ? (
                <NeutralBlackText
                  text={errors.NameLegalRepresentative}
                  className="text-principal-500"
                />
              ) : null
            }
          />
          <CustomInputOne
            name="IdentificationLegalRepresentative"
            id="IdentificationLegalRepresentative"
            title="Cédula"
            type="number"
            placeholder="102392921"
            value={values.IdentificationLegalRepresentative ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.IdentificationLegalRepresentative || submitCount > 0) &&
              errors.IdentificationLegalRepresentative ? (
                <NeutralBlackText
                  text={errors.IdentificationLegalRepresentative}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="PhoneLegalRepresentative"
            id="PhoneLegalRepresentative"
            title="Teléfono"
            type="number"
            placeholder="3158694000"
            value={values.PhoneLegalRepresentative ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.PhoneLegalRepresentative || submitCount > 0) &&
              errors.PhoneLegalRepresentative ? (
                <NeutralBlackText
                  text={errors.PhoneLegalRepresentative}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MailLegalRepresentative"
            id="MailLegalRepresentative"
            title="Email"
            placeholder="jmrs@gmail.com "
            value={values.MailLegalRepresentative}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MailLegalRepresentative || submitCount > 0) &&
              errors.MailLegalRepresentative ? (
                <NeutralBlackText
                  text={errors.MailLegalRepresentative}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>

        <div className="relative flex flex-row items-center mt-6">
          <NumberCircle number={3} />
          <TertiaryTitle
            text="Datos personal contacto para el programa"
            className="ml-3"
          />
        </div>
        <SecondaryText text="Completa la Información " />

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomInputOne
            name="NameContact"
            id="NameContact"
            title="Nombre"
            placeholder="Julio Martin Sanchez Rada"
            value={values.NameContact}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.NameContact || submitCount > 0) && errors.NameContact ? (
                <NeutralBlackText
                  text={errors.NameContact}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="IdentificationContact"
            id="IdentificationContact"
            title="Cédula"
            type="number"
            placeholder="102392921"
            value={values.IdentificationContact ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.IdentificationContact || submitCount > 0) &&
              errors.IdentificationContact ? (
                <NeutralBlackText
                  text={errors.IdentificationContact}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="PhoneContact"
            id="PhoneContact"
            title="Teléfono"
            type="number"
            placeholder="3158694000"
            value={values.PhoneContact ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.PhoneContact || submitCount > 0) &&
              errors.PhoneContact ? (
                <NeutralBlackText
                  text={errors.PhoneContact}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <CustomInputOne
            name="MailContact"
            id="MailContact"
            title="Email"
            placeholder="jmrs@gmail.com "
            value={values.MailContact}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.MailContact || submitCount > 0) && errors.MailContact ? (
                <NeutralBlackText
                  text={errors.MailContact}
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
