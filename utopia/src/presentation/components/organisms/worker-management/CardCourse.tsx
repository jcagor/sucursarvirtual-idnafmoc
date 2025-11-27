"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface courseProps {
  Title: string;
  Text: string;
  Icon: string;
  IconHeight?: number;
  IconWidth?: number;
  path: string;
}

export const CardCourse: React.FC<courseProps> = ({
  Title,
  Text,
  Icon,
  IconHeight,
  IconWidth,
  path,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleNavigation}
      className="bg-principal-150 rounded-xl shadow-md p-6 hover:bg-opacity-5 hover:bg-principal-180"
    >
      <div className="flex items-center gap-3">
        <Image
          src={Icon}
          alt="img"
          width={IconWidth ?? 50}
          height={IconHeight ?? 50}
        />
        <div className="text-principal-180 font-bold text-lg">{Title}</div>
      </div>
      <div className="text-principal-450 mt-3 text-sm leading-relaxed">
        {Text}
      </div>
    </button>
  );
};
