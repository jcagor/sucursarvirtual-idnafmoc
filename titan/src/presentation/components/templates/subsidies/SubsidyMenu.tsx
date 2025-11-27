"use client";
import { InfoSection } from "@comfanditd/chronux-ui";
import {
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  LinkCardInterface,
  subsidyMenuItems,
} from "lib";
import Image from "next/image";
import Link from "next/link";
import { ZoneCard } from "presentation";
import { useAppSelector } from "presentation/store";
import React, { useEffect } from "react";
import { DIGITAL_IDENTITY_FF } from "lib/config/flags";

export const SubsidyMenu = () => {
  const status = useAppSelector((state) => state.digitalIdentity.status);

  const statusComplete = DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE;

  useEffect(() => {
    if (DIGITAL_IDENTITY_FF) {
      if (status != statusComplete) {
        window.location.href = "/";
      }
    }
  }, [status]);
  return (
    <div>
      <InfoSection
        image={Image}
        topText="Subsidios"
        description="Con un subsidio abrimos una puerta de acceso a oportunidades que permiten ampliar las posibilidades y capacidades
            para la armonía de nuestras familias, contribuyendo a aliviar sus cargas económicas y a materializar las metas del
            hoy y acercar las del mañana."
        aditionalDescription="¿Qué necesitas hacer hoy?"
        classNameAditional="mb-[2rem] md:mb-[1.5rem] md:mt-16"
        link={Link}
      />

      <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {subsidyMenuItems.map((subsidy: LinkCardInterface) => {
          return (
            <ZoneCard
              key={subsidy.href}
              name={subsidy.name}
              href={subsidy.href}
              urlImage={subsidy.urlImage}
              width={subsidy.width}
              height={subsidy.height}
              imageClassname={subsidy.imageClassname}
              ellipseUrl={subsidy.ellipseUrl}
              ellipseClassname={subsidy.ellipseClassname}
              betaAccess={subsidy.betaAccess}
              subsidies2Fa
            />
          );
        })}
      </div>
    </div>
  );
};
