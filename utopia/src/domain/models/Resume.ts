import { SelectOption } from "lib";

export interface KnowledgeAndSkills {
  knowledge: Array<SelectOption> | undefined;
  skills: Array<SelectOption> | undefined;
  additionalInformation: string | undefined;
  formationName: string;
  institution: string;
  duration: string;
}
