"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

export const NotFoundAnimation = ({ className = "" }: Props) => {
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
          animationData: require("/public/animations/404.json"),
        });

        return () => anim.destroy();
      }
    });
  }, []);

  return <div className={`${className}`} ref={animationContainer} />;
};
