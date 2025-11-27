import { ResultsByLine } from "domain/models";
import { colorsMaturityLevels } from "lib";
import React from "react";

interface Props {
  ResultsByLine: ResultsByLine[];
}

const TableResults: React.FC<Props> = ({ ResultsByLine }) => {
  return (
    <div className="w-full px-8 py-4 rounded-xl shadow-md bg-principal-150 text-center text-sm 2xl:text-base">
      <div className="grid grid-cols-5 2xl:grid-cols-4 items-center bg-gray-100 text-gray-600 font-semibold">
        <div className="text-left p-3">Línea de intervención</div>
        <div className="p-3">Resultado</div>
        <div className="p-3 col-span-2 2xl:col-span-1">Nivel de madurez</div>
        <div className="p-3  ">Oportunidades identificadas</div>
      </div>
      <div className="flex flex-col gap-3 w-full text-principal-450">
        {ResultsByLine.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 2xl:grid-cols-4 items-center py-2 bg-principal-200 text-gray-700  rounded-lg"
          >
            <div className="text-left p-3">{item.LineIntervention}</div>
            <div className="p-3">{`${item.Result}%`}</div>
            <div
              className={`m-2 p-2 col-span-2 2xl:col-span-1 rounded-lg text-principal-350 bg-opacity-75 ${
                colorsMaturityLevels.find(
                  (colorsMaturityLevel) =>
                    colorsMaturityLevel.Maturity === item.Maturity
                )?.backgroundColor
              }`}
            >
              <span>{item.Maturity}</span>
            </div>
            <div className="p-3">{item.NumberOpportunities}</div>
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-4 text-principal-330">
        Puedes ver los resultados de cada línea de intervención y el nivel de
        madurez alcanzado en cada una de ellas.
      </p>
    </div>
  );
};

export default TableResults;
