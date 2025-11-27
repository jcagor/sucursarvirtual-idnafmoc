"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { UnvalidatedBusinessType } from "domain/models/UnvalidatedBusiness/UnvalidatedBusinessType";
import FindUnvalidatedBusinessUseCase from "domain/usecases/UnvalidatedBusiness/FindUnvalidatedBusiness";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import Link from "next/link";
import {
  Button,
  ModalWithChildren,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaFileDownload } from "react-icons/fa";
import Image from "next/image";
import GetRejectedBusinessExcelReportUseCase from "domain/usecases/Business/GetRejectedBusinessExcelReport";

export const UnvalidatedBusinessList = () => {
  const [UnvalidatedBusiness, setUnvalidatedBusiness] = useState<
    UnvalidatedBusinessType[]
  >([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonDownload = useRef<HTMLAnchorElement>(null);

  const findUnvalidatedBusiness = async () => {
    const findAll = appContainer.get<FindUnvalidatedBusinessUseCase>(
      USECASES_TYPES._FindUnvalidatedBusiness
    );
    const response = await findAll.execute();

    if (!response) {
      toast.error("No se pudieron cargar las empresas.");
      return;
    }

    setUnvalidatedBusiness(response);
  };

  const downloadReport = async () => {
    try {
      const reportFileCase =
        appContainer.get<GetRejectedBusinessExcelReportUseCase>(
          USECASES_TYPES._GetRejectedBusinessExcelReportUseCase
        );

      const data = {};
      setIsLoading(true);
      setOpenModal(true);
      const response = await reportFileCase.execute(data);

      if (!response) {
        return;
      } else if (
        typeof response == "object" &&
        response != null &&
        "error" in response &&
        "message" in response
      ) {
        setModalMessage(`Error: ${response.message}`);
        setIsLoading(false);
      } else if (buttonDownload.current && "size" in response) {
        buttonDownload.current.href = URL.createObjectURL(response);
        buttonDownload.current.download = `Empresas_Rechazadas_${new Date()
          .toJSON()
          .slice(0, 10)}.xlsx`;
        buttonDownload.current?.click();
        setOpenModal(false);
      } else {
        toast.error("No se pudieron leer los registros.");
        console.error("invalid response:", response);
        setOpenModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("No se pudieron leer los registros.");
      console.error(error);
      setOpenModal(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUnvalidatedBusiness();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Lista de empresas a subsanar" />
      <SecondaryText text="Empresas que presentaron errores en el proceso de validación" />
      <div className="flex justify-end w-full mr-5">
        <div>
          <div>
            <a ref={buttonDownload}></a>
            <button
              onClick={(e) => {
                downloadReport();
              }}
              onKeyUp={() => {}}
              className="success m-3 rounded-lg bg-principal-180 text-principal-150 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <span className="flex">
                Descargar reporte en Excel{" "}
                <FaFileDownload className="mx-2 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <SectionSeparator />
      <div className="w-full grid grid-cols-5 gap-3 mt-8 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
        <div className="font-bold text-lg">NIT</div>
        <div className="font-bold text-lg">Fecha de validación</div>
        <div className="font-bold text-lg col-span-3">Errores</div>
      </div>
      <div className="flex flex-col w-full rounded-b-lg">
        {UnvalidatedBusiness.length > 0
          ? UnvalidatedBusiness.map((item, index) => (
              <div
                key={index}
                className="w-full grid grid-cols-5 gap-3 py-3 px-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
              >
                <div className="text-lg">{item.document_number}</div>
                <div className="text-lg">
                  {new Date(item.updatedAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </div>
                <ul className="list-disc list-inside text-left text-lg col-span-3">
                  {item.reason.length > 0
                    ? item.reason.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))
                    : "Sin errores"}
                </ul>
              </div>
            ))
          : null}
      </div>

      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`md:w-[480px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
              <div className="text-principal-180 mt-2">
                Generando documento de informe en Excel, por favor espera.
              </div>
            </>
          ) : modalMessage != "" ? (
            <>
              <Image
                src="/lalande/icons/fail.webp"
                alt="Info Icon"
                width={80}
                height={80}
                priority
              />
              <h4 className="font-outfit text-[1rem] text-center w-[60%] font-semibold mb-2 pt-6 text-principal-180 mt-2">
                {modalMessage}
              </h4>
              <div className="flex flex-col w-[70%] space-y-3 py-2">
                <Button
                  label="Aceptar"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  className="w-full"
                  primary
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </ModalWithChildren>
      )}
    </div>
  );
};
