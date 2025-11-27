import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ValdiateTotpState {
  verify: boolean | null;
  messageError: string;
  loading: boolean;
}

const initialState: ValdiateTotpState = {
  verify: null,
  messageError: "",
  loading: false,
};

const validateTotpSlice = createSlice({
  name: "totpValidate",
  initialState,
  reducers: {
    setVerifyTotp(state, action: PayloadAction<{valid: boolean, messageError: string}>) {
      state.verify = action.payload.valid;
      state.messageError = action.payload.messageError;
    },
    reVerifyTotp(state) {
      state.verify = null;
    }, 
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setVerifyTotp,
  reVerifyTotp, 
  setLoading 
} = validateTotpSlice.actions;

export default validateTotpSlice.reducer;
