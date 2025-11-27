"use client";
import React, { useEffect, useRef } from "react";
import { TertiaryTitle } from "@comfanditd/chronux-ui";
import Image from "next/image";
import { Description } from "presentation/components/atoms";

interface Props {
  className?: string;
  containerClassName?: string;
  src?: string;
  zoneName: string;
}

export const ZoneLoadingAnimation = ({
  className = "",
  containerClassName,
  src = "",
  zoneName = "",
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

  const defaultSizing = "w-screen h-screen";

  return (
    <div
      className={`absolute flex flex-col justify-center items-center overflow-hidden bg-principal-680 ${
        containerClassName ? containerClassName : defaultSizing
      }`}
    >
      <Image
        src={src}
        width={100}
        height={100}
        alt=""
        className="mb-6"
        draggable={false}
      />
      <TertiaryTitle
        text="Espera unos segundos, por favor..."
        className="mb-2"
      />
      <Description text={`Pronto estarás en ${zoneName}`} className="mb-6" />
      <div className={`w-24 h-24 ${className}`} ref={animationContainer}></div>
    </div>
  );
};
