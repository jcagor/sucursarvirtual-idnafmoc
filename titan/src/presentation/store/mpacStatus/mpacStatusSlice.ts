import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { UserMpacDataInterface } from "lib";

interface MpacDataState {
  status: string;
  observation: string;
  loading: boolean;
  server_response : UserMpacDataInterface | undefined;
}

const initialState: MpacDataState = {
  status: "LOADING",
  observation: "",
  loading: false,
  server_response: undefined
};

const MpacDataSlice = createSlice({
  name: "MpacData",
  initialState,
  reducers: {
    setMpacDataSelected(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setMpacObservation(state, action: PayloadAction<string>) {
      state.observation = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setServerResponse(state, action: PayloadAction<UserMpacDataInterface | undefined>){
      state.server_response = action.payload;
    },
    resetMpacData(state) {
      state.status = initialState.status;
      state.observation = initialState.observation;
      state.loading = initialState.loading;
      state.server_response = initialState.server_response;
    },
  },
});

export const {
  setMpacDataSelected,
  setMpacObservation,
  resetMpacData,
  setLoading,
  setServerResponse,
} = MpacDataSlice.actions;

export default MpacDataSlice.reducer;
