import { CardDescription } from "presentation";
import { HiOutlineRefresh } from "react-icons/hi";
import React, { FC } from "react";

interface RetryValidationInterface {
  isLoading: boolean;
}

export const RetryValidation: FC<RetryValidationInterface> = ({
  isLoading,
}) => {
  return (
    <div className="flex items-center">
      <CardDescription
        text={
          isLoading ? "Espera unos segundos por favor" : "Volver a consultar"
        }
        className=""
      />
      {!isLoading ? (
        <HiOutlineRefresh className="text-sm -ml-[0.30rem] mt-[0.35rem] text-principal-180" />
      ) : null}
    </div>
  );
};
