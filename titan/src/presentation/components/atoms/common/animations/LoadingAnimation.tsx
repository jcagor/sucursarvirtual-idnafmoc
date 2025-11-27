"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
  containerClassName?: string;
}

export const LoadingAnimation = ({
  className = "",
  containerClassName,
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
      className={` absolute flex justify-center items-center overflow-hidden bg-principal-680 ${
        containerClassName ? containerClassName : defaultSizing
      }`}
    >
      <div className={`w-24 h-24 ${className}`} ref={animationContainer}></div>
    </div>
  );
};

export const FlexLoadingAnimation = ({
  className = "",
  containerClassName,
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
      className={
        containerClassName ??
        `${defaultSizing} flex justify-center items-center overflow-hidden bg-principal-680`
      }
    >
      <div className={`w-32 h-32 ${className}`} ref={animationContainer}></div>
    </div>
  );
};
