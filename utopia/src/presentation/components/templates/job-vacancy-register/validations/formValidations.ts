import * as Yup from "yup";

export class ResumeFormValidations {
  private ONLY_NUMBERS_REGEXP = /^\d+$/;
  private NIT_REGEXP = /^\d{9}-\d{1}$/;
  private generalInfoFormValidation: Yup.AnyObject | null;
  private vacantInformationFormValidation: Yup.AnyObject | null;
  private specificRequirementsFormValidation: Yup.AnyObject | null;

  constructor() {
    // FIRST STEEP FORM (General info)
    this.generalInfoFormValidation = null;
    this.vacantInformationFormValidation = null;
    this.specificRequirementsFormValidation = null;
  }

  public getGeneralInformationFormValidation() {
    this.generalInfoFormValidation = Yup.object().shape({
      name: Yup.string().required("Este campo es requerido").min(3,"ingresa por lo menos 3 caracteres").max(200, "El nombre ingresado es muy extenso"),
      nit: Yup.string().required("Este campo es requerido").matches(this.ONLY_NUMBERS_REGEXP, "El número Nit no es válido")
      .max(15, "verifica el numero NIT, 1234567891")
      .min(5, "verifica el numero NIT, 1234567891"), 
      comfandiAffiliated: Yup.string().required("Este campo es requerido"), // select y/n
      businessSector: Yup.string().required("Este campo es requerido"), //select
      address: Yup.string().required("Este campo es requerido").min(3,"ingresa por lo menos 3 caracteres").max(200, "El nombre ingresado es muy extenso"),
      location: Yup.string().required("Este campo es requerido").min(3,"ingresa por lo menos 3 caracteres").max(200, "El nombre ingresado es muy extenso"),
      telephone: Yup.string().required("Este campo es requerido").matches(this.ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
      .max(10, "verifica el numero, debe tener 10 dígitos")
      .min(10, "verifica el numero, debe tener 10 dígitos"),
      businessType: Yup.string().required("Este campo es requerido"), //select
      businessSize: Yup.string().required("Este campo es requerido").matches(this.ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
      .max(5, "verifica, debe tener al menos 5 dígitos")
      .min(1, "verifica, debe tener al menos 1 dígito"),

      applicantName: Yup.string().required("Este campo es requerido").min(3,"ingresa por lo menos 3 caracteres").max(200, "El nombre ingresado es muy extenso"),
      applicantOccupation: Yup.string().required("Este campo es requerido").min(3,"ingresa por lo menos 3 caracteres").max(200, "El nombre ingresado es muy extenso"),
      applicantPhone: Yup.string().required("Este campo es requerido").matches(this.ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
      .max(10, "verifica el numero, debe tener 10 dígitos")
      .min(10, "verifica el numero, debe tener 10 dígitos"),
      identificationNumber: Yup.string().required("Este campo es requerido").matches(this.ONLY_NUMBERS_REGEXP, "El número de teléfono no es válido")
      .max(10, "verifica el numero, debe tener 10 dígitos")
      .min(7, "verifica el numero, debe tener 10 dígitos"),
    });
    return this.generalInfoFormValidation;
  }

  public getVacantInformationFormValidation() {
    const internationalVal = "Internacional";

    this.vacantInformationFormValidation = Yup.object().shape({
      vacantName: Yup.string().required("Este campo es requerido")
        .min(5,"ingresa por lo menos 5 caracteres").max(200, "El nombre ingresado es muy extenso"),
      vacantOccupation: Yup.string().required("Este campo es requerido"), // select  y/n
      vacantConfidentialRequirements: Yup.string().required("Este campo es requerido"), // select ?
      vacantNumber: Yup.string().required("Este campo es requerido")
      .matches(this.ONLY_NUMBERS_REGEXP, "El número no es válido")
      .max(10, "El nombre ingresado es muy extenso"),
      vacantOccupationalDenominationCode: Yup.string().max(10, "El nombre ingresado es muy extenso"),
      vacantCUOCCode: Yup.string().required("Este campo es requerido").max(10, "El nombre ingresado es muy extenso"),
      vacantHiringType: Yup.string().required("Este campo es requerido"), // select 
      vacantOrigin: Yup.string().required("Este campo es requerido")
        .min(3,"ingresa por lo menos 3 caracteres").max(200, "El nombre ingresado es muy extenso"),
      vacantWorkMode: Yup.string().required("Este campo es requerido"), //select
      vacantWorkRegion: Yup.string(), // select      
      vacantSalaryRangeMin: Yup.string().required("Este campo es requerido"), //select
      vacantSalary: Yup.number().required("Este campo es requerido").min(100000, "Ingresa por lo menos 6 dígitos"),
      vacantAttentionPoint: Yup.string().required("Este campo es requerido"), // select
      vacantHabilitesDescription: Yup.string().required("Este campo es requerido").max(2000, "El nombre ingresado es muy extenso"),
      vacantKnowledgeAndSkillsDescription: Yup.string().required("Este campo es requerido")
        .max(2000, "El nombre ingresado es muy extenso"),
      
      // Vacant Origin
      vacantLegalRequirements: Yup.string().when('vacantOrigin', {
          is: internationalVal,
          then: () => Yup.string().required("Este campo es requerido").max(200, "El nombre ingresado es muy extenso"), //
          otherwise: ()=> Yup.string(),
        }),
      vacantCountry: Yup.string().when('vacantOrigin', {
          is: internationalVal,
          then: () => Yup.string().required("Este campo es requerido"), //
          otherwise: () => Yup.string(),
        }),
    });

    return this.vacantInformationFormValidation;
  }

  public getSpecificRequirementsFormValidation() {
    this.specificRequirementsFormValidation = Yup.object().shape({
      reqStudies: Yup.string().required("Este campo es requerido"), //select y/n
      reqStudyTitle: Yup.string().required("Este campo es requerido")
      .min(3,"ingresa por lo menos 3 caracteres").max(200, "La descripción ingresada es muy extensa"), //select ?
      reqCertification: Yup.string().required("Este campo es requerido")
      .min(3,"ingresa por lo menos 3 caracteres").max(200, "La descripción ingresada es muy extensa"),
      reqMinExperience: Yup.string().required("Este campo es requerido"), //select y/n

      // Second Language
      reqSecondLanguage: Yup.string().required("Este campo es requerido"), //select 
      reqLanguage: Yup.string().when('reqSecondLanguage', {
        is: 'Si',
        then: () => Yup.string().required("Este campo es requerido"), //
        otherwise: ()=> Yup.string().notRequired(),
      }),
      reqLanguageLevel: Yup.string().when('reqSecondLanguage', {
        is: 'Si',
        then: () => Yup.string().required("Este campo es requerido"), //
        otherwise: ()=> Yup.string().notRequired(),
      }),

      reqTravel: Yup.string().required("Este campo es requerido"), //select y/n

      // Disability
      reqDisabilityOK: Yup.string().required("Este campo es requerido"), //select y/n      
      reqDisabilityType: Yup.string().when('reqDisabilityOK', {
        is: 'Si',
        then: () => Yup.string().required("Este campo es requerido"), //
        otherwise: ()=> Yup.string().notRequired(),
      }),      

      reqSectorExperience: Yup.string().required("Este campo es requerido"), //select y/n
      reqPersonalInCharge: Yup.string().required("Este campo es requerido"), //select y/n
      reqWorkTime: Yup.string().required("Este campo es requerido")
      .min(3,"ingresa por lo menos 3 caracteres").max(200, "La descripción ingresada es muy extensa"),
      reqWorkDays: Yup.array().min(1, "Selecciona por lo menos un dia de trabajo.").required("Este campo es obligatorio"), //multi select
      
      // Vehicle.
      reqVehicle: Yup.string().required("Este campo es requerido"), //select y/n
      reqDriveLicense: Yup.string().when('reqVehicle', {
        is: 'Si',
        then: () => Yup.string().required("Este campo es requerido"), //
        otherwise: ()=> Yup.string().notRequired(),
      }),
      reqVehicleType: Yup.string().when('reqVehicle', {
        is: 'Si',
        then: () => Yup.string().required("Este campo es requerido"), //
        otherwise: ()=> Yup.string().notRequired(),
      }),

      reqLikeWorkShop: Yup.string(), //select y/n
      reqLaboralGestorAssigned: Yup.string(), //select
      reqObservations: Yup.string().max(2000, "El nombre ingresado es muy extenso"),
      reqDataPolicyOK: Yup.string().required("Este campo es requerido"),
    });

    return this.specificRequirementsFormValidation;
  }
}
