import { CampaignType,Request } from "domain/models";
export interface WorkFlow {
  id: string;
  name: string;
  description: string;
  level_1: string;
  level_2: string;
  consult: string;
  campaignTypeId: number;
  campaignType: CampaignType;
  Requests: Request[];
}
