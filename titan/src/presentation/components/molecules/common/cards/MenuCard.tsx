"use client";
import Image from "next/image";
import { CardText } from "presentation";
import React, { useEffect, useRef } from "react";
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

export const MenuCard = ({
  imageUrl,
  label,
  width = 100,
  height = 100,
  imageClassname,
  ellipseUrl = "",
  ellipseClassname = "",
  betaAccess = undefined,
  description,
  loading = false,
}: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (
      !loading ||
      typeof window === "undefined" ||
      !animationContainer.current
    )
      return;

    let isMounted = true;

    const loadLottie = async () => {
      try {
        const lottieModule: any = await import("lottie-web");
        const lottie = lottieModule.default || lottieModule;

        if (isMounted && animationContainer.current) {
          animationInstanceRef.current = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require("/public/animations/spinner.json"),
          });
        }
      } catch (error) {
        console.error("Error cargando Lottie:", error);
        if (animationContainer.current) {
          animationContainer.current.innerHTML = `
            <div class="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          `;
        }
      }
    };

    loadLottie();

    return () => {
      isMounted = false;
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }
    };
  }, [loading]);

  return (
    <div className="w-full h-[4.938rem] md:w-[16.375rem] md:h-[4.813rem] rounded-xl menuCardShadow relative bg-principal-190 flex flex-row items-center md:justify-center cursor-pointer hover:scale-[102%] active:scale-100 z-10">
      {betaAccess && (
        <div className="absolute right-0 top-0 md:-top-6 text-xs py-[0.1rem] px-2 font-outfit rounded-md text-principal-150 bg-gradient-to-r from-[#38bdf8] to-[#3b82f6]">
          BETA
        </div>
      )}

      {loading ? (
        <div
          ref={animationContainer}
          className="flex items-center justify-center w-16 h-16"
        ></div>
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
          <div className="w-[35%] md:w-1/2">
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
          <CardText
            text={label}
            className="w-full pr-8 text-start flex font-normal items-start justify-start flex-1 md:w-1/2 md:pr-8"
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
  );
};
