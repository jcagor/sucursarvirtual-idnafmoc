"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation"; // Redirección en Next.js 13+
import { useAppSelector } from "presentation/store"; // Hook personalizado para Redux
import { ActivateLink, CardTitle, DigitalIdentityIcon } from "presentation";

interface Props {
  className?: string;
}

export const HomeCard: FC<Props> = ({ className = "" }) => {
  const router = useRouter();

  // Selección del estado desde Redux
  const biometricTermsAccepted = useAppSelector(
    (state) => state.termsAndConditions.bometricTerms
  );

  // Manejar redirección al hacer clic
  const handleClick = () => {
    if (biometricTermsAccepted) {
      window.location.href = process.env.NEXT_PUBLIC_CALLBACK_ADO || "/"; // Redirección externa
    } else {
      router.push("/faceid-verification"); // Redirección interna
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[96%] md:w-[331px] h-[140px] rounded-[20px] menuCardShadow relative flex flex-col justify-center cursor-pointer pl-8 pr-20 md:pr-12 active:scale-[99%] resize-card bg-principal-150 ${className}`}
    >
      <CardTitle text="Activa tu identidad digital Comfandi" className="mb-1" />
      <ActivateLink />
      <DigitalIdentityIcon className="absolute mt-1 right-[-18px] md:right-[-30px]" />
    </div>
  );
};
