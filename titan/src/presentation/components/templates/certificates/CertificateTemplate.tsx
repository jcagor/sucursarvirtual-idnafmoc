"use client";
import { InfoSection } from "@comfanditd/chronux-ui";
import { certificatesMenuItems, LinkCardInterface } from "lib";
import Image from "next/image";
import Link from "next/link";
import { ZoneCard } from "presentation";
import React from "react";

export const CertificateMenu = () => {
  //   const status = useAppSelector((state) => state.digitalIdentity.status);

  //   const statusComplete = DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE;

  //   useEffect(() => {
  //     if (DIGITAL_IDENTITY_FF) {
  //       if (status != statusComplete) {
  //         window.location.href = "/";
  //       }
  //     }
  //   }, [status]);
  return (
    <div>
      <InfoSection
        image={Image}
        topText="Certificados"
        description="Conoce la manera más fácil y práctica para acceder a los certificados de nuestra Caja de Compensación Familiar para tus subsidios, productos y servicios."
        aditionalDescription="¿Qué necesitas hacer hoy?"
        classNameAditional="mb-[2rem] md:mb-[1.5rem] md:mt-16"
        link={Link}
      />

      <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {certificatesMenuItems.map((certificate: LinkCardInterface) => {
          return (
            <ZoneCard
              key={certificate.href}
              name={certificate.name}
              href={certificate.href}
              urlImage={certificate.urlImage}
              width={certificate.width}
              height={certificate.height}
              imageClassname={certificate.imageClassname}
              ellipseUrl={certificate.ellipseUrl}
              ellipseClassname={certificate.ellipseClassname}
              betaAccess={certificate.betaAccess}
            />
          );
        })}
      </div>
    </div>
  );
};
