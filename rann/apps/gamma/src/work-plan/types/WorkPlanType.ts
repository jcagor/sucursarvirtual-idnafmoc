export interface WorkPlanIndicatorType {
  indicator: string;
  baseline: number;
  finalValue: number;
  unit: string;
  goal: number;
  mobility: number;
}

export interface WorkPlanIndicatorList extends Array<WorkPlanIndicatorType> {}

export interface WorkPlanType {
  businessProfile_id?: string;
  keyActivity: string;
  indicators: WorkPlanIndicatorList;
  topicsToDiscuss: string[];
}

export interface WorkPlanReportType {
  id: string;
  businessName: string;
  businessProfile_id: string;
  workPlan: WorkPlanType;
  createdAt: string;
  updatedAt: string;
}

export interface WorkPlanReportList extends Array<WorkPlanReportType> {}

export interface WorkPlanReportQueryType {
  businessProfile_id?: string;
}
