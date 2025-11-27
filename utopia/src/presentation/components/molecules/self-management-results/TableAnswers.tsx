import { AnswerByLine } from "domain/models/analisysSelfManagemenType";
import { colorsMaturityLevels } from "lib/config/constants";
import React from "react";

interface Props {
  AnswersByLine: AnswerByLine[];
}

const TableAnswers: React.FC<Props> = ({ AnswersByLine }) => {
  return (
    <div className="w-full bg-white px-8 py-4 rounded-xl shadow-md text-center bg-principal-150">
      <div className="grid grid-cols-6 items-center bg-gray-100 text-gray-600 font-semibold py-3 rounded-t-lg">
        <div className="text-left px-3">Línea de intervención</div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-3">
            Pregunta {i + 1}
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full text-gray-700">
        {AnswersByLine.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-6 items-center py-2 border-t border-principal-50"
          >
            <div className="text-left py-2 px-3">{item.LineIntervention}</div>
            {item.Answers.map((answer, colIndex) => (
              <div key={colIndex} className="flex justify-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    colorsMaturityLevels.find(
                      (colorsMaturityLevel) =>
                        colorsMaturityLevel.Maturity === answer
                    )?.backgroundColor
                  }`}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableAnswers;
