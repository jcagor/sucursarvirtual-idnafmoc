"use client";
import { useParams, useRouter } from "next/navigation";
import { type FC, type ReactElement } from "react";

interface RedirectButtonProperty {
  to: string;
  description: string;
  icon: ReactElement;
}

export const RedirectButton: FC<RedirectButtonProperty> = ({
  to,
  description,
  icon,
}) => {
  const router = useRouter();
  const url = to;

  return (
    <button
      className="flex items-center justify-evenly w-56 h-20 shadow-xl rounded-xl bg-principal-150"
      onClick={() => {
        router.push(url);
      }}
    >
      {icon}
      <span className="text-principal-180 font-outfit font-light text-sm text-left">
        {description}
      </span>
    </button>
  );
};

export type { RedirectButtonProperty };
