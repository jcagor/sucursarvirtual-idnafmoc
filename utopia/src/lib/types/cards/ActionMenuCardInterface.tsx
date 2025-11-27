export interface ActionMenuCardInterface {
  url?: string;
  imageUrl: string;
  text: string;
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