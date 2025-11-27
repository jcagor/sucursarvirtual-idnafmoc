import Image from "next/image";

interface Props {
  Title: string;
  Text: string;
  ClassName?: string;
  Icon: string;
  IconWidth: number;
  IconHeight: number;
}

const CardResults: React.FC<Props> = (props: Props) => {
  const { Title, Text, ClassName, Icon, IconWidth, IconHeight } = props;

  return (
    <div
      className={`flex flex-col justify-center w-full p-2 lg:p-6 rounded-xl shadow-md ${ClassName}`}
    >
      <div className="flex flex-row justify-between gap-4">
        <p className="flex items-center text-principal-450">{Title}</p>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-principal-150">
          <Image
            src={Icon}
            alt="Image business profile"
            width={IconWidth}
            height={IconHeight}
            className="text-blue-500"
          />
        </div>
      </div>
      <div className="text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-principal-450">
        {Text}
      </div>
    </div>
  );
};

export default CardResults;
