"use client";
import { Request } from "domain/models";
import {
  Description,
  FailIcon,
  FloatIcon,
  NeutralBlackText,
  SuccessIcon,
} from "presentation/components/atoms";
import { YoungPeopleIcon } from "presentation/components/atoms/common/images/YoungPeopleIcon";
import { FC } from "react";

export type FiledLayoutProps = {
  radicate?: Request;
  bodyMsg: string;
  isFail: boolean;
  footerMsg?: string;
};

export const FiledLayout: FC<FiledLayoutProps> = ({
  radicate,
  bodyMsg,
  isFail,
  footerMsg,
}: FiledLayoutProps) => {
  return (
    <div className="relative rounded-xl flex bg-principal-150 w-full h-full pr-10 overflow-hidden">
      <FloatIcon className="absolute flex right-0 top-auto w-[calc(45%)] justify-self-end" />
      <YoungPeopleIcon className="absolute right-[calc(126px)] w-[calc(25%)] top-[calc(40px)] overflow-hidden" />

      <div className="ml-32 w-[calc(431px)] h-auto">
        <>
          {isFail ? (
            <FailIcon className="mt-32" />
          ) : (
            <SuccessIcon className="mt-32" />
          )}
        </>

        {radicate?.status?.name && (
          <NeutralBlackText
            text={"Solicitud creada con éxito"}
            className="mt-10 font-poppins text-2xl font-bold text-principal-1050 text-center"
          />
        )}

        <div className="flex flex-row">
          <NeutralBlackText
            text="Tu número de radicado es: "
            className="mt-10 mr-1"
          />
          <p className="mt-10 text-base font-bold text-principal-1050">
            {radicate?.radicate ?? "No se pudo generar el radicado"}
          </p>
        </div>
        <div className="flex flex-row">
          <NeutralBlackText
            text="Estado: "
            className=" mr-1"
          />
          <p
            className={
              isFail
                ? " text-base font-bold text-principal-510"
                : " text-base font-bold text-principal-700"
            }
          >
            {radicate?.status?.name ??
              "No se pudo obtener el estado del radicado"}
          </p>
        </div>
        <p className="font-outfit text-sm font-normal text-principal-1050 mt-6 mb-20">
          {footerMsg ?? "Tu solicitud de afiliación puede tardar hasta tres días hábiles en ser validada por Comfandi. Puedes realizar el seguimiento del proceso en la sección Radicados de tu Sucursal Virtual."}
        </p>
      </div>
    </div>
  );
};
