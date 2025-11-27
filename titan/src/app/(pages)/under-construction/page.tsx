"use client";
import { SecondaryTitle } from "@comfanditd/chronux-ui";
import Image from "next/image";
import { MaintainAnimation } from "presentation";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-12">
      <Image
        alt="Comfandi Logo"
        src="/icons/comfandi.png"
        className="absolute top-4 left-4"
        width={210}
        height={210}
        draggable={false}
      />
      <div className="bg-principal-150 shadow-md rounded-xl w-[90%] h-[90%] md:w-[50%] md:h-[90%] pt-12 px-9 relative">
        <section>
          <SecondaryTitle
            text="¡Sucursal virtual está en construcción!"
            className="mb-4 text-[22px] md:text-[32px] md:text-center"
          />
          <p
            className={`w-full text-[15px] md:text-[16px] text-justify md:text-center font-light bg-principal-150 text-principal-180 `}
          >
            Pero no te preocupes! Pronto estará disponible con muchos beneficios
            para ti.
          </p>
        </section>
        <div className="w-full flex justify-center">
          <MaintainAnimation className="absolute bottom-0 xl:-bottom-8 2xl:bottom-2 3xl:bottom-0 ml-24 w-[320px] h-[320px] md:w-[500px] md:h-[500px] 3xl:w-[750px] 3xl:h-[750px] 3xl:ml-48" />
        </div>
      </div>
      {/* <CornerArc className="absolute bottom-0 right-0" /> */}
    </div>
  );
}
