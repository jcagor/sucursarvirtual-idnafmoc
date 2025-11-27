export interface ItemInterface {
  isSelected: boolean;
  label?: string;
  isDark?: boolean;
  path?: string;
  externalLink?: boolean;
  externalLinkImage?: string;
}

export interface ItemMenuInterface {
  path: string;
  label: string;
  externalLink?: boolean;
  externalLinkImage?: string;
  betaAccess?: string[];
}
