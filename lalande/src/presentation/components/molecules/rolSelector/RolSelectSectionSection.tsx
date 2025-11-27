"use-client";
import { SelectOption } from "lib";
import { ScrollZoneInterface } from "lib/types/table";
import { NeutralBlackText, NeutralNCText } from "presentation/components/atoms";
import { CustomSelectRole } from "presentation/components/atoms/common/select/CustomSelectRole";
import { useAppDispatch } from "presentation/store";
import { setMpacUserBusiness } from "presentation/store/mpacUserStatus/mpacUserStatusSlice";
import { type FC } from "react";
import React from "react";

interface CustomProps {
  className?: string;
  userName?: string;
  options: SelectOption[];
  selectedValue?: SelectOption | undefined;
}

export const RolSelectSection: FC<CustomProps> = ({
  className = "",
  userName = "Usuario",
  options,
  selectedValue,
}) => {
  const dispatch = useAppDispatch();

  const setSessionInfo = (selectBusiness: SelectOption) => {
    dispatch(setMpacUserBusiness(selectBusiness)) ;
  };
  
  return (
    <div
      className={`flex w-full justify-end min-h-15 text-center text-wrap rounded-lg p-3 mr-5 ${className}`}
    >
      <div className="flex w-[350px]">
        <CustomSelectRole
          label={`${userName}, actualmente estás en: `}
          options={options}
          selectedValue={selectedValue}
          onChangeValue={(selected: SelectOption) => {
            setSessionInfo(selected);
          }}
        />
      </div>
    </div>
  );
};
