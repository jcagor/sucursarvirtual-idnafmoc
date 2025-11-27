export interface ButtonInterface {
  label?: string;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
  useFullWidth?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
}
