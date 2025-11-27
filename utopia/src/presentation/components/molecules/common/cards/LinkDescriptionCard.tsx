"use client";
import Link from "next/link";
import React, { FC } from "react";
import { DescriptionLinkCardInterface } from "lib/types";
import { MenuCardDescription } from "./MenuDescriptionCard";
import { useBetaAccess } from "presentation/hooks";

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
  description =[],
  prefetch = true,
  externalLink = false,
}) => {
  const visible = useBetaAccess(betaAccess);

  return (
    visible && (
      <Link href={href} className="w-full" prefetch={prefetch} target={externalLink?"_blank":"_self"}>
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
