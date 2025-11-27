"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
  titleClassName?: string;
  title: string;
  description?: string;
}

export const SearchingDocumentAnimation = ({
  className = "",
  titleClassName = "",
  title,
  description,
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
          animationData: require("/public/animations/not-found-animation.json"),
        });

        return () => anim.destroy();
      }
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`w-24 h-24 p-0 ${className}`}
        ref={animationContainer}
      ></div>
      <div className="text-start border-l-2 border-principal-600 pl-3">
        <h2 className={`text-lg ${titleClassName}`}>{title}</h2>
        <p className={"font-light text-principal-330 opacity-90"}>
          {description}
        </p>
      </div>
    </div>
  );
};
