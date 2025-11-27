import { List } from "lib/directives";
import {
  RedirecCardProperty,
  RedirectCard,
} from "presentation/components/molecules";
import { type FC } from "react";

interface RedirectCardListParams {
  redirectButtons: RedirecCardProperty[];
  className?: string;
}

const RedirectCardList: FC<RedirectCardListParams> = ({
  redirectButtons,
  className,
}) => {
  return (
    <span className={`flex flex-1 gap-8 ${className}`}>
      <List items={redirectButtons}>
        {(redirectButton, index) => (
          <RedirectCard key={index} {...redirectButton} />
        )}
      </List>
    </span>
  );
};

export { RedirectCardList };
export type { RedirectCardListParams };
