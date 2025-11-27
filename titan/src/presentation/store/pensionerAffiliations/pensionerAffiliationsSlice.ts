import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectType = {
  label: string;
  value: string;
} | null;

interface PensionerAffiliationsState {
  identificationType: string;
  identificationNumber: string;
  identificationName: string;
  stateRnec: string;
  // Agrega aquí más campos según necesites para el proceso
  currentStep: number;
  isStarted: boolean;
  dataAffiliation: {
    f_name: string;
    s_name: string;
    f_last_name: string;
    s_last_name: string;
    birth_date: string;
  };
  entity: {
    Nit: string;
    RazonSocial: string;
  };
  address: {
    address_type: SelectType;
    nomenclature: SelectType;
    only_number: string;
    letter: SelectType;
    zone: SelectType;
    only_number_2: string;
    letter_2: SelectType;
    only_number_3: string;
    characteristics: SelectType;
    free_text: string;
    address: string;
  };
  informationData: {
    civil_status: SelectType;
    nationality: SelectType;
    gender: SelectType;
    sexual_preference: SelectType;
    academic_level: SelectType;
    vulnerability_fact: SelectType;
    ethnic_affiliation: SelectType;
    reserve: SelectType;
    community: SelectType;
    department: SelectType;
    city: SelectType;
  };
  contactData: {
    email: string;
    phone: string;
  };
  income: {
    salary: string;
    code_eps: SelectType;
    other_affiliation: SelectType;
  };
  modality_input: SelectType;
  filing_code: string;
  state_filing: string;
  flow_url: string;
  flow_type: string;
}

const initialState: PensionerAffiliationsState = {
  identificationType: "",
  identificationNumber: "",
  identificationName: "",
  stateRnec: "",
  currentStep: 1,
  isStarted: false,
  dataAffiliation: {
    f_name: "",
    s_name: "",
    f_last_name: "",
    s_last_name: "",
    birth_date: "",
  },
  entity: {
    Nit: "",
    RazonSocial: "",
  },
  address: {
    address_type: null,
    nomenclature: null,
    only_number: "",
    letter: null,
    zone: null,
    only_number_2: "",
    letter_2: null,
    only_number_3: "",
    characteristics: null,
    free_text: "",
    address: "",
  },
  informationData: {
    civil_status: null,
    nationality: null,
    gender: null,
    sexual_preference: null,
    academic_level: null,
    vulnerability_fact: null,
    ethnic_affiliation: null,
    reserve: null,
    community: null,
    department: {
      label: "VALLE DEL CAUCA",
      value: "31|76",
    },
    city: null,
  },
  contactData: {
    email: "",
    phone: "",
  },
  income: {
    salary: "",
    code_eps: null,
    other_affiliation: null,
  },
  modality_input: null,
  filing_code: "",
  state_filing: "",
  flow_url: "",
  flow_type: "",
};

const pensionerAffiliationsSlice = createSlice({
  name: "pensionerAffiliations",
  initialState,
  reducers: {
    setIdentificationData(
      state,
      action: PayloadAction<{ type: string; number: string }>
    ) {
      state.identificationType = action.payload.type;
      state.identificationNumber = action.payload.number;
    },
    setDataAffiliation(
      state,
      action: PayloadAction<{
        f_name: string;
        s_name: string;
        f_last_name: string;
        s_last_name: string;
        birth_date: string;
      }>
    ) {
      state.dataAffiliation = action.payload;
      state.currentStep = 2;
    },
    setEntity(
      state,
      action: PayloadAction<{ Nit: string; RazonSocial: string }>
    ) {
      state.currentStep = 3;
      state.entity = action.payload;
    },
    setFullAddress(
      state,
      action: PayloadAction<{
        address_type: SelectType;
        nomenclature: SelectType;
        only_number: string;
        letter: SelectType;
        zone: SelectType;
        only_number_2: string;
        letter_2: SelectType;
        only_number_3: string;
        characteristics: SelectType;
        free_text: string;
        address: string;
      }>
    ) {
      state.address = action.payload;
      state.currentStep = 4;
    },
    setInformationData(
      state,
      action: PayloadAction<{
        civil_status: SelectType;
        nationality: SelectType;
        gender: SelectType;
        sexual_preference: SelectType;
        academic_level: SelectType;
        vulnerability_fact: SelectType;
        ethnic_affiliation: SelectType;
        reserve: SelectType;
        community: SelectType;
        department: SelectType;
        city: SelectType;
      }>
    ) {
      state.informationData = action.payload;
    },
    setContactData(
      state,
      action: PayloadAction<{ email: string; phone: string }>
    ) {
      state.contactData = action.payload;
    },
    setFlowUrl(
      state,
      action: PayloadAction<{ flow_url: string; flow_type: string }>
    ) {
      state.flow_url = action.payload.flow_url;
      state.flow_type = action.payload.flow_type;
    },
    setIncome(
      state,
      action: PayloadAction<{
        salary: string;
        code_eps: SelectType;
        other_affiliation: SelectType;
      }>
    ) {
      state.income = action.payload;
    },
    setModalityInput(state, action: PayloadAction<SelectType>) {
      state.modality_input = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setProcessStarted(
      state,
      action: PayloadAction<{ type: string; number: string; name: string }>
    ) {
      state.isStarted = true;
      state.identificationType = action.payload.type;
      state.identificationNumber = action.payload.number;
      state.identificationName = action.payload.name;
    },
    setRequestResume(
      state,
      action: PayloadAction<{ filing_code: string; state_filing: string }>
    ) {
      state.filing_code = action.payload.filing_code;
      state.state_filing = action.payload.state_filing;
    },
    setStateRnec(state, action: PayloadAction<string>) {
      state.stateRnec = action.payload;
    },
    setResetProcess: () => initialState,
  },
});

export const {
  setIdentificationData,
  setCurrentStep,
  setProcessStarted,
  setResetProcess,
  setDataAffiliation,
  setEntity,
  setFullAddress,
  setInformationData,
  setContactData,
  setIncome,
  setModalityInput,
  setRequestResume,
  setFlowUrl,
  setStateRnec,
} = pensionerAffiliationsSlice.actions;

export default pensionerAffiliationsSlice.reducer;
