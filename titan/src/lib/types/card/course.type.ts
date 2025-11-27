import { CourseScheduleType } from "presentation/components/templates/training/training.types";

export interface LinkCourseCardInterface {
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
  duration: string
  prefetch?: boolean;
  subsidies2Fa?: boolean;
  schedule?:CourseScheduleType;
  onClick?: () => void;
}
