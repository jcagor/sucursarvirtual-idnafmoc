"use client";
import Image from "next/image";
import { NeutralNCText, NeutralText } from "presentation";
import React, { useEffect, useRef } from "react";

interface Props {
  title: string;
  subtitle: string;
  status: string;
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

export const JobStatusCard = ({
  imageUrl,
  title,
  subtitle,
  status,
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
        "my-2 p-4 flex w-full h-[9rem] rounded-xl menuCardShadow relative items-center z-10" +
        colorCard
      }
    >
      <div className="block flex-1">
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

        <NeutralText
          text={publishedTime}
          fontSize="sm"
          className={
            "w-full block mt-5 pr-8 justify-start md:pr-8 truncate" + colorText
          }
        />
      </div>
      <div className="flex block mx-2">
        <Image
          src={"/icons/view_icon.svg"}
          alt="Detalles"
          width={20}
          height={20}
          draggable={false}
          className="flex"
        />
      </div>
      <div className="flex block mx-2">
        <button className="p-1 border-2 text-[#808080] border-[#808080] rounded-lg">
          Pendiente
        </button>
      </div>
    </div>
  );
};
