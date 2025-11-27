import { FC } from "react";

interface UserCardProps {
  name: string;
  document: string;
  classname?: string;
}

const UserCard: FC<UserCardProps> = ({ name, document, classname }) => (
  <div
    className={`rounded-[1.25rem] shadow-lg bg-principal-150 flex flex-col w-[21.5rem] h-[8.75rem] justify-center items-start ${classname}`}
  >
    <h3 className="text-2xl font-medium font-outfit text-principal-180 ml-8">
      {name}
    </h3>
    <h3 className="text-2xl font-medium font-outfit text-principal-180 ml-8">
      {document}
    </h3>
  </div>
);

export { UserCard };
export type { UserCardProps };
