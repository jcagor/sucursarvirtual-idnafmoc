import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAC } from "domain/models";

interface PacState {
  pac: PAC | undefined;
}

const initialState: PacState = {
  pac: undefined,
};

/**
 * Slice for PAC state management, used to handle values between components and screens, is related to Affiliations module
 */
const pacSlice = createSlice({
  name: "pac",
  initialState,
  reducers: {
    setPacState(state, action: PayloadAction<PAC | undefined>) {
      state.pac = action.payload;
    },
  },
});

export const { setPacState } = pacSlice.actions;

export default pacSlice.reducer;
