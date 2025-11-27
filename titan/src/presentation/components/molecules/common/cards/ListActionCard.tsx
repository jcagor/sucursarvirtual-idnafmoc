"use client";
import React, { FC } from "react";
import { ListCard, MenuCard, useBetaAccess } from "presentation";
import { ActionMenuCardInterface } from "lib/types";

export const ListActionCard: FC<ActionMenuCardInterface> = ({
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
      <div onClick={loading ? () => {} : action} onKeyDown={()=>{}} className="w-full">
        <ListCard
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
