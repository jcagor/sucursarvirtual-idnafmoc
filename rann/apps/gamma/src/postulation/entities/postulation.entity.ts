export class Postulation {}

export interface JobRequirement {
    label:string;
    value:string; 
}

export interface OpenJob{
    jobId:string,
    title:string;
    description:string;
    activityDetails:string;
    startDate:string;
    businessName:string;
    city:string;
    state:string;
    jobSchedule:string;
    jobRequirements:Array<JobRequirement>;
    incorporationType:string;
    jobLocation:string;
    monthSalary:string;
  }

export const POSTULATION_STAGES = {
    PENDING:"PENDING",
    APPROVED:"APPROVED",
    DECLINED:"DECLINED",    
}