"use client";

import { InfoSection } from "@comfanditd/chronux-ui";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "presentation";
import DynamicHeightIframe from "presentation/components/molecules/common/iframe/DynamicHeightIframe";
import { useEffect, useRef, useState } from "react";

export default function CertificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  const [token, setToken] = useState("");

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setToken(localStorage.getItem("keycloakTokenRefresh") || "");
  }, []);

  return (
    <>
      <div className="ml-5 mb-11">
        <InfoSection
          image={Image}
          topText="Certificado escolar"
          description="Comfandi más digital y más cerca de ti."
          classNameDescription="text-[12px] sm:text-[15px]"
          returnButton={false}
          returnPath="/"
          link={Link}
        />
      </div>

      <p className="text-xl font-semibold text-principal-180 ml-5">
        Validar datos del afiliado
      </p>
      <div className="relative iframeStyle">
        <DynamicHeightIframe
          src={`https://drupal9.comfandi.com.co/consulta-de-certificado-escolar?id=${token}`}
          className="mt-2 ml-[-3px] w-full"
          sizeIframe={3}
        />
      </div>
    </>
  );
}
