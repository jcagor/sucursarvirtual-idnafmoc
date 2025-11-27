export interface GrowthPlanReport {
  id?: string; //@id @db.Uuid
  pillar_id: string; //@db.Uuid
  pillar_indicator: string;
  data_source?: string;
  base_line?: number;
  pillar_proposed_goal?: number;
  month_one_goal?: number;
  month_one_real?: number;
  month_two_goal?: number;
  month_two_real?: number;
  month_three_goal?: number;
  month_three_real?: number;
  month_four_goal?: number;
  month_four_real?: number;
  month_five_goal?: number;
  month_five_real?: number;
  month_six_goal?: number;
  month_six_real?: number;
  created_at: string; //?  @db.Timestamptz(6)
  updated_at: string; //?  @db.Timestamptz(6)
  state?: boolean; //?
}

export interface QueryCreateGrowthPlanReport {
  pillar_id: string; //@db.Uuid
  pillar_indicator: string;
  data_source?: string;
  base_line?: number;
  pillar_proposed_goal?: number;
  month_one_goal?: number;
  month_one_real?: number;
  month_two_goal?: number;
  month_two_real?: number;
  month_three_goal?: number;
  month_three_real?: number;
  month_four_goal?: number;
  month_four_real?: number;
  month_five_goal?: number;
  month_five_real?: number;
  month_six_goal?: number;
  month_six_real?: number;
}

export interface QueryUpdateGrowthPlanReport
  extends QueryCreateGrowthPlanReport {
  id: string;
}

export interface GetGrowthPlanReport extends GrowthPlanReport{}
export interface GetGrowthPlanReportList extends Array<GetGrowthPlanReport>{}


