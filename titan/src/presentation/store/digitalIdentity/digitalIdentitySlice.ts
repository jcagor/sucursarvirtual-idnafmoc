import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DigitalIdentityState {
  status: string;
  loading: boolean;
}

const initialState: DigitalIdentityState = {
  status: "LOADING",
  loading: false,
};

const digitalIdentitySlice = createSlice({
  name: "digitalIdentity",
  initialState,
  reducers: {
    setDigitalIdentitySelected(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    resetDigitalIdentity(state) {
      state = initialState;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setDigitalIdentitySelected, resetDigitalIdentity, setLoading } =
  digitalIdentitySlice.actions;

export default digitalIdentitySlice.reducer;
