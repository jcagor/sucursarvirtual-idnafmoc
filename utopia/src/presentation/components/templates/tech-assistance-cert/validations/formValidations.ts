import { ONLY_NUMBERS_REGEXP } from "lib";
import * as Yup from "yup";

export class FormValidations {
  private ONLY_NUM_REGEXP = ONLY_NUMBERS_REGEXP;
  private techCertFormValidation: Yup.AnyObject | null;
  private techCertFormSignValidation: Yup.AnyObject | null;

  constructor() {
    // Acta de asistencia técnica.
    this.techCertFormValidation = null;
    this.techCertFormSignValidation = null;
  }

  public getTechCertFormValidation() {
    this.techCertFormValidation = Yup.object().shape({
      appointmentId: Yup.string(),
      assistance: Yup.string(),
      businessName: Yup.string(),
      operator: Yup.string(),
      startTime: Yup.string(),
      endTime: Yup.string(),
      interventionTime: Yup.string(),
      date: Yup.string(),
      assignedConsultor: Yup.string(),
      program: Yup.string(),
      assistant: Yup.string(),
      sessionScope: Yup.string(),
      evidence: Yup.array(),
      signOne: Yup.string(),
      signTwo: Yup.string(),
    });
    return this.techCertFormValidation;
  }

  public getTechCertFormSignValidation() {
    this.techCertFormSignValidation = Yup.object().shape({
      /*
      appointmentId: Yup.string().required("Este campo es obligatorio AUTO!"),
      assistance: Yup.string().required("Este campo es obligatorio"),
      businessName: Yup.string().required("Este campo es obligatorio"),
      operator: Yup.string().required("Este campo es obligatorio"),
      startTime: Yup.string().required("Este campo es obligatorio"),
      endTime: Yup.string().required("Este campo es obligatorio"),
      interventionTime: Yup.number().required("Este campo es obligatorio"),
      date: Yup.string().required("Este campo es obligatorio"),
      assignedConsultor: Yup.string().required(
        "Este campo es obligatorio AUTO!"
      ),
      program: Yup.string().required("Este campo es obligatorio"),
      assistant: Yup.string().required("Este campo es obligatorio"),
      sessionScope: Yup.string().required("Este campo es obligatorio"),
      evidence: Yup.array().required("Este campo es obligatorio"),
      */
      signTwoName: Yup.string().required("Este campo es obligatorio"),
      signTwoDocument: Yup.string().required("Este campo es obligatorio"),
      signTwoEvidence: Yup.array().required("Este campo es obligatorio"),
      /*
      signTwo: Yup.string(),
      commitments: Yup.array(),
      deliverables: Yup.array(),
      */
    });
    return this.techCertFormSignValidation;
  }
}
