"use client";
import React, { FC } from "react";
import { JobCard, ListCard, useBetaAccess } from "presentation";
import { JobActionCardInterface } from "lib/types";

export const JobActionCard: FC<JobActionCardInterface> = ({
  title,
  subtitle,
  salary,
  publishedTime,
  activeCard,
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
        <JobCard
          title={title}
          subtitle={subtitle}
          salary={salary}
          publishedTime={publishedTime}
          activeCard={activeCard}
          imageUrl={urlImage}
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
