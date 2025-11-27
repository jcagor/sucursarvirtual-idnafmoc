import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "domain/models/identityWorker";

interface RnecState {
  dataRnec: DocumentData | null;
  stateRnec: string;
  onOpenModal: boolean;
  onOpenModalErrorMessage: boolean;
  documentType: string;
  documentNumber: string;
}

const initialState: RnecState = {
  dataRnec: null,
  stateRnec: "",
  onOpenModal: false,
  onOpenModalErrorMessage: false,
  documentType: "",
  documentNumber: "",
};

const rnecSlice = createSlice({
  name: "rnec",
  initialState,
  reducers: {
    setOnOpenModalErrorMessage(state, action: PayloadAction<boolean>) {
      state.onOpenModalErrorMessage = action.payload;
    },
    setDataRnec(state, action: PayloadAction<DocumentData>) {
      state.dataRnec = action.payload;
    },
    setStateRnecFlow(state, action: PayloadAction<string>) {
      state.stateRnec = action.payload;
    },
    setOnOpenModal(state, action: PayloadAction<boolean>) {
      state.onOpenModal = action.payload;
    },
    setDocumentData(
      state,
      action: PayloadAction<{ documentType: string; documentNumber: string }>
    ) {
      state.documentType = action.payload.documentType;
      state.documentNumber = action.payload.documentNumber;
    },
  },
});

export const {
  setOnOpenModalErrorMessage,
  setDataRnec,
  setStateRnecFlow,
  setOnOpenModal,
  setDocumentData,
} = rnecSlice.actions;

export default rnecSlice.reducer;
