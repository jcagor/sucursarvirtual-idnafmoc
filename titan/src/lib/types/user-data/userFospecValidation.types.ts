export interface UserFospecValidationInterface {
  status: boolean;
  response_code: number;
}

export interface UserTrainingEntityInterface{
  label: string; 
  value: string;
}

export interface UserTrainingEntity{
  training: UserTrainingEntityInterface[];
  workshop: UserTrainingEntityInterface[];
}

export interface UserWorkShopEntity{
  workshop: UserTrainingEntityInterface[];
  training: UserTrainingEntityInterface[];
}

export interface UserFospecTrainingInterface extends Array<UserTrainingEntity | UserWorkShopEntity>{}

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

export interface OpenJobsList extends Array<OpenJob>{

}

export interface PostulationServerResponse{
  created_at:string,
  updated_at:string,
  information: string;
  document_type: string;
  document_number: string;
  job_offer_id:string,
  postulation_status:string,
  state: string|null;
}

export interface PostulationListServerResponse extends Array<PostulationServerResponse>{
}