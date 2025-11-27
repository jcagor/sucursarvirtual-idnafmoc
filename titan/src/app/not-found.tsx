"use client";
import React from "react";
import { Button, NotFoundAnimation, SidebarMenu } from "presentation";
import { Paragraph, SecondaryTitle } from "@comfanditd/chronux-ui";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const currentPath = usePathname();

  return (
    <SidebarMenu>
      <div className="w-full h-full flex flex-col items-center relative md:justify-center md:-ml-16">
        <NotFoundAnimation className="h-[40%] w-[180%] pointer-events-none md:h-[80%] 3xl:h-[70%] md:-mt-36" />
        <SecondaryTitle
          text="¡Parece que te perdiste!"
          className="mb-4 md:mb-8 md:-mt-12 3xl:-mt-12"
        />
        <Paragraph
          text={`La página que solicitaste ${currentPath}, no existe.`}
          className="mb-8"
        />
        <Link href="/">
          <Button primary label="Ir al inicio" />
        </Link>
      </div>
    </SidebarMenu>
  );
}
