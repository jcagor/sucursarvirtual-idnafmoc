"use client";

import { useRouter } from "next/navigation";
import { SecondaryText } from "presentation/components/atoms";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        router.back();
      }}
      className="self-center flex w-1/5 cursor-pointer"
    >
      <SecondaryText
        text="Atrás"
        className="font-outfit text-[calc(20px)] font-normal text-principal-180"
      />
    </button>
  );
};

export default BackButton;
