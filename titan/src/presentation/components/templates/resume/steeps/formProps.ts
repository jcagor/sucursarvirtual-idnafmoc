import { ResumeServerResponse } from "domain/models";
import { UserSiseResumeInformation } from "lib";
import { RefObject } from "react";

export interface FormProps {
    formRef: RefObject<HTMLFormElement>;
    nextSteepFn:Function;
    previousSteepFn:Function;
    formSelectOptionsFn:Function;
    formFilterSelectOptionsFn?:Function;
    siseResume?:UserSiseResumeInformation;
    resumeData?:ResumeServerResponse;
    updateResumeDataFn?:Function;
  }