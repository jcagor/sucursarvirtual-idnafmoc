"use client";
import { store, persistor } from "presentation/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
