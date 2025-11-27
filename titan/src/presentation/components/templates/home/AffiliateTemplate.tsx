"use client";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { nameFormat } from "lib";
import {
  Button,
  Description,
  FamilyIcon,
  LetterMIcon,
} from "presentation/components/atoms";

export interface Template {
  className?: string;
  onClick?: () => void;
}

export const AffiliateTemplate: FC<Template> = ({ className, onClick }) => {
  const { data: session } = useSession();
  const [name, setName] = useState("Usuario");
  useEffect(() => {
    if (session?.access_token) {
      const decoded = jwtDecode(session.access_token) as {
        given_name?: string;
      };
      if (decoded?.given_name) setName(nameFormat(decoded.given_name));
    }
  }, [session]);
  return (
    // Mariana, aún no estás afiliado, Afíliate a Comfandi para obtener más beneficios
    <div
      className={`w-full h-[15.336rem] grid  grid-cols-3 grid-rows-1 gap-x-2 xl:w-fit ${className}`}
    >
      <div className="w-full col-span-2 rounded-[1.25rem] bg-principal-80">
        <div className="flex flex-row w-full h-full">
          <div className="w-full md:w-[17.063rem]">
            <div className="w-full h-2/3 px-6 flex flex-col justify-center">
              <Description
                text={`${name}, aún no estás afiliado,`}
                className="w-full h-fit text-principal-150 font-outfit font-normal text-lg"
              />
              <Description
                text="Afíliate a Comfandi"
                className="w-full h-fit text-principal-150 font-bold font-outfit text-lg"
              />
              <Description
                text="para obtener más beneficios"
                className="w-full h-fit text-principal-150 font-outfit font-normal text-lg"
              />
            </div>
            <div className="w-full h-1/3 px-6">
              <Button
                primary={true}
                label="Iniciar proceso"
                className=""
                onClick={onClick}
              />
            </div>
          </div>
          <div className="w-[17.063rem] relative justify-items-center items-end overflow-hidden ">
            <FamilyIcon className="h-fit self-end z-10 w-fit absolute -top-4 right-0 overflow-hidden" />
            <LetterMIcon className="h-fit w-fit absolute right-0 top-2 z-0 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
