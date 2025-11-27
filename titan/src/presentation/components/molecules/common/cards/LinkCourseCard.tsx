"use client";
import Link from "next/link";
import React, { FC } from "react";
import { useBetaAccess } from "presentation";
import { MenuCourseCard } from "./MenuCourseCard";
import { LinkCourseCardInterface } from "lib/types/card/course.type";

export const LinkCourseCard: FC<LinkCourseCardInterface> = ({
  name,
  href,
  urlImage,
  width,
  height,
  imageClassname = "",
  ellipseUrl,
  ellipseClassname,
  betaAccess,
  description = "",
  duration = "",
  prefetch = true,
  schedule,
  onClick,
}) => {
  const visible = useBetaAccess(betaAccess);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    visible && (
      <Link href={href} className="w-full" prefetch={prefetch} onClick={handleClick}>
        <MenuCourseCard
          imageUrl={urlImage}
          label={name}
          width={width}
          height={height}
          imageClassname={imageClassname}
          ellipseUrl={ellipseUrl}
          ellipseClassname={ellipseClassname}
          betaAccess={betaAccess}
          description={description}
          duration={duration}
          schedule={schedule}
        />        
      </Link>
    )
  );
};
