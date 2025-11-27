"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { BusinessAuthorizedType } from "domain/models/course/BusinessAuthorizedType";
import AssignBusinessToScheduleUseCase from "domain/usecases/course/AssignBusinessToSchedule.use.case";
import FindBusinessAuthorizedByScheduleUseCase from "domain/usecases/course/FindBusinessAuthorizedBySchedule.use.case.";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { useFormik } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { assignBusinessToScheduleValidation, SelectOption } from "lib";
import { useSession } from "next-auth/react";
import {
  Button,
  CustomSelectOne,
  ModalWithChildren,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ScheduleAuthorizedBusinessProps {
  id: string;
}

export const ScheduleAuthorizedBusiness: React.FC<
  ScheduleAuthorizedBusinessProps
> = ({ id }) => {
  const [authorizedBusiness, setAuthorizedBusiness] = useState<
    BusinessAuthorizedType[]
  >([]);
  const [bussiness, setBusiness] = useState<SelectOption[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    findBusinessAuthorized();
    findBusiness();
  }, []);

  const findBusinessAuthorized = async () => {
    const findBusinessAuthorized =
      appContainer.get<FindBusinessAuthorizedByScheduleUseCase>(
        USECASES_TYPES._FindBusinessAuthorizedBySchedule
      );
    const response = await findBusinessAuthorized.execute(id);
    if (!response) {
      toast.error("No se pudieron cargar las empresas.");
      return;
    }
    setAuthorizedBusiness(response);
  };

  const findBusiness = async () => {
    const getOptionsBusiness = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "BUSINESS_LIST";
    const response = await getOptionsBusiness.execute(
      SelectOptionName,
      session?.access_token
    );
    if (!response) {
      toast.error("No se pudieron cargar las empresas.");
      return;
    }
    setBusiness(response);
  };

  const initialValues = {
    business_id: "",
  };

  const onSubmit = async (values: { business_id: string }) => {
    const assignBusinessToSchedule =
      appContainer.get<AssignBusinessToScheduleUseCase>(
        USECASES_TYPES._AssignBusinessToSchedule
      );
    const response = await assignBusinessToSchedule.execute(
      values.business_id,
      id
    );
    if (!response) {
      toast.error("Ocurrio un error al asignar la empresa.");
      return;
    }
    findBusinessAuthorized();
    setOpenModal(false);
    setFieldValue("business_id", "");
  };

  const { errors, handleSubmit, handleChange, values, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      onSubmit: onSubmit,
      validationSchema: assignBusinessToScheduleValidation,
    });

  return (
    <div className="w-full md:w-11/12 ">
      <MainTitle text="Empresas autorizadas" />
      <SecondaryText text="Listado de empresas autorizadas para realizar el cronograma " />
      <SectionSeparator className="mb-4" />
      {authorizedBusiness.length > 0 ? (
        <>
          <div className="w-full grid grid-cols-2 gap-3 mt-8 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
            <div className="font-bold text-lg">NIT</div>
            <div className="font-bold text-lg">Nombre</div>
          </div>
          <div className="flex flex-col w-full rounded-b-lg">
            {authorizedBusiness.map(
              (item: BusinessAuthorizedType, index: number) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-2 gap-3 py-3 px-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
                >
                  <div className="font-bold text-lg">
                    {item.document_number}
                  </div>
                  <div className="font-bold text-lg">{item.name}</div>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full text-center">
          <div className="font-bold text-2xl">
            No se encontraron empresas autorizadas
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center justify-center mt-5">
        <div
          className="w-10 h-10 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
          onKeyUp={() => {}}
          onClick={() => setOpenModal(true)}
        >
          +
        </div>
      </div>
      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <div className="text-principal-100 font-bold text-3xl mb-5">
            Asignar empresa
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CustomSelectOne
              name="business_id"
              label="Empresa"
              placeholder="Seleccione una empresa"
              value={values.business_id}
              options={bussiness}
              onChange={handleChange}
              errors={
                errors.business_id ? (
                  <NeutralBlackText
                    text={errors.business_id}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <div className="flex flex-row justify-center items-center gap-4">
              <Button
                label="Cancelar"
                type="button"
                primary={false}
                secondaryClass="border-[1px] border-principal-500 bg-principal-500 text-principal-150 w-20 xl:w-32 ml-10"
                onClick={() => {
                  setOpenModal(false);
                  setFieldValue("business_id", "");
                }}
              />
              <Button
                label="Guardar"
                type="submit"
                className="w-20 xl:w-32 self-end"
                primary
              />
            </div>
          </form>
        </ModalWithChildren>
      )}
    </div>
  );
};
