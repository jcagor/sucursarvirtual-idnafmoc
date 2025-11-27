import { ReactNode } from "react";

export interface TextInterface {
  text: string;
  className?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  replaceClassname?: boolean;
}

export interface MultipleTextInterface {
  text: string[];
  className?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  replaceClassname?: boolean;
}

export interface InfoSectionInterface {
  topText?: string;
  description: string;
  classNameDescription?: string;
  aditionalDescription?: string;
  returnButton?: boolean;
  returnPath?: string;
  onClickReturn?: () => void;
}

export interface DynamicContentBlockInterface {
  topText?: string;
  mainTitle: string;
  description: string;
  className?: string;
  children?: ReactNode;
}
