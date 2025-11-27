"use client";

import { SectionSeparator, ThridText } from "presentation/components/atoms";
import { type FC } from "react";
import { RedirectCardList } from "../../common";
import { RedirecCardProperty } from "presentation/components/molecules";

export interface OptionsCardInterface {
  name: string;
  document: string;
  onPressBackButton: () => void;
  buttonOptions: RedirecCardProperty[];
}

const OptionsCard: FC<OptionsCardInterface> = ({
  name,
  document,
  onPressBackButton,
  buttonOptions,
}) => {
  return (
    <div
      className={`flex flex-wrap overflow-x-auto w-full justify-center rounded-xl p-6`}
    >
      <div className="flex flex-col justify-start w-full">
        <ThridText text={`Estas seleccionando para ${name}`} />
        <ThridText text={`${document}`} />
      </div>
      <SectionSeparator className="w-full mt-14 mb-14" />
      <div className="flex flex-row w-full justify-around mb-10">
        <RedirectCardList
          className="w-full justify-around"
          redirectButtons={buttonOptions}
        />
      </div>
    </div>
  );
};

export { OptionsCard };
