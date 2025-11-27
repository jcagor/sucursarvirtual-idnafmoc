"use client";

import { CustomInputOne, CustomTextarea, FileInput } from "presentation";
import { useCallback, useState } from "react";

type MilestonesType = {
  number: number;
  percentageOfProgress: number;
  file: File | null;
};

const milestonesProp: MilestonesType[] = [
  { number: 1, percentageOfProgress: 0, file: null },
  { number: 2, percentageOfProgress: 0, file: null },
];

export const Milestones = () => {
  const [milestones, setMilestone] = useState<MilestonesType[]>(milestonesProp);

  const updateFile = (number: number, file: File | null) => {
    console.log("Updating file for milestone", number, file);
    setMilestone((prev) =>
      prev.map((milestone) =>
        milestone.number === number ? { ...milestone, file } : milestone
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 py-3 justify-center items-center">
      {milestones.map(({ number, file }) => {
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
                  id={`percentageOfProgress-${number}`}
                  ClassNameContainer="h-auto w-14 m-0  border-b border-principal-400 focus:outline-none focus:border-principal-100"
                  ClassNameInput="h-auto py-1 border-none py-0"
                  simpleInput
                />
              </div>
              <CustomTextarea
                name={`ComplianceWithResults-${number}`}
                id={`ComplianceWithResults-${number}`}
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
              />
            </div>
          </div>
        );
      })}
      <div
        className="w-10 h-10 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
        onClick={() =>
          setMilestone((prev) => [
            ...prev,
            { number: prev.length + 1, percentageOfProgress: 0, file: null },
          ])
        }
        tabIndex={0}
        role="button"
      >
        +
      </div>
    </div>
  );
};
