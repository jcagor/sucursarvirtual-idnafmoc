"use client";
import { InfoSection } from "@comfanditd/chronux-ui";
import { LinkCardInterface, creditMenuItems } from "lib";
import Image from "next/image";
import Link from "next/link";
import { LinkCard } from "presentation";
import React from "react";

export const CreditMenu = () => {
  return (
    <div>
      <InfoSection
        image={Image}
        topText="En crédito Comfandi"
        description="Te acompañamos a lograr todo lo que te propones"
        link={Link}
      />

      <div className="w-full mt-[2rem] pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {creditMenuItems.map((credit: LinkCardInterface) => {
          return (
            <LinkCard
              key={credit.href}
              name={credit.name}
              href={credit.href}
              urlImage={credit.urlImage}
              width={credit.width}
              height={credit.height}
              imageClassname={credit.imageClassname}
              ellipseUrl={credit.ellipseUrl}
              ellipseClassname={credit.ellipseClassname}
              betaAccess={credit.betaAccess}
              prefetch={credit.prefetch}
            />
          );
        })}
      </div>
    </div>
  );
};
