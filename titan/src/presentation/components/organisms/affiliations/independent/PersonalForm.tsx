"use client";
import { FormikProps } from "formik";
import {
  identificationTypeNomenclature,
  SelectOption,
  UserDataInterface,
} from "lib";
import {
  CustomInputOne,
  CustomSelectForm,
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { FC, useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker, { DateObject, toDateObject } from "react-multi-date-picker";
import { ActionCardCustom } from "../../common";
import Image from "next/image";
import EditIcon from "public/icons/edit-icon.svg";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useAppSelector } from "presentation/store";
import { PAC } from "domain/models";
import ModalRnec from "presentation/components/molecules/rnec/ModalRnec";

export type PersonalFormValuesType = {
  typeDoc?: string | undefined;
  numDoc?: string | undefined;
  firstName?: string | undefined;
  firstLastName?: string | undefined;
  secondName?: string | undefined;
  secondLastName?: string | undefined;
  bornDate?: DateObject | undefined;
};
type FormPropsType = {
  documentTypes: SelectOption[];
  classnameContainer?: string;
  formik: FormikProps<PersonalFormValuesType>;
};

export const PersonalForm: FC<FormPropsType> = ({
  documentTypes,
  classnameContainer,
  formik,
}) => {
  const router = useRouter();
  const [exist, setExist] = useState(true);
  const [existBornDate, setExistBornDate] = useState(false);
  const sapRights = useAppSelector((state) => state.setsapRights);
  const { data: session, status } = useSession();
  const dataRnec = useAppSelector((state) => state.rnec.dataRnec);
  const stateRnec = useAppSelector((state) => state.rnec.stateRnec);

  useEffect(() => {
    let { identification_number, identification_type } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;

    if (sapRights.rights?.EstadoEntregaTarjeta == null) {
      router.push("/");
      return;
    }

    //  identification_number = "1130591772";

    const identificationType =
      identificationTypeNomenclature(identification_type);
    console.log(identificationType, identification_number);
    formik.setFieldValue("typeDoc", identificationType ?? "", true);
    formik.setFieldValue("numDoc", identification_number, true);

    console.log(stateRnec);
    if (stateRnec === "SUCCESS") {
      formik.setFieldValue("firstName", dataRnec?.primerNombre, true);
      formik.setFieldValue("firstLastName", dataRnec?.primerApellido, true);
      formik.setFieldValue("secondName", dataRnec?.segundoNombre, true);
      formik.setFieldValue("secondLastName", dataRnec?.segundoApellido, true);

      if (dataRnec?.fechaNacimiento) {
        setExistBornDate(true);
        const [year, month, day] = (dataRnec?.fechaNacimiento ?? "").split("-");
        const bornDateObj = new DateObject({
          year: Number(year),
          month: Number(month),
          day: Number(day),
        });
        formik.setFieldValue("bornDate", bornDateObj, true);
      }
      return;
    }

    if (sapRights.rights?.Bp == null) {
      setExist(false);
      return;
    }

    let pac: PAC | undefined = undefined;

    if (sapRights.rights.TitularNumeroDocumento != identification_number) {
      pac = sapRights.rights.pacs?.filter(
        (pac) => pac.PACNumeroDocumento === identification_number
      )[0];
    }
    const firstName = pac
      ? pac.PACPrimerNombre
      : sapRights.rights?.TitularPrimerNombre;
    const firstLastName = pac
      ? pac.PACPrimerApellido
      : sapRights.rights?.TitularPrimerApellido;
    const secondName = pac
      ? pac.PACSegundoNombre
      : sapRights.rights?.TitularSegundoNombre;
    const secondLastName = pac
      ? pac.PACSegundoApellido
      : sapRights.rights?.TitularSegundoApellido;

    formik.setFieldValue("firstName", firstName, true);
    formik.setFieldValue("firstLastName", firstLastName, true);
    formik.setFieldValue("secondName", secondName, true);
    formik.setFieldValue("secondLastName", secondLastName, true);

    if (pac) {
      if (!pac.PACFechaNacimiento) {
        setExistBornDate(false);
        return;
      }
      const [year, month, day] = (pac.PACFechaNacimiento ?? "").split("-");
      const bornDateObj = new DateObject({
        year: Number(year),
        month: Number(month),
        day: Number(day),
      });
      formik.setFieldValue("bornDate", bornDateObj, true);
      setExistBornDate(true);
      return;
    }

    // Set bornDate from TitularFechaNacimiento (format: AAAA-MM-DD)
    if (sapRights.rights?.TitularFechaNacimiento) {
      const [year, month, day] = (
        sapRights.rights?.TitularFechaNacimiento ?? ""
      ).split("-");
      const bornDateObj = new DateObject({
        year: Number(year),
        month: Number(month),
        day: Number(day),
      });
      formik.setFieldValue("bornDate", bornDateObj, true);
      setExistBornDate(true);
      return;
    }
  }, []);

  return (
    <>
      <div
        className={`flex flex-wrap overflow-y-scroll no-scrollbar ${classnameContainer}`}
      >
        <div className="flex-col">
          <form onSubmit={formik.handleSubmit} className="m-0 p-0">
            <div className="grid grid-cols-2 grid-flow-row gap-x-16 gap-y-6">
              <CustomSelectOne
                disabled={true}
                label="Tipo de identificación*"
                value={formik.values.typeDoc}
                onChange={(val) => {
                  formik.setFieldValue("typeDoc", val.target.value, true);
                }}
                options={documentTypes}
                errors={
                  formik.errors.typeDoc ? (
                    <NeutralBlackText
                      text={formik.errors.typeDoc}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
              <CustomInputOne
                disabled={true}
                id="numDoc"
                label="Número de identificación*"
                value={formik.values.numDoc}
                onChange={(val) => {
                  formik.setFieldValue(
                    "numDoc",
                    val.target.value.toUpperCase(),
                    true
                  );
                }}
              />
              <CustomInputOne
                disabled={exist}
                id="firstName"
                label="Primer nombre*"
                value={formik.values.firstName}
                onChange={(val) => {
                  formik.setFieldValue(
                    "firstName",
                    val.target.value.toUpperCase(),
                    true
                  );
                }}
              />
              <CustomInputOne
                disabled={exist}
                label="Segundo nombre"
                value={formik.values.secondName}
                onChange={(val) => {
                  formik.setFieldValue(
                    "secondName",
                    val.target.value.toUpperCase(),
                    false
                  );
                }}
              />
              <CustomInputOne
                disabled={exist}
                label="Primer apellido*"
                value={formik.values.firstLastName}
                onChange={(val) => {
                  formik.setFieldValue(
                    "firstLastName",
                    val.target.value.toUpperCase(),
                    true
                  );
                }}
              />
              <CustomInputOne
                disabled={exist}
                label="Segundo apellido"
                value={formik.values.secondLastName}
                onChange={(val) => {
                  formik.setFieldValue(
                    "secondLastName",
                    val.target.value.toUpperCase(),
                    false
                  );
                }}
              />
              <div
                className={`w-[calc(324px)] col-span-2 ${
                  formik.errors.bornDate
                    ? " h-[calc(108px)]"
                    : " h-[calc(68px)]"
                }`}
              >
                <NeutralBlackText
                  className={"text-principal-450"}
                  text={"Fecha de nacimiento"}
                />
                <div className="flex flex-row">
                  <DatePicker
                    //   disabled={formik.values.bornDate ? true : false}
                    placeholder="Fecha de nacimiento"
                    disabled={existBornDate}
                    value={formik.values.bornDate}
                    format={"DD | MM | YYYY"}
                    maxDate={toDateObject(new Date())}
                    inputMode="none"
                    onChange={(date) => {
                      if (!date) {
                        return;
                      }
                      let currentDate: Date = new Date(
                        date.year,
                        date.month.valueOf() - 1,
                        date.day
                      );

                      if (currentDate > new Date()) {
                        return;
                      }
                      formik.setFieldValue("bornDate", date.toString(), true);
                    }}
                    style={{
                      margin: 0,
                      paddingLeft: "15px",
                      color: "#777777",
                      width: "324px",
                      height: "48px",
                      backgroundColor: existBornDate ? "#F3F3F3" : "#FFFFFF",
                      borderWidth: "1px",
                      borderColor: "#777777",
                      fontFamily: "Outfit",
                      fontSize: "15px",
                      fontWeight: "400",
                      lineHeight: "19px",
                    }}
                  />
                  <div className="flex flex-wrap w-full self-center justify-items-center ml-[calc(-25px)]">
                    <FaCalendarAlt className="text-principal-330 " />
                  </div>
                </div>
                <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
                  {formik.errors.bornDate ? (
                    <NeutralBlackText
                      text={formik.errors.bornDate}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null}
                </div>
              </div>
              <ActionCardCustom
                mainTitle="Modificar mis datos personales"
                secondTitle="Regresar a la sucursal virtual y editar mis datos personales."
                className="w-[calc(20.5rem)]  h-[calc(5.563rem)]"
                action={() => {
                  router.push("/my-account");
                }}
              >
                <Image
                  src={EditIcon}
                  alt="Edit Icon"
                  className="absolute top-4 right-4"
                  width={22}
                  height={22}
                />
              </ActionCardCustom>
            </div>
          </form>
        </div>
      </div>
      <ModalRnec url="/independents/step-one" />
    </>
  );
};
