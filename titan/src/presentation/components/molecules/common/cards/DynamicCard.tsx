import { generateUniqueKey } from "lib";
import { FC } from "react";

interface DinamicCardProps {
  content: Record<string, string>;
  classname?: string;
}

export const DynamicCard: FC<DinamicCardProps> = ({ content, classname }) => (
  <div className={`flex flex-col h-auto items-start ${classname}`}>
    {Object.entries(content).map((key, value) => {
      return (
        <div key={generateUniqueKey()} className="flex flex-row mx-6 my-2">
          <h3 className="text-lg font-medium font-outfit text-principal-180 justify-self-start mr-2">
            {`${key[0]}:`}
          </h3>
          <br></br>
          <h3 className="text-lg font-normal font-outfit text-principal-350 justify-self-start">
            {` ${key[1]}`}
          </h3>
        </div>
      );
    })}
  </div>
);

export type { DinamicCardProps };
