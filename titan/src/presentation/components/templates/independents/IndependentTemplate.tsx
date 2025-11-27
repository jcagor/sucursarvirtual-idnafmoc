"use client";
import { InfoSection } from "@comfanditd/chronux-ui";
import { Conditional } from "lib";
import Image from "next/image";
import Link from "next/link";
import { Button, Description, Divider } from "presentation";
import { FC, ReactNode } from "react";

interface IndependentsProps {
  mainTitle: string;
  description: string;
  buttonTitle?: string;
  hideButton?: boolean;
  children: ReactNode;
  onNextButton?: () => void;
  onBackButton?: () => void;
}

export const IndependentTemplate: FC<IndependentsProps> = ({
  mainTitle,
  description,
  buttonTitle,
  hideButton,
  children,
  onNextButton,
  onBackButton,
}) => {
  return (
    <div>
      <InfoSection
        image={Image}
        description={description}
        link={Link}
        topText={mainTitle}
      />
      <Divider className="w-4/5 my-8" />
      {children}
      <Conditional showWhen={hideButton ?? true}>
        <div className="flex flex-wrap flex-row pb-10">
          <div className="flex w-full justify-between pt-9">
            <div
              onClick={onBackButton}
              className="self-center cursor-pointer flex w-1/5"
            >
              <Description
                text="Atrás"
                className="font-outfit text-base font-normal text-principal-180"
              />
            </div>
            <div className="self-center flex w-1/5">
              <Button
                onClick={onNextButton}
                label={buttonTitle ? buttonTitle : "Siguiente"}
                primary={true}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </Conditional>
    </div>
  );
};
