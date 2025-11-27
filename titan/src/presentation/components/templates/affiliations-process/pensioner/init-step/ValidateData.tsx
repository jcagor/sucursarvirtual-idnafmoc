"use client";
import { RightsVerifyInterface } from "domain/models";
import { DocumentData } from "domain/models/identityWorker";
import RightsVerifyUseCase from "domain/usecases/rightsChecker/rightsVerify.use.case";
import ValidateIdentityUseCase from "domain/usecases/rnec/validateIdentityUseCase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { identificationTypeNomenclature } from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  CustomInputGray,
  CustomTwoInput,
  MainTitle,
  ProgressBar,
  SectionSeparator,
  Spinner,
  usePensionerAffiliations,
  useRnec,
} from "presentation";
import { CustomModal } from "presentation/components/atoms/common/modals";
import ModalRnec from "presentation/components/molecules/rnec/ModalRnec";
import { useAppSelector } from "presentation/store";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const fieldsRequired = [
  {
    name: "f_name",
    label: "El primer nombre es requerido",
  },
  {
    name: "f_last_name",
    label: "El primer apellido es requerido",
  },
  {
    name: "birth_date",
    label: "La fecha de nacimiento es requerida",
  },
];

const ValidateData = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataRnec, setdataRnec] = useState<DocumentData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [existData, setExistData] = useState(false);
  const [existDateBirth, setExistDateBirth] = useState(false);
  const [dataAffiliation, setDataAffiliation] = useState<{
    f_name: string;
    s_name: string;
    f_last_name: string;
    s_last_name: string;
    birth_date: string;
  }>({
    f_name: "",
    s_name: "",
    f_last_name: "",
    s_last_name: "",
    birth_date: "",
  });
  const [errors, setErrors] = useState({
    f_name: "",
    f_last_name: "",
    s_last_name: "",
    birth_date: "",
  });
  const { data: session } = useSession();
  const { saveDataAffiliation, validateIdentity } = usePensionerAffiliations();
  const data = useAppSelector((state) => state.pensionerAffiliations);
  const router = useRouter();
  const { validateIdentityHandler } = useRnec();
  const verifyRightsCase = appContainer.get<RightsVerifyUseCase>(
    USECASES_TYPES._RightsVerifyUseCase
  );
  const validateIdentityUseCase = appContainer.get<ValidateIdentityUseCase>(
    USECASES_TYPES._ValidateIdentityUseCase
  );

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorLoad = { ...errors };
    errorLoad[e.target.name as keyof typeof errorLoad] = "";
    setErrors(errorLoad);
    let value = e.target.value.toUpperCase();
    if (e.target.name === "birth_date") {
      value = e.target.value;
    }
    setDataAffiliation({
      ...dataAffiliation,
      [e.target.name]: value,
    });
  };

  const handleCancelData = () => {
    setDataAffiliation({
      f_name: "",
      s_name: "",
      f_last_name: "",
      s_last_name: "",
      birth_date: "",
    });
    setErrors({
      f_name: "",
      f_last_name: "",
      s_last_name: "",
      birth_date: "",
    });
    setExistData(false);
    router.push("/menu-affiliations");
  };

  const handleConfirmData = () => {
    if (isLoadingConfirm) return;
    setIsLoadingConfirm(true);
    try {
      const errorLoad = { ...errors };
      fieldsRequired.forEach((field) => {
        if (dataAffiliation[field.name as keyof typeof dataAffiliation] == "") {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });
      if (Object.values(errorLoad).every((error) => error === "")) {
        saveDataAffiliation(dataAffiliation);
        router.push("/menu-affiliations/pensioner/select-type-affiliations");
      }
      setErrors(errorLoad);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingConfirm(false);
    }
  };

  const handleValidateData = useCallback(async () => {
    try {
      if (!data.isStarted) {
        router.push("/menu-affiliations");
      }
      const documentTitularToken = data.identificationNumber;
      const typeDocumentTitularToken = identificationTypeNomenclature(
        data.identificationType
      );
      const verifyRightsResponse: RightsVerifyInterface | undefined =
        await verifyRightsCase.execute(
          documentTitularToken,
          typeDocumentTitularToken!,
          session?.access_token
        );
      const respDataRnec = await validateIdentityHandler(
        session?.access_token || "",
        data.identificationNumber,
        data.identificationType
      );

      const documentTitularResponse =
        verifyRightsResponse?.TitularNumeroDocumento;
      if (
        verifyRightsResponse?.TitularPrimerNombre != null &&
        documentTitularResponse !== documentTitularToken &&
        !respDataRnec
      ) {
        const pacs = verifyRightsResponse?.pacs;
        if (pacs && pacs.length > 0 && !respDataRnec) {
          const pacsResponse = pacs.find(
            (pac) => pac.PACNumeroDocumento === documentTitularToken
          );
          let existData = false;
          let existDateBirth = false;
          const dataAffiliation = {
            f_name: pacsResponse?.PACPrimerNombre ?? "",
            s_name: pacsResponse?.PACSegundoNombre ?? "",
            f_last_name: pacsResponse?.PACPrimerApellido ?? "",
            s_last_name: pacsResponse?.PACSegundoApellido ?? "",
            birth_date: pacsResponse?.PACFechaNacimiento ?? "",
          };
          if (pacsResponse) {
            existData = true;
            if (
              pacsResponse?.PACFechaNacimiento != null &&
              pacsResponse?.PACFechaNacimiento != "" &&
              pacsResponse?.PACFechaNacimiento.length > 0
            ) {
              existDateBirth = true;
            }
          }
          setDataAffiliation(dataAffiliation);
          setExistData(existData);
          setExistDateBirth(existDateBirth);
        }
      } else if (
        verifyRightsResponse?.TitularPrimerNombre != null &&
        !respDataRnec
      ) {
        setDataAffiliation({
          f_name: verifyRightsResponse.TitularPrimerNombre ?? "",
          s_name: verifyRightsResponse.TitularSegundoNombre ?? "",
          f_last_name: verifyRightsResponse.TitularPrimerApellido ?? "",
          s_last_name: verifyRightsResponse.TitularSegundoApellido ?? "",
          birth_date: verifyRightsResponse.TitularFechaNacimiento ?? "",
        });
        if (
          dataRnec?.fechaNacimiento ||
          (verifyRightsResponse.TitularFechaNacimiento != null &&
            verifyRightsResponse.TitularFechaNacimiento != "" &&
            verifyRightsResponse.TitularFechaNacimiento.length > 0)
        ) {
          setExistDateBirth(true);
        } else {
          setExistDateBirth(false);
        }
        setExistData(true);
      }
      if (respDataRnec && respDataRnec.estadoRNEC.toLowerCase() === "vigente") {
        setDataAffiliation({
          f_name: respDataRnec.primerNombre ?? "",
          s_name: respDataRnec.segundoNombre ?? "",
          f_last_name: respDataRnec.primerApellido ?? "",
          s_last_name: respDataRnec.segundoApellido ?? "",
          birth_date: respDataRnec.fechaNacimiento
            ? new Date(respDataRnec.fechaNacimiento).toISOString().split("T")[0]
            : "",
        });
        if (dataRnec?.fechaNacimiento) {
          setExistDateBirth(true);
        } else {
          setExistDateBirth(false);
        }
        setdataRnec(respDataRnec);
        validateIdentity("SUCCESS");
        setExistData(true);
      } else {
        validateIdentity("FAILED");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    data.isStarted,
    data.identificationNumber,
    data.identificationType,
    router,
    session?.access_token,
    verifyRightsCase,
    validateIdentityUseCase,
    validateIdentity,
    validateIdentityHandler,
  ]);

  useEffect(() => {
    handleValidateData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-6 md:gap-12 mb-6 md:mb-12">
          <CardText
            text="Afiliaciones / afiliación pensionado"
            className="text-principal-180 text-xl md:text-2xl"
          />
          <MainTitle text="Afiliación pensionado" />
          <SectionSeparator />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-8 md:gap-12">
          <div className="w-full max-w-[912px] bg-principal-150 flex flex-col gap-6 md:gap-12 px-4 md:px-16 py-6 md:py-12 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
                Confirma tus datos personales
              </h2>
            </div>
            <div className="w-full flex flex-col gap-4 mb-6 md:mb-10">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <CustomTwoInput
                  title="Tipo de identificación y número"
                  inputOne={{
                    disabled: true,
                    value: data.identificationType,
                  }}
                  inputTwo={{
                    classNameContainer: "w-full md:w-96",
                    disabled: true,
                    value: data.identificationNumber,
                  }}
                />
                <CustomInputGray
                  title="Primer nombre"
                  placeholder="Escribe tu primer nombre"
                  name="f_name"
                  disabled={existData || data.stateRnec === "SUCCESS"}
                  classNameContainer="w-full md:w-96"
                  borderColor="border-principal-330"
                  value={dataAffiliation.f_name}
                  onChange={handleChangeData}
                  errors={
                    errors.f_name && (
                      <p className="text-principal-500">{errors.f_name}</p>
                    )
                  }
                  isCustomBorder
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <CustomInputGray
                  title="Segundo nombre"
                  placeholder="Escribe tu segundo nombre"
                  name="s_name"
                  disabled={existData || data.stateRnec === "SUCCESS"}
                  classNameContainer="w-full md:w-96"
                  borderColor="border-principal-330"
                  value={dataAffiliation.s_name}
                  onChange={handleChangeData}
                  isCustomBorder
                />
                <CustomInputGray
                  title="Primer apellido"
                  placeholder="Escribe tu primer apellido"
                  name="f_last_name"
                  disabled={existData || data.stateRnec === "SUCCESS"}
                  classNameContainer="w-full md:w-96"
                  borderColor="border-principal-330"
                  value={dataAffiliation.f_last_name}
                  onChange={handleChangeData}
                  isCustomBorder
                  errors={
                    errors.f_last_name && (
                      <p className="text-principal-500">{errors.f_last_name}</p>
                    )
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <CustomInputGray
                  title="Segundo apellido"
                  placeholder="Escribe tu segundo apellido"
                  name="s_last_name"
                  disabled={existData || data.stateRnec === "SUCCESS"}
                  classNameContainer="w-full md:w-96"
                  borderColor="border-principal-330"
                  value={dataAffiliation.s_last_name}
                  onChange={handleChangeData}
                  isCustomBorder
                />
                <CustomInputGray
                  title="Fecha de nacimiento"
                  name="birth_date"
                  type="date"
                  disabled={existDateBirth || data.stateRnec === "SUCCESS"}
                  classNameContainer="w-full md:w-96"
                  borderColor="border-principal-330"
                  value={dataAffiliation.birth_date}
                  onChange={handleChangeData}
                  isCustomBorder
                  errors={
                    errors.birth_date && (
                      <p className="text-principal-500">{errors.birth_date}</p>
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full max-w-[912px] flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-4 px-4 md:px-0">
            <Button
              label="Los datos son incorrectos"
              primary
              primaryClass="bg-principal-500 text-principal-150 w-full md:w-96 px-4 md:px-12"
              onClick={handleCancelData}
              removeWidth
            />
            <Button
              label={
                isLoadingConfirm ? "Cargando..." : "Los datos son correctos"
              }
              disabled={isLoadingConfirm}
              primary
              primaryClass="bg-principal-700 text-principal-150 w-full md:w-96 px-4 md:px-12"
              onClick={handleConfirmData}
              removeWidth
            />
          </div>
          <div className="w-full max-w-[912px] flex flex-col items-center justify-center gap-4 px-4 md:px-0">
            <ProgressBar
              percentage={20}
              label="Tu progreso en la solicitud"
              width="w-full md:w-2/3"
              color="bg-principal-700"
            />
          </div>
        </div>
      </div>
      <ModalRnec url="/menu-affiliations" />
    </>
  );
};

export default ValidateData;
