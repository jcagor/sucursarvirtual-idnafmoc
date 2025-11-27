"use client";
import Link from "next/link";
import { Button, Description, SidebarMenu } from "presentation";
import { SecondaryTitle } from "@comfanditd/chronux-ui";
import { ErrorAnimation } from "presentation";

export default function InternalError() {
  return (
    <SidebarMenu>
      <div className="relative flex h-full w-full flex-col items-center md:-ml-16 md:justify-center">
        <ErrorAnimation className="3xl:h-[60%] pointer-events-none h-[40%] w-[180%] md:-mt-24 md:h-[60%]" />
        <SecondaryTitle
          text="¡Uy, ha ocurrido un error!"
          className="3xl:mt-4 mb-4 mt-4 md:mb-8 md:mt-4"
        />
        <Description
          text={`Parece que ha habido un error, por favor presiona el botón "Ir al inicio".`}
          className="mx-4 mb-8 text-center"
        />
        <Link href="/">
          <Button primary label="Ir al inicio" />
        </Link>
      </div>
    </SidebarMenu>
  );
}
