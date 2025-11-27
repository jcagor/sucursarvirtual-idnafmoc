export interface TextInterface {
  text: string;
  className?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export interface MultipleTextInterface {
  text: string[];
  className?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  replaceClassname?: boolean;
}