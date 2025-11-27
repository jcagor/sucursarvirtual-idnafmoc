"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  Button,
  CardText,
  CustomSelectOne,
  MainTitle,
  ModalWithChildren,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { SelectOption } from "lib";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import CreateProgramUseCase from "domain/usecases/Business/createProgram.use.case";
import GetDataProgramUseCase from "domain/usecases/Business/getDataProgram.use.case";
import { ProgramType } from "domain/models/ProgramType";
import Image from "next/image";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { useRouter } from "next/navigation";
import PrevalidationBusinessUseCase from "domain/usecases/Business/prevalidationBusiness.use.case";
import ValidationRuesBusinessUseCase from "domain/usecases/Business/validationRuesBusiness.use.case";
import { responseIsValidBusinessType } from "domain/models/responseIsValidBusinesType";
import IsValidatedBusinessUseCase from "domain/usecases/Business/IsValidatedBusiness.use.case";

let initialValues: ProgramType = {
  id_program: "",
};

const validationSchema = Yup.object().shape({
  id_program: Yup.string().required("Este campo es obligatorio"),
});

interface CurrentFormProps {
  // setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormProgram: React.FC<CurrentFormProps> = () => {
  const [programs, setPrograms] = useState<SelectOption[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  let canContinue = false;

  useEffect(() => {
    IsValidatedBusiness();
    findAllPrograms();
  }, []);

  const findAllPrograms = async () => {
    const findAllPrograms = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "PROGRAM_LIST";
    const response = await findAllPrograms.execute(
      SelectOptionName,
      session?.access_token
    );
    if (response) {
      setPrograms(response);
    }
  };

  const IsValidatedBusiness = async () => {
    const IsValidatedBusiness = appContainer.get<IsValidatedBusinessUseCase>(
      USECASES_TYPES._IsValidatedBusiness
    );
    const response = await IsValidatedBusiness.execute(session?.access_token);
    if (response) {
      router.push("/");
    }
  };

  const prevalidationBusiness = async (programs: ProgramType) => {
    const prevalidationBusiness =
      appContainer.get<PrevalidationBusinessUseCase>(
        USECASES_TYPES._PrevalidationBusiness
      );
    const response = await prevalidationBusiness.execute(programs);
    if (!response) {
      dispatch(
        addAlert({
          message: "Algo salio mal con las validaciones, intenta mas tarde",
          type: "error",
        })
      );
    }
    return response;
  };

  const validationRuesBusiness = async (programs: ProgramType) => {
    const validationRuesBusiness =
      appContainer.get<ValidationRuesBusinessUseCase>(
        USECASES_TYPES._ValidationRuesBusiness
      );
    const response = await validationRuesBusiness.execute(programs);
    if (!response) {
      dispatch(
        addAlert({
          message: "Algo salio mal con las validaciones, intenta mas tarde",
          type: "error",
        })
      );
    }
    return response;
  };

  const saveProgram = async (programs: ProgramType): Promise<boolean> => {
    const createDataBusiness = appContainer.get<CreateProgramUseCase>(
      USECASES_TYPES._CreateProgram
    );
    const response = await createDataBusiness.execute(
      programs,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al guardar la información, intenta mas tarde",
          type: "error",
        })
      );
      return false;
    }
    return true;
  };

  const NextForm = () => {
    router.push("/");
  };

  const onSubmit = async (values: ProgramType) => {
    setOpenModal(true);
    setIsLoading(true);

    const errorEndpoint = () => {
      setIsLoading(false);
      setOpenModal(false);
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al guardar la información, intenta mas tarde",
          type: "error",
        })
      );
    };

    const correctPrevalidationBusiness:
      | responseIsValidBusinessType
      | undefined = await prevalidationBusiness(values);

    if (!correctPrevalidationBusiness) {
      errorEndpoint();
      return;
    }

    if (correctPrevalidationBusiness?.isValid === false) {
      setIsLoading(false);
      setSuccess(true);
      setValidationMessages(correctPrevalidationBusiness.messages);
      return;
    }

    const correctSaveProgram = await saveProgram(values);

    if (!correctSaveProgram) {
      errorEndpoint();
      return;
    }

    canContinue = true;

    const correctValidationRuesBusiness = await validationRuesBusiness(values);

    if (!correctValidationRuesBusiness) {
      errorEndpoint();
      return;
    }

    if (!correctValidationRuesBusiness.isValid) {
      setIsLoading(false);
      setSuccess(true);
      setValidationMessages(correctValidationRuesBusiness.messages);

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
    touched,
    submitCount,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="w-full h-full scroll-y-hidden scroll-x-hidden">
      <div className="flex scroll-y-hidden h-full">
        {/*<!-- Primera columna -->*/}
        <div className="h-full col-md-8 column w-[440px] min-w-[440px]">
          <img
            alt="logo"
            src="/utopia/img/lateral.png"
            className="h-full pl-0"
          />
        </div>

        {/*<!-- Segunda columna -->*/}
        <div className="col-md-6 column p-10 place-items-center flex scroll-y-auto">
          <div className="">
            <MainTitle text="Hola, Bienvenido a la Sucursal de" />
            <MainTitle text="Gestión MiPyme" />
            <SectionSeparator className="mt-4" />

            <div className="my-10">
              <TertiaryTitle text="Antes de comenzar, selecciona el programa de formación." />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <TertiaryTitle text="Programa de formación" className="mb-5" />
              <CustomSelectOne
                name="id_program"
                label="Programa"
                placeholder="Selecciona un programa"
                defaultValue={values.id_program}
                value={values.id_program}
                options={(programs ?? []).map((program) => ({
                  label: program.label,
                  value: program.value,
                }))}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  (touched.id_program || submitCount > 0) &&
                  errors.id_program ? (
                    <NeutralBlackText
                      text={errors.id_program}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
              <Button
                type="submit"
                label="Siguiente"
                className="w-56 xl:w-72 self-end mt-10"
                primary
              />
            </form>
            {openModal && (
              <ModalWithChildren
                onClose={() => {
                  setOpenModal(false);
                  setSuccess(false);
                  setIsLoading(false);
                  NextForm();
                }}
                className="md:w-[463px] xl:w-[600px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
                    <div className="text-principal-180 mt-2">
                      Validando información empresarial
                    </div>
                  </>
                ) : success ? (
                  <>
                    <Image
                      src="/utopia/icons/hello_full.png"
                      alt="Success icon"
                      width={80}
                      height={80}
                      className="cursor-pointer"
                      priority
                    />
                    <ModalTitle
                      text="Errores en la información"
                      className="mt-2"
                    />
                    {validationMessages.map((message, index) => (
                      <div className="w-full flex flex-row m-2">
                        <Image
                          src={"/utopia/icons/check.svg"}
                          alt="Card ellipse"
                          width={35}
                          height={35}
                          loading="lazy"
                          className="pr-4"
                        />
                        <CardText
                          text={message}
                          className={`text-[1rem] text-justify font-light modalText text-principal-180`}
                        />
                      </div>
                    ))}
                    <div className="flex flex-col w-[70%] space-y-3 pt-5 pb-2">
                      <Button
                        label="Continuar"
                        onClick={() => {
                          setOpenModal(false);
                          setIsLoading(false);
                          setSuccess(false);
                          NextForm();
                        }}
                        className="w-full"
                        primary
                      />
                    </div>
                  </>
                ) : null}
              </ModalWithChildren>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
