"use client";

import BackButton from "presentation/components/organisms/affiliations/pacs/BackButton";

export default function WithBackButton({
  children,
  secondButton,
}: {
  children: React.ReactNode;
  secondButton?: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="w-full flex flex-row justify-between mt-4 mb-4">
        <BackButton />
        {secondButton}
      </div>
    </>
  );
}
