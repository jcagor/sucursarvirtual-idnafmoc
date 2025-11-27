export interface AnalisysSelfManagemenType {
  GeneralResult: GeneralResult;
  ResultsByLine: ResultsByLine[];
  AnswersByLine: AnswerByLine[];
  ReportAvailable?: boolean;
}

export interface GeneralResult {
  Result: number;
  Maturity: string;
  NumberOpportunities: number;
}

export interface ResultsByLine {
  LineIntervention: string;
  Result: number;
  Maturity: string;
  NumberOpportunities: number;
}

export interface AnswerByLine {
  LineIntervention: string;
  Answers: string[];
}
