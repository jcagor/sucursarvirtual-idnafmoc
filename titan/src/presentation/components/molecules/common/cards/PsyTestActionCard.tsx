"use client";
import React, { FC } from "react";
import { PsyListCard, useBetaAccess } from "presentation";
import { ActionMenuCardInterface } from "lib/types";

export const PsyTestActionCard: FC<ActionMenuCardInterface> = ({
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
}) => {
  const visible = useBetaAccess(betaAccess);

  return (
    visible && (
      <div
        onClick={loading ? () => {} : action}
        onKeyDown={() => {}}
        className="w-full"
      >
        <PsyListCard
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
    )
  );
};
