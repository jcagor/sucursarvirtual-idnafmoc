"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { ConsultantType } from "domain/models/Business/ConsultantType";
import AssignConsultantToBusinessUseCase from "domain/usecases/Business/AssignConsultantToBussines.use.case";
import FindConsultantsAssignedToBusinessUseCase from "domain/usecases/Business/FindConsultantsAssignedToBusiness.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { useFormik } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { assignConsultantToBusinessValidation, SelectOption } from "lib";
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

interface PageProps {
  id: string;
}

export const AssignConsultantToBusiness: React.FC<PageProps> = ({ id }) => {
  const [consultantsAssigned, setconsultantsAssigned] = useState<
    ConsultantType[]
  >([]);
  const [consultants, setConsultants] = useState<SelectOption[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    findConsultantsAssignedToBusiness();
    findAllConsultants();
  }, []);

  const findConsultantsAssignedToBusiness = async () => {
    const findAll = appContainer.get<FindConsultantsAssignedToBusinessUseCase>(
      USECASES_TYPES._FindConsultantsAssignedToBusiness
    );
    const response = await findAll.execute(id);

    if (!response) {
      toast.error("No se pudieron cargar los consultores.");
      return;
    }

    setconsultantsAssigned(response);
  };

  const findAllConsultants = async () => {
    const getOptionsBusiness = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "CONSULTANTS_LIST";
    const response = await getOptionsBusiness.execute(
      SelectOptionName,
      session?.access_token
    );

    if (!response) {
      toast.error("No se pudieron cargar los consultores.");
      return;
    }

    setConsultants(response);
  };

  const onSubmit = async (values: { consultant_id: string }) => {
    const assign = appContainer.get<AssignConsultantToBusinessUseCase>(
      USECASES_TYPES._AssignConsultantToBusiness
    );
    const response = await assign.execute(id, values.consultant_id);
    if (!response) {
      toast.error("No se pudo asignar el consultor.");
      return;
    }
    toast.success("¡Consultor asignado correctamente!");
    findConsultantsAssignedToBusiness();
    setOpenModal(false);
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    touched,
    handleBlur,
    submitCount,
  } = useFormik({
    initialValues: {
      consultant_id: "",
    },
    onSubmit: onSubmit,
    validationSchema: assignConsultantToBusinessValidation,
  });

  return (
    <div className="w-full md:w-11/12">
      <div className="flex justify-between items-center mb-2">
        <div>
          <MainTitle text="Lista de empresas" />
          <SecondaryText text="Listado de empresas a las que puden asignar consultores" />
        </div>
        <Button
          label="Asignar consultor"
          className="w-80"
          primary
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <SectionSeparator />

      <div className="flex flex-col w-full rounded-b-lg">
        {consultantsAssigned.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-2 gap-3 mt-8 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
              <div className="font-bold text-lg">Nombre</div>
              <div className="font-bold text-lg">Numero de documento</div>
            </div>
            {consultantsAssigned.map((item) => (
              <div
                key={item.id}
                className="w-full grid grid-cols-2 gap-3 py-3 px-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
              >
                <div className="text-lg">{item.name}</div>
                <div className="text-lg">{item.identification_number}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full py-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10">
            <div className="text-lg font-bold">
              No se encontraron consultores asignados a la empresa.
            </div>
          </div>
        )}
      </div>
      {openModal && (
        <ModalWithChildren onClose={() => setOpenModal(false)}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center rounded-lg my-3 px-3"
          >
            <span className="font-bold text-2xl text-principal-180">
              Asignar consultor
            </span>
            <SectionSeparator className="w-full my-2" />
            <CustomSelectOne
              name="consultant_id"
              label="Consultor"
              options={consultants}
              value={values.consultant_id}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.consultant_id || submitCount > 0) &&
                errors.consultant_id ? (
                  <NeutralBlackText
                    text={errors.consultant_id}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <div className=" w-full flex flex-row justify-between items-center gap-4 mt-4">
              <Button
                label="Cancelar"
                type="button"
                primary={false}
                secondaryClass="border-[1px] border-principal-500 bg-principal-500 text-principal-150 w-20 xl:w-32"
                onClick={() => {
                  setOpenModal(false);
                  values.consultant_id = "";
                }}
              />
              <Button
                label="Guardar"
                type="submit"
                className="w-20 xl:w-32"
                primary
              />
            </div>
          </form>
        </ModalWithChildren>
      )}
    </div>
  );
};
