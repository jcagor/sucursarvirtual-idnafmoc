"use client";

import { InfoSection } from "@comfanditd/chronux-ui";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "presentation";
import DynamicHeightIframe from "presentation/components/molecules/common/iframe/DynamicHeightIframe";
import { useRef, useState } from "react";

export default function ApplyCreditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <InfoSection
        image={Image}
        topText="Solicitud de tu crédito Comfandi"
        description="Más digital y más cerca de ti."
        tipText="Con solo tu número de cédula en minutos podras obtener tu crédito con nosotros."
        returnButton={true}
        returnPath="/credits"
        link={Link}
      />
      <div className="relative iframeStyle ml-0 sm:ml-[35px] mt-12">
        <DynamicHeightIframe
          src="https://drupal9.comfandi.com.co/personas/credito-y-seguros/solicita-tu-credito-en-linea"
          className="mt-5 w-full overflow-y-hidden"
          sizeIframe={2.2}
        />
      </div>
    </>
  );
}
