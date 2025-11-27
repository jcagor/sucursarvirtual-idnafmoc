"use client";

import { NeutralNCText, NeutralText } from "presentation";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  subtitle: string;
  salary: string;
  publishedTime: string;
  activeCard: boolean;
  imageUrl: string;
  width?: number;
  height?: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  betaAccess?: string[] | undefined;
  description?: string;
  loading?: boolean;
}

export const JobCard = ({
  imageUrl,
  title,
  subtitle,
  salary,
  publishedTime,
  activeCard,
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

  let colorText = activeCard ? " text-[#FFF]" : " text-[#003da5]";
  let colorCard = activeCard ? " bg-[#003da5]" : " bg-[#FFF]";

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
    <div
      className={
        "my-2 p-4 w-full h-[9rem] rounded-xl menuCardShadow relative items-center cursor-pointer hover:scale-[102%] active:scale-100 z-10" +
        colorCard
      }
    >
      <>
        <NeutralText
          text={title}
          fontSize="lg"
          className={
            "w-full pr-8 text-start items-start justify-start md:pr-8 font-semibold truncate" +
            colorText
          }
        />

        <NeutralNCText
          text={subtitle}
          className={
            "w-full mt-2 pr-8 text-start font-normal items-start justify-start md:pr-8 text-md truncate" +
            colorText
          }
        />

        <NeutralNCText
          text={salary}
          className={
            "w-full pr-8 text-start font-normal items-start justify-start md:pr-8 text-md truncate" +
            colorText
          }
        />

        <NeutralText
          text={publishedTime}
          fontSize="sm"
          className={
            "w-full block mt-5 pr-8 justify-start md:pr-8 truncate" + colorText
          }
        />
      </>
    </div>
  );
};
