import { type FC } from "react";

export type KeyValueTextProps = {
  keyReference: string;
  value: string;
};
export const KeyValueText: FC<KeyValueTextProps> = ({ keyReference, value }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <p className={"font-outfit text-base text-left text-principal-180"}>
        {keyReference}
      </p>
      <p className={"font-outfit text-base text-right text-principal-1050"}>
        {value}
      </p>
    </div>
  );
};
