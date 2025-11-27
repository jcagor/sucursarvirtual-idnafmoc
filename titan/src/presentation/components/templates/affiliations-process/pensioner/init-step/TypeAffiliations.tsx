"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { useRouter } from "next/navigation";
import { CardText, SectionSeparator } from "presentation/components/atoms";
import { useAppSelector } from "presentation/store";
import { useCallback, useEffect } from "react";
import { Pensioner1643, Pensioner25, PensionerAportant } from "../components";

const TypeAffiliations = () => {
  const data = useAppSelector((state) => state.pensionerAffiliations);
  const router = useRouter();
  const validateStep = useCallback(() => {
    if (!data.isStarted) {
      router.push("/menu-affiliations");
    }
  }, [data.isStarted, router]);

  useEffect(() => {
    validateStep();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-12 mb-12">
        <CardText
          text="Afiliaciones / afiliación pensionado"
          className="text-principal-180 text-2xl"
        />
        <MainTitle text="Afiliación pensionado" />
        <SectionSeparator />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="w-full items-center justify-start">
          <h2 className="text-principal-180 text-2xl font-semibold">
            Vemos que no tienes ninguna afiliación en curso ¿Qué tipo de
            pensionado eres?
          </h2>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center gap-6">
          <div className="min-w-[300px] flex-1 max-w-[384px]">
            <Pensioner1643 />
          </div>
          <div className="min-w-[300px] flex-1 max-w-[384px]">
            <PensionerAportant />
          </div>
          <div className="min-w-[300px] flex-1 max-w-[384px]">
            <Pensioner25 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeAffiliations;
