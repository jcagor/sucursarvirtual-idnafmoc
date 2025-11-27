import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BUSINESS_STATUS } from "lib";

interface BusinessStatusState {
  State: BUSINESS_STATUS;
}

const initialState: BusinessStatusState = {
  State: BUSINESS_STATUS.INVALIDATED,
};

const businessStatusSlice = createSlice({
  name: "businessStatus",
  initialState,
  reducers: {
    setBusinessStatus(state, action: PayloadAction<BUSINESS_STATUS>) {
      state.State = action.payload;
    },
    resetBusinessStatus(state) {
      state.State = BUSINESS_STATUS.INVALIDATED;
    },
  },
});

export const { setBusinessStatus, resetBusinessStatus } =
  businessStatusSlice.actions;
export default businessStatusSlice.reducer;
