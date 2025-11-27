import { ResultsByLine } from "domain/models/analisysSelfManagemenType";
import { colorsMaturityLevels } from "lib";

interface Props {
  CurrentResultsByLine: ResultsByLine[];
  PreviousResultsByLine: ResultsByLine[];
  Title: string;
}

const ChartComparative: React.FC<Props> = ({
  CurrentResultsByLine,
  PreviousResultsByLine,
  Title,
}) => {
  return (
    <div className="w-full h-3/5 min-h-[500px] p-4 rounded-xl shadow-md bg-principal-150">
      <div className="p-5 font-semibold">{Title}</div>
      <div className="relative  flex flex-col h-full">
        <div className="absolute top-0 left-0 w-full h-2/3 flex flex-col justify-between pointer-events-none px-4 pb-2 gap-y-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full border-t-2 border-dashed opacity-10"
            ></div>
          ))}
        </div>
        <div className="flex h-2/3 items-end justify-between px-4 pb-2">
          {CurrentResultsByLine.map((item, index) => {
            const previous = PreviousResultsByLine.find(
              (prev) => prev.LineIntervention === item.LineIntervention
            );

            return (
              <div
                key={index}
                className="flex h-full flex-row gap-5 items-end w-28 justify-center"
              >
                {previous && (
                  <div
                    className={`w-10 rounded-t-lg flex items-center justify-center relative bg-opacity-75 ${
                      colorsMaturityLevels.find(
                        (colorsMaturityLevel) =>
                          colorsMaturityLevel.Maturity === item.Maturity
                      )?.linearGradiente
                    }`}
                    style={{
                      height: `${previous.Result}%`,
                    }}
                  >
                    <span className="absolute -top-8 bg-principal-150 text-white text-xs px-2 py-1 rounded-md shadow-md">
                      {previous.Result}%
                    </span>
                  </div>
                )}
                <div
                  className={`w-10 rounded-t-lg flex items-center justify-center relative bg-opacity-75 ${
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
            );
          })}
        </div>
        <div className="flex h-1/4 items-center justify-between px-4">
          {CurrentResultsByLine.map((item, index) => (
            <div key={index} className="flex flex-col h-full justify-between">
              <div className="flex flex-row gap-5 justify-center  text-xs text-center w-28 h-1/3">
                <span>Mes 1</span>
                <span>Mes 2</span>
              </div>
              <div className="font-semibold text-center w-28 h-2/3 text-principal-320">
                {item.LineIntervention}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartComparative;
