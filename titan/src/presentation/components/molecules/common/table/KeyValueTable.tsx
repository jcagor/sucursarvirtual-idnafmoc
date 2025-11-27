import { KeyValueText, KeyValueTextProps } from "presentation/components/atoms";
import { type FC } from "react";

export type KeyValueTableProps = {
  keyValueData: KeyValueTextProps[];
};
export const KeyValueTable: FC<KeyValueTableProps> = ({ keyValueData }) => {
  return (
    <div className="w-full h-full flex flex-col p-7 items-center rounded-xl bg-principal-150 shadow-md">
      {keyValueData.map((item, key) => (
        <KeyValueText
          key={key}
          keyReference={item.keyReference}
          value={item.value}
        />
      ))}
    </div>
  );
};
