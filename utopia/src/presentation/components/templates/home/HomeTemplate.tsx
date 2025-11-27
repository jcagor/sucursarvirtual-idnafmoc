"use client";
import { MainTitle } from "@comfanditd/chronux-ui";
import {
  BUSINESS_STATUS,
  homeItemsBusinessNoValidated,
  homeItemsBusinessSuspended,
  homeItemsBusinessValidated,
} from "lib/config/constants";
import { ActionMenuCardWithDescription } from "presentation/components/molecules/common/cards/ActionMenuCardWithDescription";
import { useAppSelector } from "presentation/store";

export const HomeTemplate = () => {
  const businessStatus = useAppSelector((state) => state.businessStatus.State);

  let homeItemsToUse;
  if (businessStatus === BUSINESS_STATUS.VALIDATED) {
    homeItemsToUse = homeItemsBusinessValidated;
  } else if (businessStatus === BUSINESS_STATUS.SUSPENDED) {
    homeItemsToUse = homeItemsBusinessSuspended;
  } else {
    homeItemsToUse = homeItemsBusinessNoValidated;
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle text="Bienvenido" />
      <p> ¿En qué podemos ayudarte hoy? </p>
      <div className="w-full md:w-11/12 flex flex-wrap gap-4 mt-10">
        {homeItemsToUse.map((item) => (
          <ActionMenuCardWithDescription
            key={item.text}
            imageUrl={item.imageUrl}
            text={item.text}
            description={item.description}
            url={item.url}
            disabled={item.disabled ? true : false}
            disabledText={item.disabledText}
          />
        ))}
      </div>
    </div>
  );
};
