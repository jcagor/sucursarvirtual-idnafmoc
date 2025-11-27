"use client";

import { CustomTextarea } from "presentation/components/atoms";
import { FileInput } from "./FileInput";
import { useState } from "react";

type MilestonesProps = {};

type MilestonesType = {
  number: number;
};

const milestonesProp: MilestonesType[] = [
  {
    number: 1,
  },
  {
    number: 2,
  },
];

export const Milestones = () => {
  const [milestones, setMilestone] = useState<MilestonesType[]>(milestonesProp);
  return (
    <div className="flex flex-col gap-3 py-3 justify-center items-center">
      {milestones.map((milestone: MilestonesType) => {
        return <Mileston key={milestone.number} number={milestone.number} />;
      })}
      <div
        className="w-10 h-10 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
        onClick={() =>
          setMilestone((prev) => [...prev, { number: prev.length + 1 }])
        }
        onKeyDown={() => {}}
      >
        +
      </div>
    </div>
  );
};

type MilestonProps = {
  number: number;
};

const Mileston = (props: MilestonProps) => {
  const { number } = props;
  return (
    <div className="flex flex-col w-full gap-2 mb-2">
      <div className="flex flex-col bg-principal-150 text-principal-450 border border-principal-400 rounded">
        <div className="flex flex-row py-1 border-b border-principal-400">
          <div className="w-10 text-center">{number}</div>
          <div>Hitos</div>
        </div>
        <CustomTextarea
          name="ComplianceWithResults"
          id="ComplianceWithResults"
          placeholder="Publicar la página web el 30 de marzo para que los clientes puedan empezar a usarla."
          classNameTextArea="border-none focus:outline-none"
        />
      </div>
      <div>
        <FileInput />
      </div>
    </div>
  );
};
