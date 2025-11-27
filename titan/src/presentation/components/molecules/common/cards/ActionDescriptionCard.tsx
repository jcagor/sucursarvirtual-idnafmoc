"use client";
import Link from "next/link";
import React, { FC } from "react";
import { useBetaAccess } from "presentation";
import { DescriptionActionCardInterface } from "lib/types";
import { MenuCardDescription } from "./MenuDescriptionCard";

export const ActionDescriptionCard: FC<DescriptionActionCardInterface> = ({
  name,
  action,  
  urlImage,
  width,
  height,
  imageClassname = "",
  ellipseUrl,
  ellipseClassname,
  betaAccess,
  description =[],
  prefetch = true,
  loading,
}) => {
  const visible = useBetaAccess(betaAccess);

  return (
    visible && (
      <div onClick={loading ? () => {} : action} onKeyDown={()=>{}} className="group relative flex flex-col w-full">
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
      </div>
    )
  );
};
