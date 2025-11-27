import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface SiseValidationState {
  status: string;
  observation: string;
  loading: boolean;
}

const initialState: SiseValidationState = {
  status: "LOADING",
  observation: "",
  loading: false,
};

const SiseValidationSlice = createSlice({
  name: "siseValidation",
  initialState,
  reducers: {
    setSiseValidationSelected(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setSiseObservation(state, action: PayloadAction<string>) {
      state.observation = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetSiseValidation(state) {
      state.status = initialState.status;
      state.observation = initialState.observation;
      state.loading = initialState.loading;
    },
  },
});

export const {
  setSiseValidationSelected,
  setSiseObservation,
  resetSiseValidation,
  setLoading,
} = SiseValidationSlice.actions;

export default SiseValidationSlice.reducer;
