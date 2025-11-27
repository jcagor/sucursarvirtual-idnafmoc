import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Alert {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (
      state,
      action: PayloadAction<{
        message: string;
        type: Alert["type"];
      }>
    ) => {
      const id = Date.now();
      state.alerts.push({ id, ...action.payload });
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
