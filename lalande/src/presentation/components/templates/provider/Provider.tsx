"use client";

import { reduxStore } from "presentation/store/mpacUserStatus/mpacUserStatusSlice";
import React from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
