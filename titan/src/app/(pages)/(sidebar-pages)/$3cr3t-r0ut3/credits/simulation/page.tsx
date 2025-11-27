"use client";

import { InfoSection } from "@comfanditd/chronux-ui";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "presentation";
import DynamicHeightIframe from "presentation/components/molecules/common/iframe/DynamicHeightIframe";
import { useRef, useState } from "react";

export default function CreditSimulationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <>
      <InfoSection
        image={Image}
        topText="Simulador de crédito Comfandi"
        description="Con esta línea de crédito podrás acceder a productos y servicios de Comfandi de manera fácil y rápida en Supermercados, Droguerías, Recreación, Educación y Salud."
        returnButton={true}
        returnPath="/credits"
        link={Link}
      />
      <div className="relative iframeStyle ml-[-10px]">
        <DynamicHeightIframe
          src="https://drupal9.comfandi.com.co/personas/credito-y-seguros/simula-tu-credito-en-linea"
          className="mt-5 w-full"
          sizeIframe={3.5}
        />
      </div>
    </>
  );
}
