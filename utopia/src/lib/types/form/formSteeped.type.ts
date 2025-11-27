import { RefObject } from "react";

export interface FormProps {
  formRef: RefObject<HTMLFormElement> | null;
  nextSteepFn: Function;
  previousSteepFn: Function;
  formSelectOptionsFn: Function;
  dataStorageGetFn: Function;
  dataStorageSetFn: Function;
}
