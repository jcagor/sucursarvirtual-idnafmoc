"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  MainTitle,
  SectionSeparator,
} from "presentation/components/atoms";
import { useAppSelector } from "presentation/store";
import React, { useEffect } from "react";

const FilingCode = () => {
  const router = useRouter();

  const data = useAppSelector((state) => state.pensionerAffiliations);

  useEffect(() => {
    if (!data.isStarted) {
      router.push("/menu-affiliations");
    }
  }, [data.isStarted, router]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-12 mb-12">
        <CardText
          text="Afiliaciones / afiliación pensionado"
          className="text-principal-180 text-2xl"
        />
        <MainTitle text={`Afiliación pensionado ${data.flow_type == "pensioner-25" ? "25 años" : "1643"}`} />
        <h3 className="text-principal-180">
          Tu solicitud de afiliación fue radicada exitosamente.
        </h3>
        <SectionSeparator />
        <div className="w-full items-center justify-center flex flex-col gap-4">
          <div className="w-full max-w-[1112px] bg-principal-150 flex gap-12 rounded-3xl shadow-lg">
            <div className="w-full flex flex-col gap-4 px-12 py-12">
              <div className="w-full flex flex-col gap-4 rounded-xl shadow-lg p-4">
                <h4>
                  Tu número de radicado es:{" "}
                  <span className="text-principal-350 font-semibold">
                    {data.filing_code}
                  </span>
                </h4>
                <h4>
                  Estado:{" "}
                  <span className="text-principal-700 font-semibold">
                    {data.state_filing}
                  </span>
                </h4>
              </div>
            </div>
            <Image
              src="/img/filing_code.svg"
              alt="Filing code"
              width={600}
              height={600}
            />
          </div>
          <div className="w-full max-w-[1112px] flex items-center justify-end">
            <Button
              label="Finalizar"
              primary
              primaryClass="bg-principal-700 text-principal-150 w-80 px-12 my-4"
              onClick={() => router.push("/menu-affiliations")}
              removeWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilingCode;
