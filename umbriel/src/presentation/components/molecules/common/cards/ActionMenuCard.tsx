"use client";


import { ActionMenuCardInterface } from "@/lib/types/cards";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ActionMenuCard = ({
  url,
  imageUrl,
  text,
}: ActionMenuCardInterface) => {
  const router = useRouter();

  return (
    <button
      className={`flex min-w-44 w-44 gap-2 py-1 px-3 rounded-xl justify-center align-center bg-principal-190 ${
        url ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={() => url && router.push(url)}
    >
      <Image
        src={imageUrl}
        alt="img"
        width={50}
        height={50}
        loading="lazy"
        className="w-14 h-14"
      />
      <div className="flex items-center text-sm">{text}</div>
    </button>
  );
};
