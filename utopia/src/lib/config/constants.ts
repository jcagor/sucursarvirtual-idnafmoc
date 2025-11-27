import {
  DescriptionLinkCardInterface,
  ItemMenuInterface,
  SessionInterface,
} from "lib";

export const BETA_ACCESS = [
  "1",
  "1234567890", // Cesar Munoz - OLS
  "1061822247", // Juan - OLS
  "9010037522",
  "9017374510",
  "8000207194",
  "9002667147",
  "1000000012",
  "890303093",
  "8050247477",
  "9013703980",
];

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
  {
    path: "/business-profile",
    label: "Perfil empresarial",
  },
  {
    path: "/self-management",
    label: "Autodiagnóstico",
  },
  {
    path: "/results-self-management",
    label: "Resultados autodiagnóstico",
  },
  {
    path: "/worker-management",
    label: "Gestión de trabajadores",
  },
  {
    path: "/tech-record-sign",
    label: "Revisión & firma de actas",
  },
  {
    path: "/job-vacancies",
    label: "Vacantes",
  },
];

export const sidebarItemsBusinessValidated: ItemMenuInterface[] = [
  {
    path: "/business-profile",
    label: "Perfil empresarial",
  },
  {
    path: "/self-management",
    label: "Autodiagnóstico",
  },
  {
    path: "/results-self-management",
    label: "Resultados autodiagnóstico",
  },
  {
    path: "/worker-management",
    label: "Gestión de trabajadores",
  },
  {
    path: "/job-vacancies",
    label: "Vacantes",
  },
];

export const sidebarItemsBusinessSuspended: ItemMenuInterface[] = [
  {
    path: "/job-vacancies",
    label: "Vacantes",
  },
];

export const sidebarItemsBusinessNoValidated: ItemMenuInterface[] = [
  {
    path: "/job-vacancies",
    label: "Vacantes",
  },
];

export const homeItemsBusinessValidated = [
  {
    text: "Perfil empresarial",
    url: "/business-profile",
    imageUrl: "/utopia/icons/brief-icon.png",
    description:
      "Registra y actualiza toda la información de tu empresa para que podamos conocerte mejor y ofrecerte soluciones más ajustadas a tus necesidades.",
    disabled: false,
    disabledText: "",
  },
  {
    text: "Autodiagnóstico",
    url: "/self-management",
    imageUrl: "/utopia/icons/plan-board.png",
    description:
      "Diligencia el autodiagnóstico empresarial para identificar con precisión oportunidades de mejora en procesos, capacidades y desempeño. Esta información será la base para activar un acompañamiento especializado dentro del programa de consultoría operacional.",
    disabled: false,
    disabledText: "",
  },
  {
    text: "Resultados autodiagnóstico",
    url: "/results-self-management",
    imageUrl: "/utopia/icons/circular-chart.png",
    description:
      "Accede a un análisis detallado de los resultados obtenidos en el autodiagnóstico, que evidencian tanto fortalezas como aspectos por mejorar. Con base en este reporte, tu empresa recibirá un plan de acompañamiento consultivo, adaptado a sus necesidades estratégicas.",
    disabled: false,
    disabledText: "",
  },
  {
    text: "Gestión de trabajadores",
    url: "/worker-management",
    imageUrl: "/utopia/icons/see-credits.png",
    description:
      "Gestiona el desarrollo de tu capital humano postulando a tus colaboradores en programas de entrenamiento orientados a fortalecer competencias y potenciar la productividad organizacional.",
    disabled: false,
    disabledText: "",
  },
  {
    text: "Programa de consultoría",
    url: "/program-management",
    imageUrl: "/utopia/icons/financial-analysis-chart.png",
    description:
      "Accede a programas de consultoría diseñados para acompañar a tu empresa en el fortalecimiento de sus capacidades. Con nuestros expertos podrás implementar estrategias que impulsen la productividad de tu empresa.",
    disabled: false,
    disabledText: "",
  },
  {
    text: "Vacantes",
    url: "/job-vacancies",
    imageUrl: "/utopia/icons/empleability-route.png",
    description:
      "Publica las vacantes de tu organización de manera ágil. Nuestro equipo de empleabilidad se encargará de identificar y conectar a los candidatos idóneos, optimizando los procesos de preselección.",
    disabled: false,
    disabledText: "",
  },
  {
    text: "Revisión & firma de actas",
    url: "/tech-record-sign",
    imageUrl: "/utopia/icons/access-board.png",
    description:
      "Registra y valida las sesiones de consultoría realizadas. Desde aquí, podrás firmar el acta correspondiente a cada encuentro, dejando constancia de los temas abordados.",
    disabled: false,
    disabledText: "",
  },
];

export const homeItemsBusinessSuspended = [
  {
    text: "Vacantes",
    url: "/job-vacancies",
    imageUrl: "/utopia/icons/empleability-route.png",
    description:
      "Publica las vacantes de tu organización de manera ágil. Nuestro equipo de empleabilidad se encargará de identificar y conectar a los candidatos idóneos, optimizando los procesos de preselección.",
    disabled: false,
    disabledText: "",
  },
];

export const homeItemsBusinessNoValidated = [
  {
    text: "Vacantes",
    url: "/job-vacancies",
    imageUrl: "/utopia/icons/empleability-route.png",
    description:
      "Publica las vacantes de tu organización de manera ágil. Nuestro equipo de empleabilidad se encargará de identificar y conectar a los candidatos idóneos, optimizando los procesos de preselección.",
    disabled: false,
    disabledText: "",
  },
];

export const ONLY_NUMBERS_REGEXP = /^\d+$/;

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

export const initialAnalisysSelfManagement = {
  GeneralResult: {
    Result: 0,
    Maturity: "Nivel Básico",
    NumberOpportunities: 0,
  },
  ResultsByLine: [
    {
      LineIntervention: "Gestión estratégica",
      Result: 0,
      Maturity: "Nivel Básico",
      NumberOpportunities: 0,
    },
    {
      LineIntervention: "Gestión Financiera",
      Result: 0,
      Maturity: "Nivel Básico",
      NumberOpportunities: 0,
    },
    {
      LineIntervention: "Comercial y mercadeo",
      Result: 0,
      Maturity: "Nivel Básico",
      NumberOpportunities: 0,
    },
    {
      LineIntervention: "Talento humano",
      Result: 0,
      Maturity: "Nivel Básico",
      NumberOpportunities: 0,
    },
    {
      LineIntervention: "Gestión de operaciones",
      Result: 0,
      Maturity: "Nivel Básico",
      NumberOpportunities: 0,
    },
    {
      LineIntervention: "Gestión de la innovación",
      Result: 0,
      Maturity: "Nivel Básico",
      NumberOpportunities: 0,
    },
  ],
  AnswersByLine: [
    {
      LineIntervention: "Gestión estratégica",
      Answers: [
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
      ],
    },
    {
      LineIntervention: "Gestión Financiera",
      Answers: [
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
      ],
    },
    {
      LineIntervention: "Comercial y mercadeo",
      Answers: [
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
      ],
    },
    {
      LineIntervention: "Talento humano",
      Answers: [
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
      ],
    },
    {
      LineIntervention: "Gestión de operaciones",
      Answers: [
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
      ],
    },
    {
      LineIntervention: "Gestión de la innovación",
      Answers: [
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
        "Nivel Básico",
      ],
    },
  ],
};

export const colorsMaturityLevels = [
  {
    Maturity: "Nivel Básico",
    backgroundColor: "bg-[#FF8383]",
    linearGradiente: "bg-gradient-to-b from-[#FF8383FF] to-[#FF838300]",
    border: "border-[#FF8383]",
  },
  {
    Maturity: "En Desarrollo",
    backgroundColor: "bg-[#FCBC68]",
    linearGradiente: "bg-gradient-to-b from-[#FCBC68FF] to-[#FCBC6800]",
    border: "border-[#FCBC68]",
  },
  {
    Maturity: "Estructurado",
    backgroundColor: "bg-[#FCEA68]",
    linearGradiente: "bg-gradient-to-b from-[#FCEA68FF] to-[#FCEA6800]",
    border: "border-[#FCEA68]",
  },
  {
    Maturity: "Implementando",
    backgroundColor: "bg-[#A8D08D]",
    linearGradiente: "bg-gradient-to-b from-[#A8D08DFF] to-[#A8D08D00]",
    border: "border-[#A8D08D]",
  },
  {
    Maturity: "Optimizando",
    backgroundColor: "bg-[#00B050]",
    linearGradiente: "bg-gradient-to-b from-[#00B050FF] to-[#00B05000]",
    border: "border-[#00B050]",
  },
];

export const dataTableOpportunities = [
  {
    Opportunity:
      "Establecer e implementar metodologías de análisis financiero con las cuales se permitan tomar decisiones estratégicas a corto y mediano plazo.",
    LineIntervention: "Gestión estratégica",
    Importance: { name: "Importante", color: "#FCEA68", index: 3 },
    Urgency: { name: "Urgente", color: "#FCEA68", index: 3 },
    Ease: { name: "Facilidad accesible", color: "#A8D08D", index: 2 },
    Result: { value: 29, color: "#FCBC68", index: 4 },
  },
  {
    Opportunity:
      "Establecer e implementar metodologías que permitan realizar análisis de posicionamiento en el mercado.",
    LineIntervention: "Gestión Financiera",
    Importance: { name: "No es muy importante", color: "#FCBC68", index: 4 },
    Urgency: { name: "Ligeramente urgente", color: "#FCBC68", index: 4 },
    Ease: { name: "Facilidad media", color: "#FCEA68", index: 3 },
    Result: { value: 10, color: "#FF8383", index: 5 },
  },
  {
    Opportunity:
      "Implementar herramientas de CRM con las cuales se permitan conocer diferentes ítems relacionados al cliente y el mercado.",
    LineIntervention: "Comercial y mercadeo",
    Importance: { name: "Importante", color: "#FCEA68", index: 3 },
    Urgency: { name: "Urgente", color: "#FCEA68", index: 3 },
    Ease: { name: "Facilidad baja", color: "#FCBC68", index: 4 },
    Result: { value: 14, color: "#FF8383", index: 5 },
  },
  {
    Opportunity:
      "Definir e implementar una metodología para desarrollar competencias específicas en los equipos de trabajo.",
    LineIntervention: "Talento humano",
    Importance: { name: "Altamente importante", color: "#A8D08D", index: 2 },
    Urgency: { name: "Muy urgente", color: "#A8D08D", index: 2 },
    Ease: { name: "Facilidad accesible", color: "#A8D08D", index: 2 },
    Result: { value: 64, color: "#A8D08D", index: 2 },
  },
  {
    Opportunity:
      "Diseñar el mapa de flujo de valor (VSM) de los principales productos de la empresa.",
    LineIntervention: "Gestión de operaciones",
    Importance: { name: "Altamente importante", color: "#A8D08D", index: 2 },
    Urgency: { name: "Altamente importante", color: "#A8D08D", index: 2 },
    Ease: { name: "Facilidad accesible", color: "#A8D08D", index: 2 },
    Result: { value: 100, color: "#A8D08D", index: 2 },
  },
  {
    Opportunity:
      "Diseñar e implementar metodologías de innovación dentro de la compañía que permitan innovar de una manera sistemática.",
    LineIntervention: "Gestión de la innovación",
    Importance: { name: "No es muy importante", color: "#FCBC68", index: 4 },
    Urgency: { name: "Ligeramente urgente", color: "#FCBC68", index: 4 },
    Ease: { name: "Facilidad media", color: "#FCEA68", index: 3 },
    Result: { value: 10, color: "#FF8383", index: 5 },
  },
  {
    Opportunity:
      "Desarrollar e implementar metodologías de la innovación dentro de la compañía que permitan innovar de manera sistemática.",
    LineIntervention: "Gestión de la innovación",
    Importance: { name: "Importante", color: "#FCEA68", index: 3 },
    Urgency: { name: "Urgente", color: "#FCEA68", index: 3 },
    Ease: { name: "Facilidad media", color: "#FCEA68", index: 3 },
    Result: { value: 22, color: "#FCBC68", index: 4 },
  },
  {
    Opportunity:
      "Implementar herramientas de inteligencia artificial (IA) o de aprendizaje automático (Machine Learning) para agilizar procesos y/o mejorar de prestación de servicios.",
    LineIntervention: "Gestión de la innovación",
    Importance: { name: "Muy importante", color: "#A8D08D", index: 2 },
    Urgency: { name: "Urgente", color: "#FCEA68", index: 3 },
    Ease: { name: "Facilidad media", color: "#FCEA68", index: 3 },
    Result: { value: 29, color: "#FCBC68", index: 4 },
  },
  {
    Opportunity:
      "Establecer e implementar metodologías de planeación estratégica general, definido metas a corto, mediano y largo plano y metodologías para realizar evaluaciones periódicas a  los procesos en general.",
    LineIntervention: "Gestión estratégica",
    Importance: { name: "Altamente importante", color: "#A8D08D", index: 2 },
    Urgency: { name: "Altamente importante", color: "#A8D08D", index: 2 },
    Ease: { name: "Altamente importante", color: "#A8D08D", index: 2 },
    Result: { value: 100, color: "#A8D08D", index: 2 },
  },
];

const jobVacancyCardItemWidth = 400;
const jobVacancyCardItemHeigh = 307;

enum jobVacancyItems {
  jobVacancyRegister = "Registro de Vacantes",
}

export const jobVacancyMenuItems: DescriptionLinkCardInterface[] = [
  {
    name: jobVacancyItems.jobVacancyRegister,
    href: "/job-vacancy-register",
    urlImage: "/utopia/icons/job-vacancy.svg",
    width: jobVacancyCardItemWidth,
    height: jobVacancyCardItemHeigh,
    imageClassname:
      "w-[5.748rem] h-[4.414rem] md:w-[5.748rem] md:h-[4.414rem] md:ml-6 mx-auto",
    //betaAccess: BETA_ACCESS,
    description: [
      "",
      "Registra tus vacantes y atrae el mejor talento",
      "para impulsar la innovación y el crecimiento de tu empresa.",
    ],
    canAccess: [],
  },
];

export enum FORM_JOB_REGISTER_PAGES {
  INTRODUCTION = 1,
  GENERAL_INFO = 2,
  VACANCY_INFO = 3,
  SPECIFIC_REQUIREMENTS = 4,
  REGISTER_RESULT = 5,
}

export const FORM_DB_SELECT_OPTIONS = {
  AFFIRMATIVE_LIST_OPTIONS: "AFFIRMATIVE_LIST_OPTIONS",

  BUSINESS_TYPE: "BUSINESS_TYPE",
  WORK_SECTOR: "WORK_SECTOR",

  ATTENTION_POINT: "ATTENTION_POINT",
  MUNICIPALITY_LIST: "MUNICIPALITY_LIST",
  HIRING_TYPE: "HIRING_TYPE",
  WORK_MODE: "WORK_MODE",
  SALARY_RANGE: "SALARY_RANGE",

  VACANCY_REQ_LANGUAGE: "VACANCY_REQ_LANGUAGE",
  DISABILITY_TYPE: "DISABILITY_TYPE",
  EXPERIENCE_RANGE: "EXPERIENCE_RANGE",
  WORK_DAYS: "WORK_DAYS",
  VEHICLE_TYPE: "VEHICLE_TYPE",
  LABORAL_GESTOR: "LABORAL_GESTOR",
  //WORK EXPERIENCE
  WORK_ROLE: "WORK_ROLE",
  EDUCATION_TITLE_OPTIONS: "EDUCATION_TITLE_OPTIONS",

  CIIU_CODE_LIST: "CIIU_CODE_LIST",
  LANGUAGE_LEVEL_OPTIONS: "LANGUAGE_LEVEL_OPTIONS",

  VACANCY_ORIGIN: "VACANCY_ORIGIN",
  COUNTRY_LIST: "COUNTRY_LIST",
  LICENSE_TYPE: "LICENSE_TYPE",
};

export const PENDING_SIGN_TECH_RECORDS_PER_PAGE = 10;

export enum TECH_REVISION_STATUS {
  approved = "APPROVED",
  rejected = "REJECT",
  pending = "PENDING", // UI only
  unknown = "UNKNOWN", // UI only
}

export enum BUSINESS_STATUS {
  VALIDATED = "VALIDATED",
  SUSPENDED = "SUSPENDED",
  INVALIDATED = "INVALIDATED",
}

export const EMPLOYEES_STATUS = {
  SUSPENDED: "SUSPE",
  VALIDATED: "VIGEN",
};

export const EMPLOYEES_STATUS_TEXT = {
  [EMPLOYEES_STATUS.VALIDATED]: "Validado",
  [EMPLOYEES_STATUS.SUSPENDED]: "Suspendido",
};
