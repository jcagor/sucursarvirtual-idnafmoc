"use client";

import Image from "next/image";
import { NeutralBlackText } from "../text";

interface CardCheckboxProps {
  imageSrc: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

const CardCheckbox: React.FC<CardCheckboxProps> = ({
  imageSrc,
  text,
  selected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      className={`flex flex-col items-center relative bg-principal-150 rounded-lg overflow-hidden cursor-pointer py-4 ${
        selected ? "border-2 border-principal-180" : ""
      }`}
    >
      <div className="flex items-center h-5/6 ">
        <img src={imageSrc} alt={text} className="w-24 object-cover" />
      </div>
      <div className="text-center p-2">
        <p className="text-sm font-semibold text-principal-180">{text}</p>
      </div>
      {selected && (
        <div className="absolute top-2 right-2">
          <Image
            src={"/utopia/icons/check.svg"}
            alt="Image business profile"
            width={25}
            height={25}
            className="relative"
          />
        </div>
      )}
    </div>
  );
};

interface Card {
  id: string;
  imageSrc: string;
  text: string;
}

type TitleCustomCardSelectProps = {
  title?: string;
  errors?: React.ReactNode;
  cards: Card[];
  value?: string;
  onChange?: (value: string) => void;
};

export const CardSelect: React.FC<TitleCustomCardSelectProps> = (
  props: TitleCustomCardSelectProps
) => {
  const { title = "", errors, cards, value, onChange } = props;

  const handleCardSelect = (id: string) => {
    if (onChange) {
      onChange(value === id ? "" : id);
    }
  };

  return (
    <div className="w-full h-full">
      <NeutralBlackText className={"text-principal-450 pb-2"} text={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <CardCheckbox
            key={card.id}
            imageSrc={card.imageSrc}
            text={card.text}
            selected={value === card.id}
            onSelect={() => handleCardSelect(card.id)}
          />
        ))}
      </div>
      {errors && (
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      )}
    </div>
  );
};
