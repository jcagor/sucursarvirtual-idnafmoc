import { OpenJob } from "lib";

export interface JobPostulation{
    jobOfferId :  string;
    jobOffer : OpenJob;
}

export interface JobPostulationList extends Array<JobPostulation>{};