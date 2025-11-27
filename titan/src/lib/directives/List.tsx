import React, { type ReactNode } from "react";

interface ListRendererProps<T> {
  items: T[];
  children: (item: T, index: number) => ReactNode;
}

type ListProps = <T>({ items, children }: ListRendererProps<T>) => ReactNode;

const List: ListProps = ({ items, children }) => {
  return <>{items?.map(children)}</>;
};

export { List };
