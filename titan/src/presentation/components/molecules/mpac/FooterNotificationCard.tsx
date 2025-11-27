"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "presentation/components/atoms";
import { VariableBoldText } from "presentation/components/atoms/common/text/VariableBoldText";

export const FooterNotificationCard = () => {
  return (
    <div className="footer-image z-0 mb-[30px] h-[187px] descriptionMenuCardShadow">
      <div className="w-full footer-sub bg-[#FFFFFF] rounded-lg h-[165px] mt-[22px]">
        <div className="footer-sub-text mt-[35px] ml-[50px] md:ml-[250px] mt-[50px]">
          <VariableBoldText
            text={[
              "",
              "Identificamos que puedes aplicar al subsidio de desempleo,",
              "Conoce los pasos para tu postulación al subsidio aquí.",
            ]}
            className="font-light cf-text-principal-180 text-2xl"
          />
          <Link href="/calisto/menu/EmployabilityRouteMenu" target="_self">
            <Button
              primary
              className="font-outfit w-full font-small md:w-[18rem] font-medium mt-4"
              label="Ir a subsidio de desempleo"
            />
          </Link>
        </div>
      </div>
      <div className="footer-sub-image w-24 md:w-64">
        <Image 
          src="/img/pointing-girl.png"
          alt="imagen al pie"
          width={238}
          height={187}
          />
      </div>
    </div>
  );
};
