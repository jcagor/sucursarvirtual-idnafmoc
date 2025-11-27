"use client";
import { MainTitle } from "@comfanditd/chronux-ui";
import GetReportUseCase from "domain/usecases/SelfManagement/getReportUseCase.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { initialAnalisysSelfManagement } from "lib";
import { useSession } from "next-auth/react";
import { SecondaryText } from "presentation/components/atoms";
import ChartComparative from "presentation/components/molecules/self-management-results/ChartComparative";
import TableAnswers from "presentation/components/molecules/self-management-results/TableAnswers";
import TableResults from "presentation/components/molecules/self-management-results/TableResults";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const Report: React.FC<CurrentFormProps> = ({ setCurrentForm }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [currentTableResults, setCurrentTableResults] = useState(
    initialAnalisysSelfManagement.ResultsByLine
  );
  const [previoustableResults, setPreviousTableResults] = useState(
    initialAnalisysSelfManagement.ResultsByLine
  );
  // const [currentTableAnswers, setCurrentTableAnswers] =
  //   useState(initialTableAnswers);
  // const [previousTableAnswers, setPreviousTableAnswers] =
  //   useState(initialTableAnswers);
  const [CurrentResultsByLine, setCurrentResultsByLine] = useState(
    initialAnalisysSelfManagement.ResultsByLine
  );
  const [PreviousResultsByLine, setPreviousResultsByLine] = useState(
    initialAnalisysSelfManagement.ResultsByLine
  );

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    const report = appContainer.get<GetReportUseCase>(
      USECASES_TYPES._GetReportSelfManagement
    );
    const response = await report.execute(session?.access_token);

    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener el analisis, intenta mas tarde",
          type: "error",
        })
      );
      return;
    }
    setCurrentTableResults(response.CurrentAnalysis.ResultsByLine);
    setPreviousTableResults(response.PreviousAnalysis.ResultsByLine);
    setCurrentResultsByLine(response.CurrentAnalysis.ResultsByLine);
    setPreviousResultsByLine(response.PreviousAnalysis.ResultsByLine);
  };

  const previousForm = () => {
    setCurrentForm(1);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle
        className="mb-6"
        text="Comparación de resultados de autodiagnóstico"
      />
      <SecondaryText text="A continuación se muestran los resultados de los dos últimos autodiagnósticos realizados." />

      <ChartComparative
        CurrentResultsByLine={CurrentResultsByLine}
        PreviousResultsByLine={PreviousResultsByLine}
        Title="Resultados por línea"
      />
      <div className="flex flex-row justify-between items-center mb-4">
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
      </div>
    </div>
  );
};
