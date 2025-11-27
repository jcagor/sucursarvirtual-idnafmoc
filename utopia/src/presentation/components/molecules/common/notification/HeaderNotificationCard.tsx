import Image from "next/image";
import { VariableBoldText } from "presentation/components/atoms";
import { FC } from "react";

interface customProps {
  startText: string;
  middleBoldText: string;
  endText: string;
}

export const HeaderNotificationCard: FC<customProps> = ({
  startText,
  middleBoldText,
  endText,
}) => {
  return (
    <div className="header-image z-0 mb-[30px]">
      <div className="w-full header-sub bg-[#EBF0F8] rounded-lg">
        <div className="header-sub-text">
          <VariableBoldText
            text={[startText, middleBoldText, endText]}
            className="font-light cf-text-principal-180 text-2xl"
          />
        </div>
      </div>
      <div className="header-sub-image">
        <Image src="/utopia/img/hola.png" alt="Hola" width={186} height={122} />
      </div>
    </div>
  );
};
