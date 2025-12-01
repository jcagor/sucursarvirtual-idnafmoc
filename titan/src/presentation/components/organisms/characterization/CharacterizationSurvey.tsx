"use client";

import { Survey } from "survey-react-ui";
import { Model } from "survey-core";

interface Props {
  json: any;
  onComplete?: (data: any) => void;
  onPageChange?: (index: number) => void;
}

export const CharacterizationSurvey = ({
  json,
  onComplete,
  onPageChange,
}: Props) => {
  const survey = new Model(json);

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("characterization-progress");
    if (saved) survey.state = saved;

    survey.onCurrentPageChanged.add((sender, options) => {
      localStorage.setItem("characterization-progress", sender.state);
      onPageChange?.(sender.currentPageNo);
    });

    survey.onComplete.add((sender) => {
      onComplete?.(sender.data);
      localStorage.removeItem("characterization-progress");
    });
  }

  return <Survey model={survey} />;
};
