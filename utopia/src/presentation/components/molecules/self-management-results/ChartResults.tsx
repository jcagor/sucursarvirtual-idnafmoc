"use client";

import { ResultsByLine } from "domain/models/analisysSelfManagemenType";
import { colorsMaturityLevels } from "lib/config/constants";

interface Props {
  ResultsByLine: ResultsByLine[];
  Title: string;
}

const ChartResults: React.FC<Props> = ({ ResultsByLine, Title }) => {
  return (
    <div className="flex flex-col w-full h-full p-4 rounded-xl shadow-md bg-principal-150 min-h-[600px]">
      <div className="p-5 font-semibold">{Title}</div>
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
        <div className="flex h-1/4 items-center justify-between px-4">
          {ResultsByLine.map((item, index) => (
            <p className="text-xs mt-2 rotate-[-90deg] w-16">
              {item.LineIntervention}
            </p>
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-center text-sm mt-2 text-principal-330">
        Puedes comparar los resultados de las diferentes líneas de intervención.
      </p>
    </div>
  );
};

export default ChartResults;
