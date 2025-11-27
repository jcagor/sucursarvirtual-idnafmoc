"use-client";

import { NeutralNCText, StepSection } from "presentation";
import { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { FormProps } from "./formProps";
import { RESUME_FORM_PAGE } from "lib";
import GetUserResumeFileUseCase from "domain/usecases/userData/userGetResumeFile.usecase";
import { ResumeInformation, ResumeServerResponse } from "domain/models";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import Image from "next/image";
import { toast } from "react-toastify";
import PdfLoader from "presentation/components/molecules/resume/pdf-loader";

export const ResultSteepResumeForm: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  siseResume,
  resumeData,
}) => {
  // FORM FUNCTIONS
  const { data: session } = useSession();
  //const [thisPageTrigger, setThisPageTrigger] = useState(false);
  const [pdfData, setPdfData] = useState<ArrayBuffer>();
  const FORM_CURRENT_STEEP = RESUME_FORM_PAGE.RESUME_RESULT;

  const buttonDownload = useRef<HTMLAnchorElement>(null);

  //setThisPageTrigger(true);

  const callBackEnd = async (resumeInformation: ResumeServerResponse) => {
    console.log("Resume: ", resumeInformation);
    try {
      const valuesFull: ResumeInformation = resumeInformation.information;
      const token = session?.access_token;

      const saveResumeFile = appContainer.get<GetUserResumeFileUseCase>(
        USECASES_TYPES._GetUserResumeFileUseCase
      );

      if (token) {
        const response = await saveResumeFile.execute(valuesFull, token);
        if (!response) {
          toast.error("¡Se ha producido un error al contactar el servidor!");
          return;
        }
        if (buttonDownload.current) {
          setPdfData(await response.arrayBuffer());

          buttonDownload.current.href = URL.createObjectURL(response);
          buttonDownload.current.download = `HojaDeVida_${new Date()
            .toJSON()
            .slice(0, 10)}.pdf`;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // FORM FUNCTIONS

  useEffect(() => {
    if (resumeData) {
      callBackEnd(resumeData);
    }
  }, [resumeData]);

  return (
    <div>
      <StepSection
        number={FORM_CURRENT_STEEP + 1} // El paso anterior contiene 2 secciones.
        descriptionStep="Perfil laboral"
        className=""
      />
      <NeutralNCText
        text="Descarga tu Hoja de Vida ahora y aumenta tus oportunidades de empleo."
        className="cf-text-principal-180 mb-[1rem] md:mb-9"
        fontSize="md"
      />
      <div className="block h-screen">
        <div className="w-full grid grid-cols-12 gap-2">
          <div className="block h-screen overflow-auto grid col-span-9">
            <PdfLoader pdfData={pdfData} />
          </div>

          <div className="block col-span-3">
            {" "}
            {/*sm:col-span-3*/}
            <a ref={buttonDownload}>
              <button className="p-3 shadow-md rounded-full bg-[#FFF] hover:scale-[102%] active:scale-100">
                <div className="flex">
                  <Image
                    src="/icons/pdf1.png"
                    alt="Archivo PDF"
                    width={81}
                    height={81}
                  />
                  <span className="mt-6 cf-text-principal-180 max-w-xs inline-block align-middle">
                    Descargar mi HV en PDF
                  </span>
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
