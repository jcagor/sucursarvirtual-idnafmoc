"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

export const LoadingSimpleAnimation = ({ className = "" }: Props) => {
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
    <div className="flex justify-center items-center">
      <div
        className={`w-14 h-14 p-0 ${className}`}
        ref={animationContainer}
      ></div>
      <div className="text-start">
        <p>Cargando...</p>
      </div>
    </div>
  );
};
