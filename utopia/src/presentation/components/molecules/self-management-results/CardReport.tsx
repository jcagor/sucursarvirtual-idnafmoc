import Image from "next/image";

interface Props {
  Title: string;
  Text: string;
  Icon: string;
  ReportAvailable: boolean;
  onClickReport: () => void;
}

const CardReport: React.FC<Props> = (props: Props) => {
  const { Title, Text, Icon } = props;
  return (
    <div className="bg-principal-150 rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3">
        <Image src={Icon} alt="img" width={35} height={40} />
        <div className="text-principal-180 font-bold text-lg">{Title}</div>
      </div>
      <div className="text-principal-450 mt-3 text-sm leading-relaxed">
        {Text}
      </div>
      {props.ReportAvailable && (
        <div className="flex justify-start mt-3">
          <button
            onClick={props.onClickReport}
            className="text-principal-450 font-bold underline"
          >
            Ver reporte
          </button>
        </div>
      )}
    </div>
  );
};

export default CardReport;
