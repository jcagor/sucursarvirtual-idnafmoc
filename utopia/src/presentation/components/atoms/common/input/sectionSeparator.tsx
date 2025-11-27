import { type FC } from "react";

type SectionSeparatorProps = Partial<{ className: string }>;

const SectionSeparator: FC<SectionSeparatorProps> = ({ className }) => {
  return <div className={`border-principal-600 mb-4 border ${className}`} />;
};

export { SectionSeparator };
