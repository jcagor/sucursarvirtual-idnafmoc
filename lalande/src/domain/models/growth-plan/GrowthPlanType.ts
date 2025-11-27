export interface GrowthPlanType {
  id?: string;
  businessProfile_id?: string;
  growthPlan: {
    Name: string;
    Vision: string;
    Purpose: string;
    Roles: string;
    Challenges: string;
    Resources: string;
    Results: string;
  }[];
}
