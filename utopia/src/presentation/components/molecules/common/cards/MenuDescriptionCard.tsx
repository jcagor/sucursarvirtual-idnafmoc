"use client";
import Image from "next/image";
import { NeutralNCText } from "presentation";
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import redirectArrow from "public/icons/redirect-arrow.svg";
import { VariableBoldText } from "presentation/components/atoms/common/text/VariableBoldText";

interface Props {
  imageUrl: string;
  label: string;
  width?: number;
  height?: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  betaAccess?: string[] | undefined;
  description?: string[];
  loading?: boolean;
  className?: string;
}

export const MenuCardDescription = ({
  imageUrl,
  label,
  width = 150,
  height = 150,
  imageClassname,
  ellipseUrl = "",
  ellipseClassname = "",
  betaAccess = undefined,
  description = [],
  loading = false,
  className = "",
}: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div
      className={`w-full h-[12.938rem] md:w-[20.375rem] rounded-xl descriptionMenuCardShadow bg-white items-center md:justify-center cursor-pointer hover:scale-[102%] active:scale-100 z-10 ${className}`}
    >
      <div className="w-full h-[4.938rem] md:w-[20.375rem] md:h-[4.813rem] relative flex flex-row items-center md:justify-center">
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
            <div className="w-[30%] md:w-1/3">
              <Image
                src={imageUrl}
                alt="Card image"
                width={width}
                height={height}
                draggable={false}
                className={imageClassname}
                unoptimized
              />
            </div>
            <NeutralNCText
              text={label}
              className="cf-text-principal-180 w-full pr-8 text-start flex font-bold items-start justify-start flex-1 md:w-2/3 md:pr-8"
            />
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
      <div className="p-3">
        <VariableBoldText
          text={description}
          className="font-light text-[#777777]"
          fontSize="sm"
        />
      </div>
    </div>
  );
};
