export interface Campaign {
  id?: string;
  name: string;
  campaignTypeId?: number;
  startDate?: string;
  endDate?: string;
  claimStartDate?: string;
  claimEndDate?: string;
  campaignConfigId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  campaignType?: CampaignType;
  campaignConfigurations?: CampaignConfigurations;
}
export interface CampaignType {
  id: number;
  name: string;
  description: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignConfigurations {
  id?: number;
  recipient?: number;
  description?: string;
  termsAndConditions?: string;
  info?: string;
  image?: File | string;
  configuration?: Object;
  isEnabled?: boolean;
  aditionalBenefit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
