import { EMAIL_REGEX } from "lib";
import * as Yup from "yup";

export class ResumeFormValidations {
  private ONLY_NUMBERS_REGEXP = /^\d+$/;
  private generalInfoFormValidation: Yup.AnyObject | null;
  private educationFormValidation: Yup.AnyObject | null;
  private languagesFormValidation: Yup.AnyObject | null;
  private knowledgeAndSkillsFormValidation: Yup.AnyObject | null;
  private profileAndExperienceFormValidation: Yup.AnyObject | null;

  constructor() {
    // FIRST STEEP FORM (General info)
    this.generalInfoFormValidation = null;

    // SECOND STEEP FORM (Education)
    this.educationFormValidation = null;

    // THIRD STEEP VALIDATION (Languages)
    this.languagesFormValidation = null;

    // FOURTH STEEP VALIDATION (Knowledge and skill)
    this.knowledgeAndSkillsFormValidation = null;

    // FIFTH STEEP FORM (Profile)
    this.profileAndExperienceFormValidation = null;
  }

  public getFirstFormValidation() {
    this.generalInfoFormValidation = Yup.object().shape({
      firstName: Yup.string().required("Este campo es obligatorio"),
      secondName: Yup.string().required("Este campo es obligatorio"),
      firstLastName: Yup.string().required("Este campo es obligatorio"),
      secondLastName: Yup.string().required("Este campo es obligatorio"),
      documentNumber: Yup.string().required("Este campo es obligatorio"),
      documentType: Yup.string().required("Este campo es obligatorio"),
      birthdate: Yup.string().required("Este campo es obligatorio"),
      gender: Yup.string().required("Este campo es obligatorio"),
      profession: Yup.array().max(1).required("Este campo es obligatorio"),
      age: Yup.string(), // Computed Field
      address: Yup.string().required("Este campo es obligatorio"),
      emailAddress: Yup.string()
        .email("verifica tu correo")
        .matches(EMAIL_REGEX, "El correo no es válido")
        .required("Este campo es obligatorio"),
      cellphone: Yup.string()
        .matches(this.ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
        .max(10, "verifica el numero, debe tener 10 dígitos")
        .min(10, "verifica el numero, debe tener 10 dígitos")
        .required("Este campo es obligatorio"),
      city: Yup.string().required("Este campo es obligatorio"),
    });
    return this.generalInfoFormValidation;
  }

  public getSecondFormValidation() {
    this.educationFormValidation = Yup.object().shape({
      institutionName: Yup.string()
        .max(200, "El teto ingresado es muy extenso")
        .required("Este campo es obligatorio"),
      titleObtained: Yup.string().required("Este campo es obligatorio"),
      educationTitleName: Yup.string()
      .max(200, "El teto ingresado es muy extenso")  
      .required("Este campo es obligatorio"),
      startDate: Yup.string().required("Este campo es obligatorio"),
      endDate: Yup.string().required("Este campo es obligatorio"),
      additionalInformation: Yup.string().max(
        2000,
        "El teto ingresado es muy extenso"
      ),
    });
    return this.educationFormValidation;
  }

  public getThirdSFormValidation() {
    this.languagesFormValidation = Yup.object().shape({
      language: Yup.string().required("Este campo es obligatorio"),
      level: Yup.string().required("Este campo es obligatorio"),
      certificateAvailable: Yup.string().required("Este campo es obligatorio"),
      nativeLanguage: Yup.string().optional(),
    });
    return this.languagesFormValidation;
  }

  public getFourthFormValidation() {
    this.knowledgeAndSkillsFormValidation = Yup.object().shape({
      skills: Yup.array()
        .min(1, "Selecciona por lo menos un conocimiento o aptitud")
        .required("Este campo es obligatorio"),
      additionalInformation: Yup.string().max(
        2000,
        "El texto ingresado es muy extenso"
      ),
      formationName: Yup.string().max(200, "El texto ingresado es muy extenso"),
      institution: Yup.string().max(200, "El texto ingresado es muy extenso"),
      duration: Yup.number()
        .min(1, "El valor ingresado es muy bajo")
        .max(9999, "El valor ingresado es muy grande"),
    });
    return this.knowledgeAndSkillsFormValidation;
  }

  public getFifthFormValidation() {
    this.profileAndExperienceFormValidation = Yup.object().shape({
      userProfile: Yup.string()
        .max(2000, "El texto ingresado es muy extenso")
        .required("Este campo es obligatorio"),
      businessName: Yup.string()
        .max(200, "El texto ingresado es muy extenso")
        .required("Este campo es obligatorio"),
      workRole: Yup.array().max(1).required("Este campo es obligatorio"),
      workRoleOpen: Yup.string().required("Este campo es obligatorio"),
      endDate: Yup.string().required("Este campo es obligatorio"),
      startDate: Yup.string().required("Este campo es obligatorio"),
      resultsDescription: Yup.string().max(
        2000,
        "El texto ingresado es muy extenso"
      ),
    });
    return this.profileAndExperienceFormValidation;
  }
}
