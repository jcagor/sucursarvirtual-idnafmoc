"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { EmployeeType } from "domain/models";
import Image from "next/image";
import {
  Button,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { useState } from "react";

interface ConfirmEmployeesProps {
  selectedEmployees: EmployeeType[];
  nameCourseSchedule?: string;
  setCurrentForm: (page: number) => void;
}

export const ConfirmEmployees: React.FC<ConfirmEmployeesProps> = ({
  selectedEmployees,
  nameCourseSchedule,
  setCurrentForm,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const previousForm = () => {
    setCurrentForm(1);
  };

  const nextForm = () => {
    setOpenModal(false);
    setCurrentForm(3);
  };

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Listado de trabajadores" />
      <SecondaryText text="Selecciona entre 5 y 30 trabajadores activos para su asignación en los entrenamientos." />
      <SectionSeparator />
      <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-4 px-8">
        <div className="w-full grid grid-cols-4 gap-1 items-center justify-center text-center text-principal-350 rounded-t-lg py-3 border-b-[2px] border-principal-450/20">
          <div>Nombre del trabajador</div>
          <div>Numero de documento</div>
          <div>Observaciones</div>
          <div>Correo corporativo</div>
        </div>
        <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
          {selectedEmployees.map((employee) => (
            <div
              key={employee.document_number}
              className="w-full grid grid-cols-4 gap-1 items-center justify-center text-center text-principal-450 py-4"
            >
              <div>
                {employee.firstName +
                  " " +
                  employee.middleName +
                  " " +
                  employee.firstLastName}
              </div>
              <div>{employee.document_number}</div>
              <div>{employee.observations}</div>
              <div>{employee.email}</div>
            </div>
          ))}
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
          label="Siguiente"
          className="w-56 xl:w-72 self-end my-6"
          primary
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          className={`md:w-[600px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/utopia/icons/campaign-alert.png"
            alt="Close icon"
            width={80}
            height={80}
            className={`cursor-pointer`}
            priority
          />
          <ModalTitle
            text={`¿Estos son los trabajadores que deseas registrar en el entrenamiento ${nameCourseSchedule}?`}
            className="mt-2 w-5/6"
          />
          <div className="text-principal-450 text-center">
            ¿Los trabajadores seleccionados serán asignados al entrenamiento
            correspondiente. ¿Confirmas el registro para proceder con la
            asignación?
          </div>
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={nextForm}
              className="w-full"
              primary
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClose, children, className }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-30 `}
      onClick={onClose}
      onKeyDown={(e) => {}}
    >
      <div
        className={`bg-principal-150 p-6 rounded-lg shadow-lg w-96 ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {}}
      >
        {children}
      </div>
    </div>
  );
};
