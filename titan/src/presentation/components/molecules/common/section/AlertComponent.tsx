import {
  HighPriorityIcon,
  NeutralBlackText,
} from "presentation/components/atoms";
import { type FC } from "react";

export type AlertComponentProps = {
  text: string;
};
export const AlertComponent: FC<AlertComponentProps> = ({ text }) => {
  return (
    <div className="w-full h-auto flex flex-row px-4 py-4 gap-2 justify-start rounded-xl bg-principal-150 shadow-md">
      <HighPriorityIcon className="w-10 h-10 self-center" />
      <NeutralBlackText text={text} className="self-center" />
    </div>
  );
};
