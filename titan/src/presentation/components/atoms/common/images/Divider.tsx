import Image from "next/image";
import { type FC } from "react";

interface Props {
  className?: string;
}

export const Divider: FC<Props> = ({ className = "" }) => {
  return <div className={`${className} w-full h-[calc(2px)] rounded-full bg-principal-300`} draggable={false} />;
};
