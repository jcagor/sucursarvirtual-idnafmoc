import { PsyTestCompetencyList, PsyTestDimensionList } from "lib";
import React from "react";

interface Props {
  data: ByCompetition;
  className?: string;
  minWidth?: number;
}

interface ByCompetition {
  [competency: string]: {
    percentage: number;
    dimensions: {
      [dimension: string]: {
        optimal: number;
        obtained: number;
        percentage: number;
      };
    };
  };
}

const CompetencyTable: React.FC<Props> = ({ data, className, minWidth }) => {
  // Lista de competencias (llaves del objeto)
  const competencies = Object.keys(data);

  return (
    <div
      className={`w-full px-8 py-4 rounded-xl shadow-md bg-principal-150 text-sm 2xl:text-base overflow-x-auto ${className}`}
    >
      <div
        className="relative flex flex-col h-full overflow-x-auto"
        style={{ minWidth: `${minWidth}px` }}
      >
        {/* Encabezados */}
        <div className="grid grid-cols-5 items-center text-center bg-gray-100 text-gray-600 font-semibold rounded-t-lg">
          <div className="p-3">COMPETENCIA</div>
          <div className="p-3">DIMENSIÓN</div>
          <div className="p-3">CALIFICACIÓN OBTENIDA</div>
          <div className="p-3">CALIFICACIÓN ÓPTIMA</div>
          <div className="p-3">PORCENTAJE</div>
        </div>

        {/* Filas */}
        <div className="grid grid-cols-5 w-full text-principal-450 border-b border-r  chi divide-y divide-x divide-principal-330/90">
          {competencies.map((competency) => {
            const comp = data[competency];
            const dimensionKeys = Object.keys(comp.dimensions);

            return (
              <>
                {/* Competencia: solo en la primera fila de cada bloque */}
                <div className="text-left p-3 font-semibold row-span-3 flex items-center first:border-t first:border-l">
                  {PsyTestCompetencyList[competency]?.Text || competency}
                </div>
                {dimensionKeys.map((dimension) => {
                  const dim = comp.dimensions[dimension];

                  return (
                    <>
                      {/* Dimensión */}
                      <div className="p-2">
                        {PsyTestDimensionList[dimension]?.Text || dimension}
                      </div>

                      {/* Calificaciones */}
                      <div className="p-2 text-center">{dim.obtained}</div>
                      <div className="p-2 text-center">{dim.optimal}</div>
                      <div className="p-2 text-center">{dim.percentage}%</div>
                    </>
                  );
                })}
              </>
            );
          })}
        </div>

        <p className="text-gray-500 text-sm mt-4 text-principal-330">
          Cada competencia muestra el detalle de sus dimensiones con las
          calificaciones obtenidas, óptimas y el porcentaje correspondiente.
        </p>
      </div>
    </div>
  );
};

export default CompetencyTable;
