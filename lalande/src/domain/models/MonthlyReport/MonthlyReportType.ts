export interface MonthlyReportType {
  introduction: string;
  companyName: string;
  businessId: string;
  budgetedHoursPerMonth: number;
  hoursExecutedPerMonth: number;
  expectedProgressPercentage: number;
  totalProgress: number;
  lineOfIntervention: string;
  associatedIndicators: string;
  conclusions: string;
  interventionCompanyName: string;
  prioritisedLineOfIntervention: string;
  indicatorsProgress: number;
  actionPlanDuringTheExecutionPeriod: string;
  description: string;
  complianceWithResults: string;
  milestones: MilestonesList;
  milestoneInterventions: {
    capital: string;
    newMarkets: string;
    newSuppliers: string;
    others: string;
    observations: string;
  }[];
  reportFindings: {
    improvementOpportunity: string;
    actionPlan: string;
    correctionDate: Date;
  }[];
  hoursRecorded: number;
  valueBeforeIVA: number;
  valueIVA: number;
  valueIncludedIVA: number;
  annexes: {
    annexType: string;
    quantity: string;
    detail: string;
  }[];
  urlPowerBi: string;
}

export interface QueryMonthlyReportAdmin {
  businessId: string;
}

export interface MonthlyReportResponse {
  id: string;
  document_type_id: string;
  document_number: string;
  data: MonthlyReportType;
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthlyReportResponseList
  extends Array<MonthlyReportResponse> {}

/** MILESTONES REPORT TYPES */
export interface BusinessMilestones {
  number: number;
  percentageOfProgress: number;
  description: string;
  file: File | null;
}

export interface MilestonesList extends Array<BusinessMilestones> {}
export interface MilestonesHistory extends Array<MilestonesList> {}

export interface MilestonesReport {
  bla?: string;
  businessName: string;
  businessId: string;
  milestones: MilestonesHistory;
}

export interface MilestonesReportList extends Array<MilestonesReport> {}
