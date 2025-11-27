import { type ReactElement, useCallback, useState } from "react";
import { Conditional } from "lib/directives";
import { CloseIcon } from "presentation/components/atoms";

const ModalSecondTemplate = ({
  className,
  children,
  isOpen = true,
  onButtonClick,
}: {
  className?: string;
  children: ReactElement;
  isOpen?: boolean;
  onButtonClick: () => void;
}): JSX.Element => {
  return (
    <Conditional showWhen={isOpen}>
      <section
        className={
          "fixed inset-0 z-50 w-full h-auto bg-principal-800 grid place-items-center "
        }
      >
        <div
          className={`relative bg-principal-650 min-w-[3em] min-h-[2em] rounded-2xl shadow-[0_.6em_.65em_rgba(0,60,106,0.07)] px-4 pt-3 pb-6 ${className}`}
        >
          <button onClick={onButtonClick}>
            <CloseIcon className={"top-2 right-2"} />
          </button>
          <section className={"grid"}>{children}</section>
        </div>
      </section>
    </Conditional>
  );
};

export { ModalSecondTemplate };
