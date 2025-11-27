import { SelectOption } from "lib";

export interface BusinessInformation {
  name: string;
  nit: string;
  comfandiAffiliated: string;
  businessSector: string;
  address: string;
  location: string; // ?
  //business_sector:string; //duplicate
  telephone: string;
  businessType: string;
  businessSize: string;
}

export interface ApplicantInformation {
  applicantName: string;
  applicantOccupation: string;
  //identificationType:
  identificationNumber: string;
  applicantPhone: string;
}

export interface SteepOneJobForm
  extends BusinessInformation,
    ApplicantInformation {}

export interface VacantInformation {
  workRole: SelectOption[];
  vacantName: string;
  vacantOccupation: string;
  vacantConfidentialRequirements: string;
  vacantNumber: string;
  vacantOccupationalDenominationCode: string;
  vacantCUOCCode: string;
  vacantHiringType: string;
  vacantOrigin: string;
  vacantCountry: string;
  vacantWorkMode: string;
  vacantWorkRegion: string;
  vacantLegalRequirements: string;
  vacantSalaryRangeMin: string;
  vacantSalary: string;
  vacantAttentionPoint: string;
  vacantHabilitesDescription: string;
  vacantKnowledgeAndSkillsDescription: string;
}

export interface VacantSpecificRequirements {
  reqStudies: string;
  reqStudyTitle: string;
  reqCertification: string;
  reqMinExperience: string;
  reqSecondLanguage: string;
  reqLanguageLevel: string;
  reqLanguage: string;
  reqTravel: string;
  reqDisabilityOK: string;
  reqSectorExperience: string;
  reqPersonalInCharge: string;
  reqDisabilityType: string;
  reqWorkTime: string;
  reqWorkDays: string;
  reqVehicle: string;
  reqDriveLicense:string;
  reqDriveLicenseType:string;
  reqVehicleType: string;
  reqLikeWorkShop: string;
  reqLaboralGestorAssigned: string;
  reqObservations: string;
  reqDataPolicyOK: string;
}

export interface SaveVacancyFormInformation {
  solicitudeNumber: string;
  solicitudeStatus: string;
}

export interface VacantRegisterForm
  extends SteepOneJobForm,
    VacantInformation,
    VacantSpecificRequirements,
    SaveVacancyFormInformation {}

export interface VacantRegisterFormSaveStatus {
  id: string;
  created_at: string;
  updated_at: string;
  sequence: number;
  information: string;
  identification_type: string;
  identification_number: string;
  state: boolean | null;
}
