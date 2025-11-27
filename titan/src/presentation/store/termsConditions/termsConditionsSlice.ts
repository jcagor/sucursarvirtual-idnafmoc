import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TermsAndConditionsSlice {
  bometricTerms: boolean;
}

const initialState: TermsAndConditionsSlice = {
  bometricTerms: false,
};

const termsAndConditionsSlice = createSlice({
  name: "termsAndConditions",
  initialState,
  reducers: {
    setBiometricTermCondition(state, action: PayloadAction<boolean>) {
      state.bometricTerms = action.payload;
    },
  },
});

export const { setBiometricTermCondition } = termsAndConditionsSlice.actions;

export default termsAndConditionsSlice.reducer;
