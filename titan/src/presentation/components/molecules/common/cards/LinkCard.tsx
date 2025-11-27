"use client";
import Link from "next/link";
import React, { FC } from "react";
import { MenuCard, useBetaAccess } from "presentation";
import { LinkCardInterface } from "lib/types";
import { useIsKiosk } from "presentation/hooks/useIsKiosk";

export const LinkCard: FC<LinkCardInterface> = ({
  name,
  href,
  urlImage,
  width,
  height,
  imageClassname = "",
  ellipseUrl,
  ellipseClassname,
  betaAccess,
  description,
  prefetch = true,
  hideInKiosk = false,
}) => {
  const visible = useBetaAccess(betaAccess);
  const isKiosk = useIsKiosk();

  if (isKiosk && hideInKiosk) return null;

  if (!visible) return null;

  return (
    visible && (
      <Link href={href} className="w-full" prefetch={prefetch}>
        <MenuCard
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
