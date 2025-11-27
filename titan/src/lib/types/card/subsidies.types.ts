export interface LinkCardInterface {
  name: string;
  href: string;
  urlImage: string;
  width: number;
  height: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  externalLink?: boolean;
  hidden?: boolean;
  betaAccess?: string[];
  description?: string;
  prefetch?: boolean;
  subsidies2Fa?: boolean;
  hideInKiosk?: boolean;
}

export interface DescriptionLinkCardInterface {
  name: string;
  href: string;
  urlImage: string;
  width: number;
  height: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  externalLink?: boolean;
  hidden?: boolean;
  betaAccess?: string[];
  description?: string[];
  prefetch?: boolean;
  subsidies2Fa?: boolean;
  canAccess: string[];
}

export interface DescriptionActionCardInterface {
  name: string;
  action: () => void;
  urlImage: string;
  width: number;
  height: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  externalLink?: boolean;
  hidden?: boolean;
  betaAccess?: string[];
  description?: string[];
  prefetch?: boolean;
  subsidies2Fa?: boolean;
  canAccess: string[];
  loading?: boolean;
}

export interface ActionMenuCardInterface {
  name: string;
  action: () => void;
  urlImage: string;
  width?: number;
  height?: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  externalLink?: boolean;
  hidden?: boolean;
  betaAccess?: string[];
  description?: string;
  loading?: boolean;
  hideInKiosk?: boolean;
}

export interface JobActionCardInterface {
  title: string;
  subtitle: string;
  salary: string;
  publishedTime: string;
  activeCard: boolean;
  action: () => void;
  urlImage: string;
  width: number;
  height: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  externalLink?: boolean;
  hidden?: boolean;
  betaAccess?: string[];
  description?: string;
  loading?: boolean;
}
