"use client";
import Image from "next/image";
import { CardText, NeutralNCText } from "presentation";
import React, { useEffect, useRef, useState } from "react";
import redirectArrow from "public/icons/redirect-arrow.svg";

interface Props {
  imageUrl: string;
  label: string;
  width?: number;
  height?: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  betaAccess?: string[] | undefined;
  description?: string;
  loading?: boolean;
}

export const PsyListCard = ({
  imageUrl,
  label,
  width = 41,
  height = 41,
  imageClassname,
  ellipseUrl = "",
  ellipseClassname = "",
  betaAccess = undefined,
  description,
  loading = false,
}: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("lottie-web/build/player/lottie_light").then((lottie: any) => {
      if (animationContainer.current) {
        const anim = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("/public/animations/spinner.json"),
        });

        return () => anim.destroy();
      }
    });
  }, []);

  return (
    <div className="w-[16rem] h-[7rem] p-5 rounded-xl menuCardShadow relative bg-[#FFF] items-center cursor-pointer hover:scale-[102%] active:scale-100 z-10">
      {betaAccess && (
        <div className="absolute right-0 top-0 md:-top-6 text-xs py-[0.1rem] px-2 font-outfit rounded-md text-principal-150 bg-gradient-to-r from-[#38bdf8] to-[#3b82f6]">
          BETA
        </div>
      )}

      {loading ? (
        <div className={`w-16 h-16`} ref={animationContainer}></div>
      ) : (
        <>
          {ellipseUrl && (
            <Image
              src={ellipseUrl}
              alt="Card ellipse"
              width={44}
              height={47}
              draggable={false}
              className={ellipseClassname}
              loading="lazy"
            />
          )}

          {/*<div className="w-[35%] md:w-1/2">
            <Image
              src={imageUrl}
              alt="Card image"
              width={41}
              height={41}
              draggable={false}
              className={imageClassname}
              unoptimized
            />
          </div>*/}

          <div className="block" title="label">
          <NeutralNCText                        
            text={label}
            className="w-full pr-8 text-start flex font-normal truncate items-start justify-start md:pr-8 text-md cf-text-principal-180"
          />
          </div>

          <div className="block mt-5">
            <div className="flex w-full flex justify-end">
              <button className="py-1 px-3 border-2 text-principal-150 bg-principal-700 rounded-md">
                Realizar Prueba
              </button>
            </div>
          </div>
          <div className="absolute right-4 mt-[0.2rem] md:hidden">
            <Image
              src={redirectArrow}
              alt="Redirect arrow image"
              width={8}
              height={8}
              draggable={false}
              className="opacity-70"
              unoptimized
            />
          </div>
        </>
      )}
    </div>
  );
};
