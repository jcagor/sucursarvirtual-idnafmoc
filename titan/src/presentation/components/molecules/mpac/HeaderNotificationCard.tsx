import Image from "next/image";
import { VariableBoldText } from "presentation/components/atoms/common/text/VariableBoldText";

export const HeaderNotificationCard = () => {
  return (
    <div className="header-image z-0 mb-[30px]">
      <div className="w-full header-sub bg-[#EBF0F8] rounded-lg">
        <div className="header-sub-text mt-[35px] ml-[70px] md:ml-[210px]">
          <VariableBoldText
            text={[
              "Se ha activado el",
              "portafolio de Fortalecimiento Profesional Comfandi",
              "",
            ]}
            className="font-light cf-text-principal-180 text-2xl"
          />
        </div>
      </div>
      <div className="header-sub-image w-24 md:w-64">
        <Image 
        src="/img/hola.png"
        alt="Hola"
        width={186}
        height={122}/>
      </div>
    </div>
  );
};
