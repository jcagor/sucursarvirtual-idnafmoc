"use client";
import React, { FC } from "react";
import { MenuCard, useBetaAccess } from "presentation";
import { ActionMenuCardInterface } from "lib/types";
import { useIsKiosk } from "presentation/hooks/useIsKiosk";

export const ActionMenuCard: FC<ActionMenuCardInterface> = ({
  name,
  action,
  urlImage,
  width,
  height,
  imageClassname = "",
  ellipseUrl,
  ellipseClassname,
  betaAccess = undefined,
  description,
  loading,
  hideInKiosk = false,
}) => {
  const visible = useBetaAccess(betaAccess);
  const isKiosk = useIsKiosk();

  if (isKiosk && hideInKiosk) return null;

  if (!visible) return null;

  return (
    <div onClick={loading ? () => {} : action} className="w-full">
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
        loading={loading}
      />
    </div>
  );
};
