"use client";

interface Props {
  data: ChartResultsItem[];
  title: string;
  description?: string;
  className?: string;
  minWidth?: number;
}

interface ChartResultsItem {
  Name: string;
  Result: number;
  Color: string;
}

const ChartResults: React.FC<Props> = (props: Props) => {
  const { data, title, description, className, minWidth } = props;
  return (
    <div
      className={`flex flex-col w-full h-full p-4 rounded-xl shadow-md bg-principal-150 min-h-[500px] overflow-x-auto ${className}`}
    >
      <div
        className="relative flex flex-col h-full overflow-x-auto"
        style={{ minWidth: `${minWidth}px` }}
      >
        <div className="p-5 font-semibold">{title}</div>
        <div className="relative  flex flex-col h-full">
          <div className="absolute top-0 left-0 w-full h-3/4 flex flex-col justify-around pointer-events-none px-4 pb-2 gap-y-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full border-t-2 border-dashed opacity-10"
              ></div>
            ))}
          </div>
          <div className="flex h-3/4 items-end justify-around px-4 pb-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex h-full flex-col items-center w-12 justify-end"
              >
                <div
                  className={`w-8 rounded-t-lg flex items-center justify-center relative bg-opacity-75`}
                  style={{
                    height: `${item.Result}%`,
                    background: `linear-gradient(${item.Color}ff 0%, ${item.Color}00 100%)`,
                  }}
                >
                  <span className="absolute -top-8 bg-principal-150 text-white text-xs px-2 py-1 rounded-md shadow-md">
                    {item.Result}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-1/4 items-center justify-around px-4">
            {data.map((item, index) => (
              <p key={`data-${index}`} className="text-xs mt-2 rotate-[-90deg] w-16">{item.Name}</p>
            ))}
          </div>
        </div>
        {description && (
          <p className="text-gray-500 text-center text-sm mt-2 text-principal-330">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChartResults;
export type { ChartResultsItem };
