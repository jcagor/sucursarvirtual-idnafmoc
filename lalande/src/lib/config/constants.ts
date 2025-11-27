import {
  DescriptionLinkCardInterface,
  ItemMenuInterface,
  SessionInterface,
} from "lib";
import { text } from "stream/consumers";

export const EMPTY_USER: SessionInterface = {
  exp: 0,
  iat: 0,
  auth_time: 0,
  jti: "",
  iss: "",
  sub: "",
  typ: "",
  azp: "",
  session_state: "",
  scope: "",
  sid: "",
  email_verified: false,
  identification_number: "",
  name: "",
  identification_type: "",
  preferred_username: "",
  given_name: "Usuario",
  family_name: "",
  email: "",

  //Personas
  //acr: "",
  //"allowed-origins": [],
  //edcmfndi: "",

  // empresas
  born_date: "",
  expedition_date: "",
  gender: "",
};

export const sidebarItems: ItemMenuInterface[] = [
  //{
  //  path: "/adminHome",
  //  label: "Admin Home",
  //},
];

export const sidebarConsultantItems: ItemMenuInterface[] = [
  ...sidebarItems,
  {
    path: "/Consultant/schedule",
    label: "Cronograma",
  },
  {
    path: "/Consultant/MonthlyReport",
    label: "Informe Mensual",
  },
  // {
  //   path: "/Consultant/growth-plan",
  //   label: "Plan de Crecimiento",
  // },
];

export const sidebarAdminItems: ItemMenuInterface[] = [
  ...sidebarItems,
  {
    path: "/admin/schedule",
    label: "Cronograma por empresa",
  },
  // {
  //   path: "/admin/work-plan",
  //   label: "Plan de trabajo",
  // },
  {
    path: "/admin/program/program-management",
    label: "Gestión de programas",
  },
];

export const sidebarAnalystItems: ItemMenuInterface[] = [
  ...sidebarItems,
  {
    path: "/analyst/reports/support_register",
    label: "Revisión de Actas",
  },
  //{
  //  path: "/analyst/reports/review",
  //  label: "Revisión de Informes",
  //},
  {
    path: "/analyst/reports/consultant_business",
    label: "Reporte empresas consultor",
  },
  {
    path: "/analyst/reports/consultant_hours",
    label: "Reporte horas consultor",
  },
];

export const sidebarActiveAdmin: ItemMenuInterface[] = [
  ...sidebarItems,
  {
    path: "/admin/course/course-management",
    label: "Gestión de cursos",
  },
  {
    path: "/admin/course/schedule-management",
    label: "Gestión de cronogramas",
  },
];

export const sidebarGeneralAdmin: ItemMenuInterface[] = [
  ...sidebarItems,
  {
    path: "/admin/UnvalidatedBusiness",
    label: "Empresas rechazadas",
  },
  {
    path: "/admin/assign-consultant-to-business",
    label: "Consultores & admin empresa",
  },
];

// INPUT DATEPICKER
export const DATE_PICKER_WEEK_DAYS = ["D", "L", "M", "M", "J", "V", "S"];
export const DATE_PICKER_MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// INPUT SELECT
export const INPUT_SELECT_COURSE_MODALITY = [
  { label: "Presencial", value: "Presencial" },
  { label: "Virtual", value: "Virtual" },
  { label: "Hibrida", value: "Hibrida" },
];

export const INPUT_SELECT_COURSE_TYPE_USER = [
  { label: "Trabajador activo", value: "Trabajador activo" },
  { label: "Cesante", value: "Cesante" },
  { label: "Beneficiario", value: "Beneficiario" },
];

export const INPUT_SELECT_COURSE_TYPE_SESSION = [
  { label: "Grupal", value: "Grupal" },
];

export const INPUT_SELECT_COURSE_SUPPLIER = [
  { label: "Desarrollo empresarial", value: "Desarrollo empresarial" },
  { label: "Educación", value: "Educación" },
];

export enum MPAC_USER_ROLE {
  admin = "administrador-pymes",
  consultor = "consultor-pymes",
  analista = "analista-pymes",
  administrador_activos = "administrador-activos",
  administrador_general = "administrador-general",
  unknown = "UNKNOWN",
}

export enum FORM_DB_SELECT_OPTIONS {
  BUSINESS_LIST_ANALYST = "BUSINESS_LIST_ANALYST",
  BUSINESS_LIST_BY_ROL = "BUSINESS_LIST_BY_ROL",
  BUSINESS_LIST = "BUSINESS_LIST",
  ASSISTANCE_MODE = "ASSISTANCE_MODE",
  APPOINTMENT_TYPE = "APPOINTMENT_TYPE",
  ADMIN_PYME_LIST = "ADMIN_PYME_LIST",
}

export enum APPOINTMENT_ATTENDANCE_STATUS {
  Absent = "Absent",
  Attended = "Attended",
  Assigned = "Assigned",
  Signing = "Signing",
  Revision = "Revision",
  Rejected = "Rejected",
}

export enum APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE {
  Absent = "Ausente",
  Attended = "Atendida",
  Assigned = "Asignada",
  Signing = "Firmando",
  Revision = "Revision",
  Rejected = "Rechazada",
}

export enum TECH_REVISION_STATUS {
  approved = "APPROVED",
  rejected = "REJECT",
  pending = "PENDING", // UI only
  unknown = "UNKNOWN", // UI only
}

export enum TECH_REVISION_STATUS_TRANSLATE {
  approved = "APROBADA",
  rejected = "RECHAZADA",
  pending = "PENDIENTE", // UI only
  unknown = "DESCONOCIDO", // UI only
}

export enum HomeMenuCardTitles {
  // ADMIN
  ADMIN_CRONOGRAMA_EMPRESA = "Cronogramas por empresa",
  ADMIN_PLAN_DE_TRABAJO = "Plan de trabajo",

  // CONSULTOR
  CONSULTANT_CRONOGRAMA_EMPRESA = "Cronogramas por empresa",
  CONSULTANT_INFORMES = "Informe mensual",

  // ANALISTA
  ANALYST_REVISION_ACTAS = "Revisión de Actas",
  ANALYST_REVISION_INFORMES = "Revisión y visualización de informes",
  ANALYST_LISTADO_EMPRESAS = "Listado empresas atendidas",
  ANALYST_LISTADO_HORAS = "Número de horas por empresa",

  // ADMINISTRADOR ACTIVOS
  ADMIN_ACTIVOS_GESTION_DE_CURSOS = "Gestion de cursos",
  ADMIN_ACTIVOS_GESTION_DE_CRONOGRAMAS = "Gestion de cronogramas",
  ADMIN_ACTIVOS_GESTION_DE_PROGRAMAS = "Gestion de programas",

  // ADMINISTRADOR GENERAL
  ADMIN_GENERAL_UNVALIDATED_BUSINESS = "Empresas rechazadas",
  ADMIN_GENERAL_ASSINGN_CONSULTANT_TO_BUSINESS = "Consultores & admin empresa",
}

export const HomeMenuCards = [
  // ADMIN
  {
    text: HomeMenuCardTitles.ADMIN_CRONOGRAMA_EMPRESA,
    image: "/lalande/icons/assignment-dates.png",
    url: "/admin/schedule",
    canAccess: [MPAC_USER_ROLE.admin],
  },
  // {
  //   text: HomeMenuCardTitles.ADMIN_PLAN_DE_TRABAJO,
  //   image: "/lalande/icons/financial-analysis-chart.png",
  //   url: "/admin/work-plan",
  //   canAccess: [MPAC_USER_ROLE.admin],
  // },
  {
    text: HomeMenuCardTitles.ADMIN_ACTIVOS_GESTION_DE_PROGRAMAS,
    image: "/lalande/icons/financial-analysis-chart.png",
    url: "/admin/program/program-management",
    canAccess: [MPAC_USER_ROLE.admin],
  },
  // CONSULTOR
  {
    text: HomeMenuCardTitles.CONSULTANT_CRONOGRAMA_EMPRESA,
    image: "/lalande/icons/assignment-dates.png",
    url: "/Consultant/schedule",
    canAccess: [MPAC_USER_ROLE.consultor],
  },
  {
    text: HomeMenuCardTitles.CONSULTANT_INFORMES,
    image: "/lalande/icons/certifications-icon.png",
    url: "/Consultant/MonthlyReport",
    canAccess: [MPAC_USER_ROLE.consultor],
  },
  // ANALISTA
  {
    text: HomeMenuCardTitles.ANALYST_REVISION_ACTAS,
    image: "/lalande/icons/see-credits.png",
    url: "/analyst/reports/support_register",
    canAccess: [MPAC_USER_ROLE.analista],
  },
  //{
  //  text: HomeMenuCardTitles.ANALYST_REVISION_INFORMES,
  //  image: "/lalande/icons/blue-ticks-on-paper.svg",
  //  url: "/analyst/reports/review",
  //  canAccess: [MPAC_USER_ROLE.analista],
  //},
  {
    text: HomeMenuCardTitles.ANALYST_LISTADO_EMPRESAS,
    image: "/lalande/icons/briefcase-icon_new.svg",
    url: "/analyst/reports/consultant_business",
    canAccess: [MPAC_USER_ROLE.analista],
  },
  {
    text: HomeMenuCardTitles.ANALYST_LISTADO_HORAS,
    image: "/lalande/icons/employability-route.png",
    url: "/analyst/reports/consultant_hours",
    canAccess: [MPAC_USER_ROLE.analista],
  },
  //ADMINISTRADOR ACTIVOS
  {
    text: HomeMenuCardTitles.ADMIN_ACTIVOS_GESTION_DE_CURSOS,
    image: "/lalande/icons/workshop.png",
    url: "/admin/course/course-management",
    canAccess: [MPAC_USER_ROLE.administrador_activos],
  },
  {
    text: HomeMenuCardTitles.ADMIN_ACTIVOS_GESTION_DE_CRONOGRAMAS,
    image: "/lalande/icons/assignment-dates.png",
    url: "/admin/course/schedule-management",
    canAccess: [MPAC_USER_ROLE.administrador_activos],
  },
  //ADMINISTRADOR GENERAL
  {
    text: HomeMenuCardTitles.ADMIN_GENERAL_UNVALIDATED_BUSINESS,
    image: "/lalande/icons/briefcase-icon_new.svg",
    url: "/admin/UnvalidatedBusiness",
    canAccess: [MPAC_USER_ROLE.administrador_general],
  },
  {
    text: HomeMenuCardTitles.ADMIN_GENERAL_ASSINGN_CONSULTANT_TO_BUSINESS,
    image: "/lalande/icons/employability-route.png",
    url: "/admin/assign-consultant-to-business",
    canAccess: [MPAC_USER_ROLE.administrador_general],
  },
];

export enum ReviewReportsTitles {
  REPORTS_INDICATORS = "Indicadores plan de trabajo por empresa",
  REPORTS_MILESTONES = "Comparativo avance de hitos por empresa",
}

export const ReviewReportsCards = [
  {
    text: ReviewReportsTitles.REPORTS_INDICATORS,
    image: "/lalande/icons/plan-board.png",
    url: "/analyst/reports/business_indicators",
    canAccess: [MPAC_USER_ROLE.analista],
  },
  {
    text: ReviewReportsTitles.REPORTS_MILESTONES,
    image: "/lalande/icons/financial-analysis-chart.png",
    url: "/analyst/reports/business_milestones",
    canAccess: [MPAC_USER_ROLE.analista],
  },
];

export const CONSULTANT_TRACKING_BUSINESS_PER_PAGE = 10;

export const WORK_PLAN_UNITS = [
  { label: "Dias", value: "Dias" },
  { label: "Horas", value: "Horas" },
  { label: "Minutos", value: "Minutos" },
  { label: "%", value: "%" },
  { label: "Veces", value: "Veces" },
  { label: "Pesos", value: "Pesos" },
  { label: "Unidad", value: "Unidad" },
];

export const APPOINTMENT_ATTENDANCE = [
  {
    attendace: "Assigned",
    text: "Cita asignada",
    bg_color: "#2170B61A",
    text_color: "#2170B6",
  },
  {
    attendace: "Absent",
    text: "Ausente",
    bg_color: "#FD536D1A",
    text_color: "#FD536D",
  },
  {
    attendace: "Attended",
    text: "Asistido",
    bg_color: "#97D7001A",
    text_color: "#97D700",
  },
  {
    attendace: "Signing",
    text: "Firmando",
    bg_color: "#FFF",
    text_color: "#2980b9",
  },
  {
    attendace: "Rejected",
    text: "Rechazada",
    bg_color: "#FFF",
    text_color: "#d35400",
  },
  {
    attendace: "Revision",
    text: "En Revisión",
    bg_color: "#97D7001A",
    text_color: "#1abc9c",
  },
];
