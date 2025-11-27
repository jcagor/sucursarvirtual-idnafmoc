"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  CustomInputOne,
  CustomTextarea,
  FileInput,
  NeutralBlackText,
  NumberCircle,
} from "presentation";
import { FormikErrors } from "formik";

type MilestonesType = {
  number: number;
  percentageOfProgress: number;
  description: string;
  file: File | null;
};

interface SectionFourthMonthlyReportProps {
  values: { milestones: MilestonesType[] };
  errors: FormikErrors<{ milestones: MilestonesType[] }>;
  touched: {};
  submitCount: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFieldValue: (field: string, value: any) => void;
}

export const SectionFourthMonthlyReport: React.FC<
  SectionFourthMonthlyReportProps
> = ({
  values,
  errors,
  touched,
  submitCount,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const updateFile = (number: number, file: File | null) => {
    const updated = values.milestones.map((milestone) =>
      milestone.number === number ? { ...milestone, file } : milestone
    );
    setFieldValue("milestones", updated);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <NumberCircle number={4} />
        <TertiaryTitle
          text="Identificación de oportunidades"
          className="ml-3"
        />
      </div>

      <div className="flex flex-col gap-3 py-3 justify-center items-center">
        {values.milestones.map(({ number, file }) => {
          return (
            <div key={number} className="flex flex-col w-full gap-2 mb-2">
              <div className="flex flex-col bg-principal-150 text-principal-450 border border-principal-400 rounded">
                <div className="flex flex-row py-1 border-b border-principal-400">
                  <div className="w-10 text-center">{number}</div>
                  <div>Hitos</div>
                </div>
                <div className="flex flex-row py-3 gap-3 items-center pl-2 border-b border-principal-400 ">
                  <div>Porcetaje de avance:</div>
                  <CustomInputOne
                    type="number"
                    id={`milestones.${number - 1}.percentageOfProgress`}
                    name={`milestones.${number - 1}.percentageOfProgress`}
                    value={values.milestones[number - 1].percentageOfProgress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ClassNameContainer="h-auto w-14 m-0  border-b border-principal-400 focus:outline-none focus:border-principal-100"
                    ClassNameInput="h-auto py-1 border-none py-0"
                    simpleInput
                  />
                </div>
                <CustomTextarea
                  name={`milestones.${number - 1}.description`}
                  id={`milestones.${number - 1}.description`}
                  value={values.milestones[number - 1].description || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Publicar la página web el 30 de marzo para que los clientes puedan empezar a usarla."
                  classNameTextArea="border-none focus:outline-none"
                />
              </div>
              <div>
                <FileInput
                  file={file}
                  setFile={(selectedFile) => {
                    updateFile(number, selectedFile);
                  }}
                  description="Haz clic o arrastra un archivo aquí pdf, word, excel o powerpoint"
                />
              </div>
            </div>
          );
        })}
        <div
          className="w-10 h-10 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
          onKeyUp={() => {}}
          onClick={() => {
            const newMilestone = {
              number: values.milestones.length + 1,
              percentageOfProgress: 0,
              file: null,
            };
            setFieldValue("milestones", [...values.milestones, newMilestone]);
          }}
        >
          +
        </div>
      </div>
    </>
  );
};
