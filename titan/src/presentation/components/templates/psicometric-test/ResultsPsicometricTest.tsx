"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import {
  CompetitionType,
  DimensionType,
  PsyTestResultType,
} from "domain/models/PsyTestResultsType";
import FindPsyTestResultsUseCase from "domain/usecases/psicometric-test/findPsyTestResults";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  PsyTestCompetencyKey,
  PsyTestCompetencyList,
  PsyTestDimensionKey,
  PsyTestDimensionList,
} from "lib";
import { addAlert } from "presentation/store/alert/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChartResults, { ChartResultsItem } from "./ChartResults";
import CompetencyTable from "./CompetencyTable";

export const ResultsPsicometricTest = () => {
  const [results, setResults] = useState<PsyTestResultType>();
  const [charCompetency, setCharCompetency] = useState<ChartResultsItem[]>();
  const [charDimension, setCharDimension] = useState<ChartResultsItem[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const findPsyTestResults = appContainer.get<FindPsyTestResultsUseCase>(
      USECASES_TYPES._FindPsyTestResultsUseCase
    );
    const response = await findPsyTestResults.execute();
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al obtener los resultados de los examenes psicometricos, por favor intente mas tarde.",
          type: "error",
        })
      );
      return;
    }
    setResults(response);
    transformCharCompetency(response.by_competition);
    transformCharDimension(response.by_dimension);
  };

  const transformCharCompetency = (
    by_competition: Record<PsyTestCompetencyKey, CompetitionType>
  ) => {
    const chartData = Object.entries(by_competition).map(
      ([key, value], index) => ({
        Name:
          PsyTestCompetencyList[key as keyof typeof PsyTestCompetencyList]
            ?.Text || key,
        Result: value.percentage,
        Color:
          PsyTestCompetencyList[key as keyof typeof PsyTestCompetencyList]
            ?.Color || key,
      })
    );
    setCharCompetency(chartData);
  };

  const transformCharDimension = (
    by_dimension: Record<PsyTestDimensionKey, number>
  ) => {
    const chartData = Object.entries(by_dimension).map(
      ([key, value], index) => ({
        Name:
          PsyTestDimensionList[key as keyof typeof PsyTestDimensionList]
            ?.Text || key,
        Result: value,
        Color:
          PsyTestDimensionList[key as keyof typeof PsyTestDimensionList]
            ?.Color || key,
      })
    );
    setCharDimension(chartData);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle className="mb-6" text="Resultados test psicométrico" />
      {results && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {charCompetency && (
            <ChartResults
              data={charCompetency}
              title="Resultados por competencia"
              description="Grafica que muestra el porcentaje de aciertos por cada competencia"
              className="xl:col-span-2"
              minWidth={620}
            />
          )}
          {charDimension && (
            <ChartResults
              data={charDimension}
              title="Resultados por dimension"
              description="Grafica que muestra el porcentaje de aciertos por cada dimension"
            />
          )}
          <CompetencyTable
            data={results.by_competition}
            className="xl:col-span-3"
            minWidth={550}
          />
        </div>
      )}
    </div>
  );
};
