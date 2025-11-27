"use client";
import Link from "next/link";
import React, { FC } from "react";
import { useBetaAccess } from "presentation";
import { DescriptionLinkCardInterface } from "lib/types";
import { MenuCardDescription } from "./MenuDescriptionCard";

export const LinkDescriptionCard: FC<DescriptionLinkCardInterface> = ({
  name,
  href,
  urlImage,
  width,
  height,
  imageClassname = "",
  ellipseUrl,
  ellipseClassname,
  betaAccess,
  description = [],
  prefetch = true,
  externalLink = false,
  hidden,
}) => {
  const visible = useBetaAccess(betaAccess);

  return (
    !hidden &&
      visible && (
        <Link
          href={href}
          className="group relative flex flex-col w-full"
          prefetch={prefetch}
          target={externalLink ? "_blank" : "_self"}
        >
          <MenuCardDescription
            imageUrl={urlImage}
            label={name}
            width={width}
            height={height}
            imageClassname={imageClassname}
            ellipseUrl={ellipseUrl}
            ellipseClassname={ellipseClassname}
            betaAccess={betaAccess}
            description={description}
          />
        </Link>
      )
  );
};
