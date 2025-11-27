import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { MPAC_USER_ROLE, MpacUserSessionStatus, SelectOption } from "lib";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: MpacUserSessionStatus = {
  userRole: MPAC_USER_ROLE.unknown,
  selectedBusiness: undefined,
};

const MpacUserDataSlice = createSlice({
  name: "MpacUserStatus",
  initialState,
  reducers: {
    setMpacUserRole(state, action: PayloadAction<MPAC_USER_ROLE>) {
      state.userRole = action.payload;
    },
    setMpacUserBusiness(state, action: PayloadAction<SelectOption>) {
      state.selectedBusiness = action.payload;
    },
    resetMpacData(state) {
      state.userRole = initialState.userRole;
      state.selectedBusiness = initialState.selectedBusiness;
    },
  },
});

export const { setMpacUserRole, setMpacUserBusiness, resetMpacData } =
  MpacUserDataSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  MpacUserDataSlice.reducer
);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const reduxPersistor = persistStore(reduxStore);
