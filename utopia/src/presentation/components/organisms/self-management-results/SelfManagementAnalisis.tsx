"use client";
import { MainTitle } from "@comfanditd/chronux-ui";
import GetAnalisysUseCase from "domain/usecases/SelfManagement/getAnalisys.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { colorsMaturityLevels, initialAnalisysSelfManagement } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, ModalWithChildren } from "presentation";
import CardReport from "presentation/components/molecules/self-management-results/CardReport";
import CardResults from "presentation/components/molecules/self-management-results/CardResults";
import ChartResults from "presentation/components/molecules/self-management-results/ChartResults";
import TableAnswers from "presentation/components/molecules/self-management-results/TableAnswers";
import TableResults from "presentation/components/molecules/self-management-results/TableResults";
import { useEffect, useRef, useState } from "react";
import SelfManagementAnalisisPDF from "./SelfManagementAnalisisPDF";
import { AnalisysSelfManagemenType } from "domain/models/analisysSelfManagemenType";
import { generatePDF } from "presentation/components/atoms/common/PDF/generatePDF";
import { useDispatch } from "react-redux";

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const SelfManagementAnalisis: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorModal, setErrorModal] = useState(false);
  const [AnalisysSelfManagemen, setAnalisysSelfManagemen] =
    useState<AnalisysSelfManagemenType>(initialAnalisysSelfManagement);
  const [reportAvailable, setReportAvailable] = useState(false);
  const elemento = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAnalysis();
  }, []);

  const getAnalysis = async () => {
    const getAnalysis = appContainer.get<GetAnalisysUseCase>(
      USECASES_TYPES._GetAnalisysSelfManagement
    );
    const response = await getAnalysis.execute(session?.access_token);

    if (!response) {
      setErrorModal(true);
      return;
    }

    setAnalisysSelfManagemen(response);
    setReportAvailable(response.ReportAvailable ?? false);
  };

  const handleExport = async () => {
    await generatePDF({
      TemplatePDF: SelfManagementAnalisisPDF,
      propsTemplatePDF: { AnalisysSelfManagemen },
      namePDF: "Autodiagnóstico.pdf",
      showLoadingModal: true,
      dispatch: dispatch,
    });
  };

  return (
    <>
      <div ref={elemento} className="flex flex-col gap-4 w-full h-full pr-6">
        <div className="flex justify-between items-center">
          <MainTitle className="mb-6" text="Análisis autodiagnóstico" />
          <Button label="Descargar reporte" onClick={handleExport} primary />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CardResults
            Title="Resultado general"
            Text={`${AnalisysSelfManagemen.GeneralResult.Result.toFixed(1)}%`}
            ClassName="bg-[#E3EEFF]"
            Icon="/utopia/icons/notebook-icon.svg"
            IconWidth={14}
            IconHeight={19}
          />
          <CardResults
            Title="Nivel"
            Text={AnalisysSelfManagemen?.GeneralResult.Maturity}
            ClassName={`bg-principal-150 border border-solid ${
              colorsMaturityLevels.find(
                (colorsMaturityLevel) =>
                  colorsMaturityLevel.Maturity ===
                  AnalisysSelfManagemen.GeneralResult.Maturity
              )?.border
            }`}
            Icon="/utopia/icons/notes-icon.svg"
            IconWidth={24}
            IconHeight={24}
          />
          <CardResults
            Title="Oportunidades indentificadas"
            Text={
              AnalisysSelfManagemen.GeneralResult.NumberOpportunities?.toString() ??
              "0"
            }
            ClassName="bg-principal-150"
            Icon="/utopia/icons/lightbulb-icon.svg"
            IconWidth={19}
            IconHeight={20}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TableResults ResultsByLine={AnalisysSelfManagemen.ResultsByLine} />
          <ChartResults
            ResultsByLine={AnalisysSelfManagemen.ResultsByLine}
            Title="Resultados por línea de intervención"
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <TableAnswers AnswersByLine={AnalisysSelfManagemen.AnswersByLine} />
        </div>
        {/* <div className="grid grid-cols-3 gap-4">
          <CardReport
            Title="Informes"
            Text="Comprende a fondo las capacidades de su organización y las oportunidades para implementar tus resultados."
            Icon="/utopia/icons/report-icon.png"
            ReportAvailable={reportAvailable}
            onClickReport={() => setCurrentForm(3)}
          />
        </div>
        <Button
          type="submit"
          label="Siguiente"
          className="w-56 xl:w-72 py-4 self-end my-6"
          onClick={() => setCurrentForm(2)}
          primary
        /> */}
      </div>
      {errorModal && (
        <ModalWithChildren
          onClose={() => router.push("/self-management")}
          className="w-96 flex flex-col items-center"
        >
          <Image
            src="/utopia/icons/hello_full.png"
            alt="Close icon"
            width={90}
            height={90}
          />
          <p className="text-principal-180 text-center my-4">
            No puede acceder al analisis de autogestión, diligencie el
            formulario antes de continuar.
          </p>
          <Button
            label="Continuar"
            onClick={() => {
              router.push("/self-management");
            }}
            className="w-full"
            primary
          />
        </ModalWithChildren>
      )}
    </>
  );
};
