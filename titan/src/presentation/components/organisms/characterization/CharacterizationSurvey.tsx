"use client";

import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "survey-core/survey-core.min.css";

export const CharacterizationSurvey = ({ model }: { model: Model }) => {
  return (
    <div className="w-full">
        <Survey model={model} />
    </div>
  );
};
