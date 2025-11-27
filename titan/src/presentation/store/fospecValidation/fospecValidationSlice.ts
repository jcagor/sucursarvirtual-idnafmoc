import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface FospecValidationState {
  status: string;
  observation: string;
  loading: boolean;
}

const initialState: FospecValidationState = {
  status: "LOADING",
  observation: "",
  loading: false,
};

const FospecValidationSlice = createSlice({
  name: "fospecValidation",
  initialState,
  reducers: {
    setFospecValidationSelected(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setFospecObservation(state, action: PayloadAction<string>) {
      state.observation = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetFospecValidation(state) {
      state.status = initialState.status;
      state.observation = initialState.observation;
      state.loading = initialState.loading;
    },
  },
});

export const {
  setFospecValidationSelected,
  setFospecObservation,
  resetFospecValidation,
  setLoading,
} = FospecValidationSlice.actions;

export default FospecValidationSlice.reducer;
