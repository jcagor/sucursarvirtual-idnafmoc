"use client";
import { AnalisysSelfManagemenType } from "domain/models";
import { colorsMaturityLevels } from "lib/config/constants";
import Image from "next/image";
import React from "react";

interface Props {
  AnalisysSelfManagemen: AnalisysSelfManagemenType;
}

const SelfManagementAnalisisPDF: React.FC<Props> = ({
  AnalisysSelfManagemen,
}) => {
  return (
    <div className="flex flex-col w-full gap-5 pt-5 px-4 bg-principal-680">
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
          Text={AnalisysSelfManagemen.GeneralResult.Maturity}
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
      <div className="grid grid-cols-2 gap-4">
        <TableResults ResultsByLine={AnalisysSelfManagemen.ResultsByLine} />
        <ChartResults
          ResultsByLine={AnalisysSelfManagemen.ResultsByLine}
          Title="Resultados por línea de intervención"
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <TableAnswers AnswersByLine={AnalisysSelfManagemen.AnswersByLine} />
      </div>
    </div>
  );
};

interface CardResultsProps {
  Title: string;
  Text: string;
  ClassName?: string;
  Icon: string;
  IconWidth: number;
  IconHeight: number;
}

const CardResults: React.FC<CardResultsProps> = ({
  Title,
  Text,
  ClassName,
  Icon,
  IconWidth,
  IconHeight,
}) => {
  return (
    <div
      className={`flex flex-col justify-center w-full py-2 px-4 pb-2 rounded-xl shadow-md text-xs ${ClassName}`}
    >
      <div className="flex flex-row justify-between">
        <p className="flex items-start text-principal-450">{Title}</p>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-principal-150">
          <Image
            src={Icon}
            alt="Image business profile"
            width={IconWidth}
            height={IconHeight}
            className="text-blue-500"
          />
        </div>
      </div>
      <div className="text-xl items-start font-bold text-principal-450">
        {Text}
      </div>
    </div>
  );
};

interface TableResultsProps {
  ResultsByLine: {
    LineIntervention: string;
    Result: number;
    Maturity: string;
    NumberOpportunities: number;
  }[];
}

const TableResults: React.FC<TableResultsProps> = ({ ResultsByLine }) => {
  return (
    <div className="flex flex-col w-full px-2 py-4 rounded-xl shadow-md bg-principal-150 text-center text-xs">
      <div className="grid grid-cols-5 gap-1 pl-2 items-center font-semibold h-12">
        <div className="text-left">Línea de intervención</div>
        <div className="">Resultado</div>
        <div className="col-span-2">Nivel de madurez</div>
        <div className="-mx-6">Oportunidades identificadas</div>
      </div>
      <div className="flex flex-col gap-2  w-full text-principal-450">
        {ResultsByLine.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-1 items-center py-2 pl-2 bg-principal-200 text-gray-700  rounded-lg"
          >
            <div className="text-left items-center">
              {item.LineIntervention}
            </div>
            <div className=" items-center">{`${item.Result}%`}</div>
            <div
              className={`flex h-full px-2 py-1 items-center justify-center col-span-2 rounded-lg text-principal-350 bg-opacity-75 ${
                colorsMaturityLevels.find(
                  (colorsMaturityLevel) =>
                    colorsMaturityLevel.Maturity === item.Maturity
                )?.backgroundColor
              }`}
            >
              <span className="h-full items-center">{item.Maturity}</span>
            </div>
            <div className="p-3  items-center">{item.NumberOpportunities}</div>
          </div>
        ))}
      </div>
      <p className="text-sm mt-2 text-principal-330">
        Puedes ver los resultados de cada línea de intervención y el nivel de
        madurez alcanzado en cada una de ellas.
      </p>
    </div>
  );
};

interface ChartResultsProps {
  ResultsByLine: {
    LineIntervention: string;
    Result: number;
    Maturity: string;
    NumberOpportunities: number;
  }[];
  Title: string;
}

const ChartResults: React.FC<ChartResultsProps> = ({
  ResultsByLine,
  Title,
}) => {
  return (
    <div className="flex flex-col w-full h-full px-2 py-4 rounded-xl shadow-md bg-principal-150 min-h-[500px] text-xs">
      <div className="pb-10 text-balance font-semibold">{Title}</div>
      <div className="relative  flex flex-col h-full">
        <div className="absolute top-0 left-0 w-full h-3/4 flex flex-col justify-between pointer-events-none px-4 pb-2 gap-y-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full border-t-2 border-dashed opacity-10"
            ></div>
          ))}
        </div>
        <div className="flex h-3/4 items-end justify-between px-4 pb-2">
          {ResultsByLine.map((item, index) => (
            <div
              key={index}
              className="flex h-full flex-col items-center w-12 justify-end"
            >
              <div
                className={`w-8 rounded-t-lg flex items-center justify-center relative bg-opacity-75 ${
                  colorsMaturityLevels.find(
                    (colorsMaturityLevel) =>
                      colorsMaturityLevel.Maturity === item.Maturity
                  )?.linearGradiente
                }`}
                style={{
                  height: `${item.Result}%`,
                }}
              >
                <span className="absolute -top-8 bg-principal-150 text-white text-xs px-2 py-1 rounded-md shadow-md">
                  {item.Result}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between h-1/4 w-[356px] px-4">
          {ResultsByLine.map((item, index) => (
            <div key={index} className="flex flex-col justify-center w-12">
              <p className="text-xs" style={{ transform: "rotate(-90deg)" }}>
                {item.LineIntervention}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm mt-2 text-principal-330">
        Puedes comparar los resultados de las diferentes líneas de intervención.
      </p>
    </div>
  );
};

interface TableAnswersProps {
  AnswersByLine: {
    LineIntervention: string;
    Answers: string[];
  }[];
}

const TableAnswers: React.FC<TableAnswersProps> = ({ AnswersByLine }) => {
  return (
    <div className="w-full bg-white text-xs px-6 py-2 rounded-xl shadow-md text-center bg-principal-150">
      <div className="grid grid-cols-7 items-center bg-gray-100 text-gray-600 font-semibold py-3 rounded-t-lg">
        <div className="col-span-2 h-full items-center text-left px-3">
          Línea de intervención
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-3 h-full items-center">
            Pregunta {i + 1}
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full">
        {AnswersByLine.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-7 h-full items-center py-2 border-t border-principal-50"
          >
            <div className="col-span-2 h-full items-center text-left py-2 px-1 text-principal-450">
              {item.LineIntervention}
            </div>
            {item.Answers.map((answer, colIndex) => (
              <div key={colIndex} className="h-full items-center">
                <div
                  className={`h-full items-center w-24 py-2 rounded-lg ${
                    colorsMaturityLevels.find(
                      (colorsMaturityLevel) =>
                        colorsMaturityLevel.Maturity === answer
                    )?.backgroundColor
                  }`}
                >
                  <div className="items-start h-[28px] text-xs leading-none">
                    {answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfManagementAnalisisPDF;
