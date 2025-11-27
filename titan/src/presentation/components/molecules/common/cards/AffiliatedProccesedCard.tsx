import { Description, SecondaryText } from "presentation/components/atoms";
import { type FC } from "react";

interface AffiliatedProccesedCardProps {
  proccesedQuantity: number;
  exitQuantity: number;
  failedQuantity: number;
}

const AffiliatedProccesedCard: FC<AffiliatedProccesedCardProps> = ({
  proccesedQuantity,
  exitQuantity,
  failedQuantity,
}) => (
  <div
    className={`flex flex-col w-[65%] w-min-[calc(400px)] h-full bg-principal-150 rounded-xl py-3 shadow-md `}
  >
    <div className="w-full">
      <SecondaryText
        className="font-outfit text-xl font-semibold text-principal-180 text-center"
        text="Resumen de tu solicitud:"
      />
    </div>
    <div className="flex flex-wrap h-full self-center flex-row w-full items-center justify-around mt-2 px-6">
      <div className="flex flex-wrap w-[calc(120px)] flex-col">
        <SecondaryText
          className="font-outfit text-xl font-semibold text-principal-180 text-center"
          text={proccesedQuantity.toString()}
        />
        <Description
          className="text-xs text-center font-light text-principal-180 text-clip-2"
          text="No. de procesados"
        />
      </div>
      <div className="h-[calc(70px)] bg-principal-180 w-[2px]"></div>
      <div className="flex flex-wrap w-[calc(120px)] flex-col">
        <SecondaryText
          className="font-outfit text-xl font-semibold text-principal-180 text-center"
          text={exitQuantity.toString()}
        />
        <Description
          className="text-xs text-center font-light text-principal-180 text-clip-2"
          text="Procesados sin error"
        />
      </div>
      <div className="h-[calc(70px)] bg-principal-180 w-[2px]"></div>
      <div className="flex flex-wrap w-[calc(120px)] flex-col">
        <SecondaryText
          className="font-outfit text-xl font-semibold text-principal-180 text-center"
          text={failedQuantity.toString()}
        />
        <Description
          className="text-xs text-center font-light text-principal-180 text-clip-2"
          text="Procesados con error"
        />
      </div>
    </div>
  </div>
);

export { AffiliatedProccesedCard };
export type { AffiliatedProccesedCardProps };
