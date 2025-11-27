import { type ReactNode } from "react";

/**
 * Represents a conditional rendering component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.showWhen - Determines if the children should be rendered.
 * @param {ReactNode} props.children - The children to be rendered.
 * @returns {(ReactNode|null)} - The rendered children if `showWhen` is `true`, otherwise `null`.
 */
const Conditional = ({
  showWhen,
  children,
}: {
  showWhen: boolean;
  children: ReactNode;
}): ReactNode | null => {
  return showWhen && children;
};

export { Conditional };
