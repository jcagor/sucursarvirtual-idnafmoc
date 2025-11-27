"use client";
import { MenuCard } from "presentation";
import React, { FC } from "react";
import { LinkCardInterface } from "lib";
import { ZoneLink } from "presentation";
import { useBetaAccess } from "presentation";
import { useIsKiosk } from "presentation/hooks/useIsKiosk";

export const ZoneCard: FC<LinkCardInterface> = ({
  name,
  href,
  urlImage,
  width,
  height,
  imageClassname = "",
  ellipseUrl,
  ellipseClassname,
  betaAccess = undefined,
  subsidies2Fa = false,
  hideInKiosk = false,
}) => {
  const visible = useBetaAccess(betaAccess);
  const isKiosk = useIsKiosk();

  if (isKiosk && hideInKiosk) return null;

  if (!visible) return null;

  return (
    visible && (
      <ZoneLink
        href={href}
        zoneName={name}
        urlImage={urlImage}
        subsidies2Fa={subsidies2Fa}
      >
        <MenuCard
          imageUrl={urlImage}
          label={name}
          width={width}
          height={height}
          imageClassname={imageClassname}
          ellipseUrl={ellipseUrl}
          ellipseClassname={ellipseClassname}
          betaAccess={betaAccess}
        />
      </ZoneLink>
    )
  );
};
