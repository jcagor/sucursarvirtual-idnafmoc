import * as Yup from "yup";

export class UserFormValidations {
  private static readonly ONLY_NUMBERS_REGEXP = /^\d+$/;

  public static getUserFormValidation() {
    return Yup.object().shape({
      documentType: Yup.string()
        .required("Este campo es requerido"),
      documentNumber: Yup.string()
        .required("Este campo es requerido")
        .matches(this.ONLY_NUMBERS_REGEXP, "Solo se permiten números")
        .min(6, "Mínimo 6 dígitos")
        .max(15, "Máximo 15 dígitos"),
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("Este campo es requerido"),
      name: Yup.string()
        .required("Este campo es requerido")
        .min(3, "Ingresa por lo menos 3 caracteres")
        .max(100, "El nombre ingresado es muy extenso"),
      companyDocumentType: Yup.string()
        .required("Este campo es requerido"),
      companyDocumentNumber: Yup.string()
        .required("Este campo es requerido")
        .matches(this.ONLY_NUMBERS_REGEXP, "Solo se permiten números")
        .min(6, "Mínimo 6 dígitos")
        .max(15, "Máximo 15 dígitos")
    });
  }
} 