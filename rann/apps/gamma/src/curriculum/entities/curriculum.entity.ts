export interface SelectOption {
  label: string;
  value: string;
  shorthand?: string;
}
export interface UserInformation {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  documentType: string;
  documentNumber: number;
  birthdate: string;
  gender: string;
  profession: Array<SelectOption> | undefined;
  age: string;
  address: string;
  city: string;
  cellphone: string;
  emailAddress: string;
}

export interface EducationEntry {
  institutionName: string;
  titleObtained: string;
  educationTitleName:string;
  additionalInformation: string;
  startDate: string;
  endDate: string;
}

export interface EducationInformation {
  studies: Array<EducationEntry>;
}

export interface LanguageInformation {
  language: string;
  level: string;
  certificateAvailable: boolean;
  nativeLanguage: boolean;
}

export interface LanguageList {
  languages: Array<LanguageInformation>;
}

export interface ExperienceEntry {
  businessName: string;
  workRole: Array<SelectOption>;
  workRoleOpen: string;
  startDate: string;
  endDate: string;
  resultsDescription: string;
}

export interface ProfileAndExperience {
  userProfile: string;
  userExperience: Array<ExperienceEntry>;
}

export interface CourseOrCertification {
  formationName: string;
  institution: string;
  duration: string;
}

export interface KnowledgeAndSkills {
  knowledge: Array<SelectOption> | undefined;
  skills: Array<SelectOption> | undefined;
  additionalInformation: string | undefined;
  formationName: string;
  institution: string;
  duration: string;
}

export interface KnowledgeAndSkillsInformation {
  knowledge: Array<SelectOption> | undefined;
  skills: Array<SelectOption> | undefined;
  additionalInformation: string | undefined;
  coursesOrCertifications: Array<CourseOrCertification> | undefined;
}

export interface ResumeInformation {
  generalInfo: UserInformation | undefined;
  education: EducationInformation | undefined;
  languages: Array<LanguageInformation> | undefined;
  knowledgeAndSkills: KnowledgeAndSkillsInformation | undefined;
  profileAndExperience: ProfileAndExperience | undefined;
}

export interface ResumeStatusResponse {
  status: boolean;
  error?: boolean;
  message?: string;
}
