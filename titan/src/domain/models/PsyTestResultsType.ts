import { PsyTestCompetencyKey, PsyTestDimensionKey } from "lib";

export interface DimensionType {
  optimal: number;
  obtained: number;
  percentage: number;
}

export interface CompetitionType {
  dimensions: Record<PsyTestDimensionKey, DimensionType>;
  percentage: number;
}

export interface PsyTestResultType {
  by_dimension: Record<PsyTestDimensionKey, number>;
  by_competition: Record<PsyTestCompetencyKey, CompetitionType>;
}

export interface PsyTestPending{
  assignationId: string;
  assignationCurrentStatus: string;
  assignationCreatedAt: string;
  psyTestExamId: string;
  psyTestExamName: string;
  psyTestExamCreatedAt: string;
}

export interface PsyTestPendingList extends Array<PsyTestPending>{};
