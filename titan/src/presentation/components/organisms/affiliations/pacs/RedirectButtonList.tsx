import {
  RedirectButton,
  type RedirectButtonProperty,
} from "presentation/components/molecules";
import { type FC } from "react";

interface RedirectButtonListParams {
  redirectButtons: RedirectButtonProperty[];
  className?: string;
}

const RedirectButtonList: FC<RedirectButtonListParams> = ({
  redirectButtons,
  className,
}) => {
  return (
    <div className={`mt-10 grid grid-cols-2 w-fit gap-12 ${className}`}>
      {redirectButtons.map((redirectButton, index) => (
        <div key={index} className="min-w-56">
          <RedirectButton key={index} {...redirectButton} />
        </div>
      ))}
    </div>
  );
};

export { RedirectButtonList };
export type { RedirectButtonListParams };
