import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import digitalIdentity from "./digitalIdentity/digitalIdentitySlice";
import pacSlice from "./pac/pacSlice";
import mpacData from "./mpacStatus/mpacStatusSlice"
import termsAndConditions from "./termsConditions/termsConditionsSlice";
import independentSlice from "./independent/independentSlice";
import siseValidation from "./siseValidation/siseValidationSlice"
import validateTotp from "./validateTotp/validateTotpSlice";
import fospecValidation from "./fospecValidation/fospecValidationSlice";
import alertReducer from "./alert/alertSlice";
import pensionerAffiliations from "./pensionerAffiliations/pensionerAffiliationsSlice";
import setsapRights from "./sapRights/sapRightsSlice";
import rnecReducer from "./rnec/rnecSlice";

export const store = configureStore({
  reducer: {
    digitalIdentity,
    mpacData,
    pacSlice,
    termsAndConditions,
    validateTotp,
    siseValidation,
    independentSlice,
    fospecValidation,
    alert: alertReducer,
    pensionerAffiliations,
    setsapRights,
    rnec: rnecReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
