import { useAppDispatch } from "presentation/store";
import {
  setContactData,
  setDataAffiliation,
  setEntity,
  setFlowUrl,
  setFullAddress,
  setIncome,
  setInformationData,
  setModalityInput,
  setProcessStarted,
  setRequestResume,
  setResetProcess,
  setStateRnec,
} from "presentation/store/pensionerAffiliations/pensionerAffiliationsSlice";

type SelectOption = {
  label: string;
  value: string;
} | null;

const usePensionerAffiliations = () => {
  const dispatch = useAppDispatch();

  const validateIdentity = (stateRnec: string) => {
    dispatch(setStateRnec(stateRnec));
  };

  const startProcess = (type: string, number: string, name: string) => {
    dispatch(setProcessStarted({ type, number, name }));
  };

  const saveFlowUrl = (flow_url: string, flow_type: string) => {
    dispatch(setFlowUrl({ flow_url, flow_type }));
  };

  const saveEntity = (entity: { Nit: string; RazonSocial: string }) => {
    dispatch(setEntity(entity));
  };

  const saveDataAffiliation = (data: {
    f_name: string;
    s_name: string;
    f_last_name: string;
    s_last_name: string;
    birth_date: string;
  }) => {
    dispatch(setDataAffiliation(data));
  };

  const saveFullAddress = (address: {
    address_type: SelectOption;
    nomenclature: SelectOption;
    only_number: string;
    letter: SelectOption;
    zone: SelectOption;
    only_number_2: string;
    letter_2: SelectOption;
    only_number_3: string;
    characteristics: SelectOption;
    free_text: string;
    address: string;
  }) => {
    dispatch(setFullAddress(address));
  };

  const saveInformationData = (
    information: {
      civil_status: SelectOption;
      nationality: SelectOption;
      gender: SelectOption;
      sexual_preference: SelectOption;
      academic_level: SelectOption;
      vulnerability_fact: SelectOption;
      ethnic_affiliation: SelectOption;
      reserve: SelectOption;
      community: SelectOption;
      department: SelectOption;
      city: SelectOption;
    },
    contact: { email: string; phone: string }
  ) => {
    dispatch(setInformationData(information));
    dispatch(setContactData(contact));
  };

  const saveFinalInformation = (
    supportFiles: {
      document_identification: File;
      document_pension: File;
      document_pension_last_receipt: File;
      document_peace_safe: File;
    },
    income: {
      salary: string;
      code_eps: SelectOption;
      other_affiliation: SelectOption;
    },
    modality_input: SelectOption
  ) => {
    dispatch(setIncome(income));
    dispatch(setModalityInput(modality_input));
  };

  const saveRequestResume = (filing_code: string, state_filing: string) => {
    dispatch(setRequestResume({ filing_code, state_filing }));
  };

  const resetProcess = () => {
    dispatch(setResetProcess());
  };

  return {
    startProcess,
    resetProcess,
    saveDataAffiliation,
    saveEntity,
    saveFullAddress,
    saveInformationData,
    saveFinalInformation,
    saveRequestResume,
    saveFlowUrl,
    validateIdentity,
  };
};

export default usePensionerAffiliations;
