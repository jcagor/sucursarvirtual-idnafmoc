import { Description } from "presentation";
import * as Yup from "yup";

export const createScheduleValidation = Yup.object().shape({
  course_id: Yup.string().required("Este campo es obligatorio"),
  name: Yup.string().required("Este campo es obligatorio"),
  modality: Yup.string().required("Este campo es obligatorio"),
  typeUser: Yup.string().required("Este campo es obligatorio"),
  supplier: Yup.string().required("Este campo es obligatorio"),
  state: Yup.string().optional(),
  description: Yup.string().optional(),
  id_regional: Yup.string().required("Este campo es obligatorio"),
  cost: Yup.string().required("Este campo es obligatorio"),
  accessType: Yup.string().required("Este campo es obligatorio"),
});

export const createSessionValidation = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  typeSession: Yup.string().required("Este campo es obligatorio"),
  startTime: Yup.string().required("Este campo es obligatorio"),
  endTime: Yup.string().required("Este campo es obligatorio"),
  date: Yup.date().required("Este campo es obligatorio"),
});

export const MonthlyReportValidation = Yup.object().shape({
  introduction: Yup.string().required("Este campo es obligatorio"),
  companyName: Yup.string().required("Este campo es obligatorio"),
  budgetedHoursPerMonth: Yup.number().required("Este campo es obligatorio"),
  hoursExecutedPerMonth: Yup.number().required("Este campo es obligatorio"),
  expectedProgressPercentage: Yup.number().required(
    "Este campo es obligatorio"
  ),
  totalProgress: Yup.number().required("Este campo es obligatorio"),
  lineOfIntervention: Yup.string().required("Este campo es obligatorio"),
  associatedIndicators: Yup.string().required("Este campo es obligatorio"),
  conclusions: Yup.string().required("Este campo es obligatorio"),
  interventionCompanyName: Yup.string().required("Este campo es obligatorio"),
  prioritisedLineOfIntervention: Yup.string().required(
    "Este campo es obligatorio"
  ),
  indicatorsProgress: Yup.number().required("Este campo es obligatorio"),
  actionPlanDuringTheExecutionPeriod: Yup.string().required(
    "Este campo es obligatorio"
  ),
  description: Yup.string().required("Este campo es obligatorio"),
  complianceWithResults: Yup.string().required("Este campo es obligatorio"),
  hoursRecorded: Yup.number().required("Este campo es obligatorio"),
  valueBeforeIVA: Yup.number().required("Este campo es obligatorio"),
  valueIVA: Yup.number().required("Este campo es obligatorio"),
  valueIncludedIVA: Yup.number().required("Este campo es obligatorio"),
  urlPowerBi: Yup.string()
    .required("El enalce de Power BI es obligatorio")
    .url("Debe ser una URL válida")
    .matches(
      /^https?:\/\/([a-zA-Z0-9.-]+\.)?powerbi\.com\/?.*/i,
      "Debe ser una URL del dominio powerbi.com"
    ),
});

export const techCertFormValidation = Yup.object().shape({
  appointmentId: Yup.string().required("Este campo es obligatorio AUTO!"),
  assistance: Yup.string().required("Este campo es obligatorio"),
  businessName: Yup.string().required("Este campo es obligatorio"),
  operator: Yup.string().required("Este campo es obligatorio"),
  startTime: Yup.string().required("Este campo es obligatorio"),
  endTime: Yup.string().required("Este campo es obligatorio"),
  interventionTime: Yup.number().required("Este campo es obligatorio"),
  date: Yup.string().required("Este campo es obligatorio"),
  assignedConsultor: Yup.string().required("Este campo es obligatorio AUTO!"),
  program: Yup.string().required("Este campo es obligatorio"),
  assistant: Yup.string().required("Este campo es obligatorio"),
  sessionScope: Yup.string().required("Este campo es obligatorio"),
  evidence: Yup.array().required("Este campo es obligatorio"),
  signOne: Yup.string(),
  //signTwo: Yup.string(),
  commitments: Yup.array(),
  deliverables: Yup.array(),
});

export const techCertRevisionValidation = Yup.object().shape({
  observation: Yup.string()
    .min(5, "Ingresa por lo menos 5 caracteres")
    .max(2000, "La descripción ingresada es muy extensa.")
    .required(
      "Por favor ingresa el motivo por el cual se rechaza este registro."
    ),
});

export const techCertRevisionApproveValidation = Yup.object().shape({
  observation: Yup.string(),
  status: Yup.string().required(),
});

export const workPlanvalidation = Yup.object({
  keyActivity: Yup.string().required("Este campo es requerido"),
  indicators: Yup.array()
    .of(
      Yup.object().shape({
        indicator: Yup.string().required("Requerido"),
        baseline: Yup.number()
          .typeError("Debe ser un número")
          .required("Requerido"),
        unit: Yup.string().required("Requerido"),
        goal: Yup.number()
          .typeError("Debe ser un número")
          .required("Requerido"),
        finalValue: Yup.number()
          .typeError("Debe ser un número")
          .required("Requerido"),
        mobility: Yup.number()
          .typeError("Debe ser un número")
          .required("Requerido"),
      })
    )
    .min(3, "Debes tener al menos tres indicadores"),
  topicsToDiscuss: Yup.array()
    .of(Yup.string().required("Este campo es obligatorio"))
    .min(1, "Agrega al menos un tema a tratar"),
});

export const createProgramScheduleValidation = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  startDate: Yup.date().required("La fecha de inicio es obligatoria"),
  endDate: Yup.date()
    .required("La fecha de fin es obligatoria")
    .min(
      Yup.ref("startDate"),
      "La fecha de fin debe ser mayor o igual a la fecha de inicio"
    ),
  description: Yup.string().optional(),
  value: Yup.string().required("El valor del programa es obligatorio"),
});

export const createProgramSessionValidation = Yup.object().shape({
  name: Yup.string().required("El nombre de la sesión es obligatorio."),
  typeSession: Yup.string().required("El tipo de sesión es obligatorio."),
  endDate: Yup.date().required("La fecha de finalización es obligatoria."),
  value: Yup.string().required("El valor de la sesión es obligatorio."),
});

export const assignBusinessToScheduleValidation = Yup.object().shape({
  business_id: Yup.string().required("Este campo es obligatorio"),
});

export const assignConsultantToBusinessValidation = Yup.object().shape({
  consultant_id: Yup.array().required("Este campo es obligatorio"),
});
