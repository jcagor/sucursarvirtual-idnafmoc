import { SingleAswerType } from "./SingleAswerType";

export interface PsyTestExamType {
  id: string;
  examName: string;
  singleAnswers: SingleAswerType[];
}
