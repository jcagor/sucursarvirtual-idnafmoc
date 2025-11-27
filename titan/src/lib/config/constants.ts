import {
  DescriptionLinkCardInterface,
  ItemMenuInterface,
  LinkCardInterface,
  SelectOption,
  UserDataInterface,
} from "lib";

export const FIRST_RELEASE = true;
export const ACCESSIBILITY_CONTROL_FF = true;
export const ACCESSIBILITY_SCHOOL_KIT_FF = false;
/**
 * This feature flag enables or disables the flow to upload documents and unlock a PAC
 */
export const UNLOCK_PAC_DOCUMENTS = false;

export const PENDING_TRANSACTION = 1;
export const COMPLETE_TRANSACTION = 2;
export const PREVIOUS_TRANSACTION = 14;

// Constante que determina quién visualiza las cards en versión BETA (No disponible al público).
export const BETA_ACCESS = [
  "1",
  "1129578862", // Juliette Sarabria
  "1144154038", // Harrison Morales
  "1107088739", // Pastor Batancourt
  "1113692937", // Alvaro Tobar
  "1151969298", // Victor Hurtado
  "1006015983", // Carlos Hernandez
  "1005964681", // Giovanni Jaramillo
  "1065909445", // Jean Carlos
  "1143942152", // Jhon Zúñiga
  "38603808", // Carolina Suárez
  "1144168465", // Jose Masoutier
  "1144070453", // Luisa (MPAC)
  "1113659965", // Jessica Pantoja (MPAC)
  "1234567890", // Cesar Munoz - OLS
  "86076434", // Rafael Velasquez Afiliaciones
  "1061822247",
  "1005891273", // MPAC
  "31153235", // MPAC

  "1113669857", // Sandra Alzate Afiliaciones
  "1116273861", // Duvan Quevedo
  "1130606378", // Debug CESANTE
  "1007403708", // Sergio Ramos
  "1193372843", // Juan David Monge Afiliaciones

  "1039470330", //Hans.Garcia@co.ey.com
  "1000390447", //Paula.Franco1@co.ey.com
  "1006661312", //Sebastian.Mora@co.ey.com
  "1020803434", //Helena.Arroyo@co.ey.com

  "1113659965",
  "1005891273",
  "31153235",
  "1007403708",
];

//  TODO: Eliminar esta constante.
export const SPECIE_BETA_ACCESS = [
  "1129578862", // Juliette Sarabria
  "1113692937", // Alvaro Tobar
  "1151969298", // Victor Hurtado
  "1143942152", // Jhon Zúñiga
];

export const DIGITAL_BETA_ACCESS = [
  "1129578862", // Juliette Sarabria
  "1113692937", // Alvaro Tobar
  "1151969298", // Victor Hurtado
  "1143942152", // Jhon Zúñiga

  // CONVENIOS

  "1144037332", // Danny Gomez (CONVENIOS)
  "16377875", // Andrés Murillo (CONVENIOS)
];

export const CREDIT_BETA_ACCESS = [
  "1129578862", // Juliette Sarabria
  "1113692937", // Alvaro Tobar
  "1151969298", // Victor Hurtado
  "1143942152", // Jhon Zúñiga
];

export const HEALTH_BETA_ACCESS = [
  "1129578862", // Juliette Sarabria
  "1113692937", // Alvaro Tobar
  "1151969298", // Victor Hurtado
  "1143942152", // Jhon Zúñiga
];

export const DIGITAL_IDENTITY_STATUS_MESSAGE = {
  COMPLETE: "complete",
  IN_PROCESS: "in_process",
  INCOMPLETE: "error",
  REVALIDATE: "revalidate",
};

// SISE API
export enum SISE_API_RESULT_CODE_ENUM {
  NOT_REGISTERED = "Usuario no encontrado",
}

export const SISE_USER_STATUS_MESSAGE = {
  COMPLETE: "complete",
  IN_PROCESS: "in_process",
  INCOMPLETE: "error",
  REVALIDATE: "revalidate",
};

export const SISE_API_RESULT_CODE = {
  ACTIVO: "Activo",
  CODEUDOR: "Inactivo x Tiempo",
};

// MPAC API
export const MPAC_USER_STATUS_MESSAGE = {
  COMPLETE: "complete",
  IN_PROCESS: "in_process",
  OBSERVATIONS: "observations",
  INCOMPLETE: "error",
  REVALIDATE: "revalidate",
};

export enum MPAC_API_USER_REQUIREMENT_STATUS_ENUM {
  OK = "Cumple", // Usuario cumple
  OK_2 = "SI", // Usuario cumple
  ERROR = "NO", // Usuario no cumple
}

export enum MPAC_API_USER_REQUIREMENT_STATUS_CODE_ENUM {
  OK = "001", // Usuario cumple
  FAIL = "002", // Usuario no cumple
}

export const MPAC_API_USER_REQUIREMENT_STATUS = {
  OK: MPAC_API_USER_REQUIREMENT_STATUS_ENUM.OK,
  OK_2: MPAC_API_USER_REQUIREMENT_STATUS_ENUM.OK_2,
  ERROR: MPAC_API_USER_REQUIREMENT_STATUS_ENUM.ERROR,
};

export enum MPAC_API_USER_TYPE_ENUM {
  ERROR = "ERROR", //- No cumple
  BENEFICIARY = "BENEFICIARIO", //- Beneficiario
  ACTIVE_WORKER = "TRABAJADOR ACTIVO", //- Trabajador activo
  CESANT = "CESANTE", //- Cesante
  RETIRED = "RETIRADO", //- pensionado
  UNIVERSAL = "UNIVERSAL", //- Población universal
}

export const MPAC_API_USER_TYPE = {
  ERROR: MPAC_API_USER_TYPE_ENUM.ERROR,
  BENEFICIARY: MPAC_API_USER_TYPE_ENUM.BENEFICIARY,
  ACTIVE_WORKER: MPAC_API_USER_TYPE_ENUM.ACTIVE_WORKER,
  CESANT: MPAC_API_USER_TYPE_ENUM.CESANT,
  RETIRED: MPAC_API_USER_TYPE_ENUM.RETIRED,
  UNIVERSAL: MPAC_API_USER_TYPE_ENUM.UNIVERSAL,
};

export enum MPAC_API_DOCUMENT_TYPE_ENUM {
  P_PROTECCION_TEMPORAL = "CY", //-Permiso por Protección Temporal
  C_DIPLOMATICO = "CD", //-Carnet Diplomático
  CEDULA_CIUDADANIA = "CC", //-Cédula de ciudadanía
  TARJETA_IDENTIDAD = "TI", //-Tarjeta de identidad
  CEDULA_ESTRANJERIA = "CE", //-Cédula de extranjeria
  PASAPORTE = "CP", //-Pasaporte
  REGISTRO_CIVIL = "CL", //-Registro Civil
  P_SPECIAL_TEMPORAL = "CV", //-Permiso Especial de Permanencia Temporal
}

export const MPAC_API_DOCUMENT_TYPE = {
  P_PROTECCION_TEMPORAL: MPAC_API_DOCUMENT_TYPE_ENUM.P_PROTECCION_TEMPORAL,
  C_DIPLOMATICO: MPAC_API_DOCUMENT_TYPE_ENUM.C_DIPLOMATICO,
  CEDULA_CIUDADANIA: MPAC_API_DOCUMENT_TYPE_ENUM.CEDULA_CIUDADANIA,
  TARJETA_IDENTIDAD: MPAC_API_DOCUMENT_TYPE_ENUM.TARJETA_IDENTIDAD,
  CEDULA_ESTRANJERIA: MPAC_API_DOCUMENT_TYPE_ENUM.CEDULA_ESTRANJERIA,
  PASAPORTE: MPAC_API_DOCUMENT_TYPE_ENUM.PASAPORTE,
  REGISTRO_CIVIL: MPAC_API_DOCUMENT_TYPE_ENUM.REGISTRO_CIVIL,
  P_SPECIAL_TEMPORAL: MPAC_API_DOCUMENT_TYPE_ENUM.P_SPECIAL_TEMPORAL,
};

export enum MPAC_API_RESULT_CODE_ENUM {
  OK = "Consulta exitosa", //-Consulta exitosa
  NOT_FOUND = "Documento No Encontrado",
  ERROR = "", //-Error en la consulta [Multiple values and descriptions]
}

export const MPAC_API_RESULT_CODE = {
  OK: MPAC_API_RESULT_CODE_ENUM.OK,
  NOT_FOUND: MPAC_API_RESULT_CODE_ENUM.NOT_FOUND,
  ERROR: MPAC_API_RESULT_CODE_ENUM.ERROR,
};

export enum MPAC_API_LAW_TYPE {
  LEY_1636 = "1636",
  LEY_2069 = "2069",
}

// FOSPEC API
export const FOSPEC_USER_STATUS_MESSAGE = {
  COMPLETE: "complete",
  INCOMPLETE: "incomplete",
  IN_PROCESS: "in_process",
  ERROR: "error",
  REVALIDATE: "revalidate",
};

export const FOSPEC_API_RESULT_CODE = {
  HV_OK: "COMPLETA",
};

// JUPITER API
export enum JUPITER_USER_STATUS_MESSAGE {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
  ERROR = "error",
}

//-----------------------------------------------------

export const sidebarItems: ItemMenuInterface[] = [
  {
    path: "/menu-affiliations",
    label: "Afiliaciones",
    // betaAccess: BETA_ACCESS,
  },
  {
    path: "/subsidies",
    label: "Subsidios",
  },
  //{
  //  path: "/employability",
  //  label: "Fortalecimiento Profesional",
  //  betaAccess: BETA_ACCESS,
  //},
  {
    path: "/certificates",
    label: "Certificados",
  },
  {
    path: "/knowhere/see-credits",
    label: "Crédito Comfandi",
    externalLink: true,
  },
  // {
  //   path: "/sakaar/Agreements",
  //   label: "Convenios",
  //   externalLink: true,
  // },
  {
    path: "/nidavellir",
    label: "Convenios",
    externalLink: true,
    betaAccess: DIGITAL_BETA_ACCESS,
  },
];

export const sidebarBottomItems: ItemMenuInterface[] = [
  // {
  //   path: "/my-affiliations",
  //   label: "Mis afiliaciones",
  //   betaAccess: BETA_ACCESS,
  // },
];

// HOME

export const HOME_ERROR_NOT_REGISTERED =
  "Ingresa a la plataforma SISE y registra tu Hoja de Vida, " +
  "Debes tener en cuenta que luego de registrarte debes esperar 24 horas " +
  "para intentar acceder nuevamente.";
export const HOME_ERROR_NOT_MEET_REQUIREMENTS =
  "El usuario actual no cumple con los requerimientos específicos " +
  "para hacer uso de este modulo, contacta a servicio al cliente " +
  "para obtener detalles.";
export const HOME_ERROR_FOMENTO_NO_MEET =
  "Recuerda que debes solicitar tu cita de agendamiento para " +
  "acceder a este servicio, presiona el botón para iniciar.";
export const HOME_ERROR_INVALID_STATUS =
  "Se produjo un error al consultar tu estado, intenta refrescar la pagina, " +
  "o si el error persiste contacta a servicio técnico para verificar " +
  "tu estado de registro.";
export const HOME_ERROR_TOO_FAST =
  "Intenta de nuevo en un par de segundos, aún se esta verificando tu estado.";

export const homeMenuItems: LinkCardInterface[] = [
  {
    href: "/subsidies",
    name: "Subsidios",
    urlImage: "/icons/subsidies-icon.png",
    width: 115,
    height: 110,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    hideInKiosk: true,
  },
  {
    href: "/employability",
    name: "Programa de fortalecimiento profesional",
    urlImage: "/icons/employability-route.png",
    width: 106,
    height: 90,
    imageClassname:
      "w-[4.058rem] h-[4.058rem] md:w-[4.058rem] md:h-[4.058rem] md:ml-8 mx-auto",
    prefetch: false,
  },
  // {
  //   href: "/sakaar/Agreements",
  //   name: "Convenios",
  //   urlImage: "/icons/agreements-icon.png",
  //   width: 64,
  //   height: 64,
  //   imageClassname:
  //     "w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem] md:ml-6 mx-auto",
  //   externalLink: true,
  // },
  {
    href: "/nidavellir",
    name: "Convenios",
    urlImage: "/icons/agreements-icon.png",
    width: 64,
    height: 64,
    imageClassname:
      "w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem] md:ml-6 mx-auto",
    externalLink: true,
  },
  {
    href: "/certificates",
    name: "Certificados",
    urlImage: "/icons/certifications-icon.png",
    width: 84,
    height: 84,
    imageClassname:
      "w-[3.778rem] h-[3.778rem] md:w-[3.778rem] md:h-[3.778rem] md:ml-8 mx-auto",
  },
  {
    href: "/knowhere/see-credits",
    name: "Crédito Comfandi",
    urlImage: "/icons/credits-icon.png",
    width: 106,
    height: 90,
    imageClassname:
      "w-[4.548rem] h-[3.778rem] md:w-[4.548rem] md:h-[3.778rem] md:ml-7 md:mt-3 mx-auto",
    externalLink: true,
    prefetch: true,
  },
  {
    href: "/digital-wallet",
    name: "Billetera Digital",
    urlImage: "/icons/digital-wallet-icon.png",
    width: 106,
    height: 90,
    imageClassname:
      "w-[3.499rem] h-[3.708rem] md:w-[3.499rem] md:h-[3.708rem] md:ml-8 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/limbo",
    name: "Servicios de Salud",
    urlImage: "/icons/health-services-icon.png",
    width: 106,
    height: 90,
    imageClassname:
      "w-[4.058rem] h-[4.058rem] md:w-[4.058rem] md:h-[4.058rem] md:ml-8 mx-auto",
    // betaAccess: [...BETA_ACCESS, ...HEALTH_BETA_ACCESS],
    externalLink: true,
    prefetch: true,
  },
];

// EMPLOYABILITY

export enum employabilityMenuItemTites {
  RESUME_CARD = "Actualizar mi hoja de Vida",
  JOB_OFFER = "Ver vacantes de empleo",
  OCCUPATIONAL_GAPS = "Análisis de brechas ocupaciones",
  THT_TESTS = "Habilidades (Pruebas THT)",
  SOCIO_OCCUPATIONAL_WORKSHOP = "Taller socio ocupacionales",
  MENTORING_CARD = "Mentorías",
  TRAINING_REMISSION = "Mis formaciones",
  PSYCHOMETRIC_TEST = "Prueba psicométrica",
}

const employabilityCardItemWidth = 400;
const employabilityCardItemHeigh = 307;

export const EMPLOYABILITY_ERROR_NOT_REGISTERED =
  "Te informamos que tu estado actual se encuentra pendiente, " +
  'debes realizar proceso en "Análisis de brechas ocupacionales"';
export const EMPLOYABILITY_ERROR_INVALID_STATUS =
  "Contacta a servicio técnico para verificar tu estado de registro.";
export const EMPLOYABILITY_ERROR_TOO_FAST =
  "Intenta de nuevo en un par de segundos, aún se esta verificando tu estado.";
export const EMPLOYABILITY_MSG_VALID_STATUS =
  "Tu estado es correcto para ingresar al modulo en construcción ";
export const TRAINING_MSG_HISTORY_FOUND =
  "Se encuentra que ya tomaste este curso en los últimos 3 años";
export const USER_RESUME_INCOMPLETE_STATUS =
  `Por favor actualiza tus datos e información ` +
  `en el modulo (${employabilityMenuItemTites.RESUME_CARD}), antes de acceder a esta función.`;
export const NOT_SCHEDULE_AVAILABLE_MSG = "SIN CRONOGRAMA DISPONIBLE";

export const employabilityMenuItems: DescriptionLinkCardInterface[] = [
  {
    name: employabilityMenuItemTites.RESUME_CARD,
    href: "/resume",
    urlImage: "/icons/see-credits.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    description: [
      "Haz brillar tu experiencia y destaca tus habilidades",
      "actualizando tu hoja de vida.",
    ],
    canAccess: [
      MPAC_API_USER_TYPE.CESANT,
      MPAC_API_USER_TYPE.UNIVERSAL,
      MPAC_API_USER_TYPE.ACTIVE_WORKER,
      MPAC_API_USER_TYPE.BENEFICIARY,
    ],
  },
  {
    name: employabilityMenuItemTites.JOB_OFFER,
    href: "/postulation",
    urlImage: "/icons/briefcase-icon.svg",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    description: [
      "Te apoyaremos para mejorar tus condiciones laborales y que logres",
      "movilizarte hacia la productividad o un mejor empleo.",
    ],
    canAccess: [
      MPAC_API_USER_TYPE.CESANT,
      MPAC_API_USER_TYPE.UNIVERSAL,
      MPAC_API_USER_TYPE.ACTIVE_WORKER,
      MPAC_API_USER_TYPE.BENEFICIARY,
    ],
  },
  {
    name: employabilityMenuItemTites.OCCUPATIONAL_GAPS,
    href: "https://forms.office.com/pages/responsepage.aspx?id=7RAcgZj40Ee8zu57F_aw_4SruFt_OF1OkwQEve4dTx9UME9WME9RMFoyWUxQWk9aNFowRDRJQ1pMNy4u&route=shorturl",
    externalLink: true,
    urlImage: "/icons/blue-ticks-on-paper.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    description: [
      "Agenda tu",
      "orientación socio-ocupacional",
      "y reserva tu cita para recibir acompañamiento  personalizado que impulse tu desarrollo laboral.",
    ],
    canAccess: [MPAC_API_USER_TYPE.CESANT, MPAC_API_USER_TYPE.BENEFICIARY],
  },
  {
    name: employabilityMenuItemTites.THT_TESTS,
    href: "#",
    urlImage: "/icons/employability-route.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    betaAccess: BETA_ACCESS,
    description: [
      "",
      "Se medirán tus diferentes capacidades",
      "cognitivas y competencias digitales",
    ],
    canAccess: [],
  },
  {
    name: employabilityMenuItemTites.SOCIO_OCCUPATIONAL_WORKSHOP,
    href: "#",
    urlImage: "/icons/pen-blue-ticks.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    betaAccess: BETA_ACCESS,
    description: [
      "",
      "Te proporcionará herramientas y conocimientos",
      "que faciliten tu inserción laboral y desarrollo personal.",
    ],
    canAccess: [], //MPAC_API_USER_TYPE.UNIVERSAL, MPAC_API_USER_TYPE.RETIRED
  },
  {
    name: employabilityMenuItemTites.MENTORING_CARD,
    href: "#",
    urlImage: "/icons/press-graph-up.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    betaAccess: BETA_ACCESS,
    description: [
      "",
      "Te ayudará a identificar tus objetivos",
      ", desarrollar habilidades y crear estrategias para alcanzar tus metas.",
    ],
    canAccess: [], //MPAC_API_USER_TYPE.UNIVERSAL
  },
  {
    name: employabilityMenuItemTites.TRAINING_REMISSION,
    href: "/training",
    urlImage: "/icons/tab-graph-mid.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    description: [
      "Fortalece tus competencias productivas, adquiriendo herramientas y habilidades que te permitirán",
      "optimizar tu desempeño como trabajador activo,",
      "aportando valor a la empresa en la que te desempeñas.",
    ],
    canAccess: [
      MPAC_API_USER_TYPE.CESANT,
      MPAC_API_USER_TYPE.ACTIVE_WORKER,
      MPAC_API_USER_TYPE.BENEFICIARY,
    ],
  },
  {
    name: employabilityMenuItemTites.PSYCHOMETRIC_TEST,
    href: "/psicometric-test",
    urlImage: "/icons/certifications-icon.png",
    width: employabilityCardItemWidth,
    height: employabilityCardItemHeigh,
    imageClassname:
      "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    description: [
      "Se realizarán una examen",
      "según el perfil",
      "que tengas asignado.",
    ],
    betaAccess: BETA_ACCESS,
    canAccess: [
      MPAC_API_USER_TYPE.CESANT,
      MPAC_API_USER_TYPE.ACTIVE_WORKER,
      MPAC_API_USER_TYPE.BENEFICIARY,
    ],
  },
];

//END EMPLOYABILITY

// TRAINING

export const TRAINING_COURSE_DEFAULT_LINK =
  "https://creactivatecomfandi.com/comfandi/inicio";

// SUBSIDY

export const subsidyMenuItems: LinkCardInterface[] = [
  {
    href: "/euphoria/steps/GetStarted",
    name: "Subsidio de vivienda",
    urlImage: "/icons/house-icon.png",
    width: 109,
    height: 109,
    imageClassname: "w-[5rem] h-[5rem] md:w-[5rem] md:h-[5rem] md:ml-5 mx-auto",
  },
  {
    href: "/calisto/menu/EmployabilityRouteMenu",
    name: "Subsidio de desempleo",
    urlImage: "/icons/brief-icon.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[2.75rem] h-[2.563rem] md:w-[2.75rem] md:h-[2.563rem] md:ml-9 mx-auto",
  },
  {
    href: "/viltrum/monetary",
    name: "Subsidio familiar monetario",
    urlImage: "/icons/subsidy-amounts.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[3.125rem] h-[2.856rem] md:w-[3.125rem] md:h-[2.856rem] md:ml-9 mx-auto",
    prefetch: true,
  },
  {
    href: "/assigment-dates",
    name: "Fechas de asignación",
    urlImage: "/icons/assignment-dates.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[4.688rem] h-[4.688rem] md:w-[4.688rem] md:h-[4.688rem] md:ml-6 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/subsidies-amounts",
    name: "Montos de subsidio",
    urlImage: "/icons/subsidy-amounts.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[3.125rem] h-[2.856rem] md:w-[3.125rem] md:h-[2.856rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/vanaheim/subsidies",
    name: "Subsidio en especie",
    urlImage: "/icons/specie-icon.png",
    width: 112,
    height: 112,
    imageClassname:
      "w-[3.125rem] h-[3.22rem] md:w-[3.5rem] md:h-[3.595rem] md:ml-9 md:mb-3 mx-auto",
    // betaAccess: BETA_ACCESS,
  },
  {
    href: "/employability",
    name: "Ruta de empleabilidad",
    urlImage: "/icons/employability-route.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[4.063rem] h-[3.148rem] md:w-[4.063rem] md:h-[3.148rem] md:ml-6 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/nemea",
    name: "Gestión de novedades",
    urlImage: "/icons/employability-route.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[4.063rem] h-[3.148rem] md:w-[4.063rem] md:h-[3.148rem] md:ml-6 mx-auto",
  },
];

export const certificatesMenuItems = [
  {
    href: "/cilene",
    name: "Descarga tus certificados",
    urlImage: "/icons/certifications-icon.png",
    width: 100,
    height: 111,
    imageClassname:
      "w-[3.148rem] h-[3.148rem] md:w-[3.563rem] md:h-[3.563rem] md:ml-9 mx-auto",
  },
  {
    href: "/cilene",
    name: "Carga tus certificados",
    urlImage: "/icons/extracts.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[2.5rem] h-[2.625rem] md:w-[3.313rem] md:h-[3.375rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
];

export const creditMenuItems: LinkCardInterface[] = [
  {
    href: "/credits/simulation",
    name: "Simula tu crédito",
    urlImage: "/icons/calculator-icon.png",
    width: 65,
    height: 61,
    imageClassname:
      "w-[3.063rem] h-[2.875rem] md:w-[3.063rem] md:h-[2.875rem] md:ml-8 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/apply",
    name: "Solicita tu crédito",
    urlImage: "/icons/request-credit.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[2.688rem] h-[3.625rem] md:w-[2.688rem] md:h-[3.625rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/see-credits",
    name: "Ver mis créditos",
    urlImage: "/icons/see-credits.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[3.188rem] h-[3.188rem] md:w-[3.188rem] md:h-[3.188rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/comfandi-card",
    name: "Tarjeta Comfandi",
    urlImage: "/icons/comfandi-card.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[4.08rem] h-[3.458rem] md:w-[4.08rem] md:h-[3.458rem] md:ml-7 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/purpose-credit",
    name: "Crédito con propósito",
    urlImage: "/icons/purpose-credit.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[2.813rem] h-[3.25rem] md:w-[2.813rem] md:h-[3.25rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/rotating-quota",
    name: "Cupo rotativo",
    urlImage: "/icons/rotating-quota.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[4.25rem] h-[4.25rem] md:w-[4.25rem] md:h-[4.25rem] md:ml-7 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/ensurance",
    name: "Seguros",
    urlImage: "/icons/ensurance.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[3.5rem] h-[3.5rem] md:w-[3.5rem] md:h-[3.5rem] md:ml-7 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/vehicle",
    name: "Crédito de vehículo",
    urlImage: "/icons/vehicle-credit.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[4.25rem] h-[2.875rem] md:w-[4.25rem] md:h-[2.875rem] md:ml-7 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/release",
    name: "Crédito de libranza",
    urlImage: "/icons/release-credit.png",
    width: 67,
    height: 69,
    imageClassname: "w-[4rem] h-[4rem] md:w-[4rem] md:h-[4rem] md:ml-7 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/mortgage",
    name: "Crédito hipotecario",
    urlImage: "/icons/mortgage-credit.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[3.942rem] h-[3.5rem] md:w-[3.942rem] md:h-[3.5rem] md:ml-7 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/extracts",
    name: "Extractos",
    urlImage: "/icons/extracts.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[2.5rem] h-[2.625rem] md:w-[2.5rem] md:h-[2.625rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/credits/certifications",
    name: "Certificaciones",
    urlImage: "/icons/certifications-icon.png",
    width: 67,
    height: 69,
    imageClassname:
      "w-[3.063rem] h-[3.063rem] md:w-[3.063rem] md:h-[3.063rem] md:ml-9 mx-auto",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
];

export const AffiliationsMenuItems: LinkCardInterface[] = [
  {
    href: "/affiliations/add-pacs",
    name: "Agregar Beneficiario",
    urlImage: "/icons/plus-icon.webp",
    width: 65,
    height: 61,
    imageClassname: "w-12 h-12 mx-auto",
    description: "Personas a Cargo",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
  {
    href: "/filed",
    name: "Radicados",
    urlImage: "/icons/assignment-dates.png",
    width: 65,
    height: 61,
    imageClassname: "w-12 h-12 mx-auto",
    description: "Personas a Cargo",
    betaAccess: BETA_ACCESS,
    prefetch: false,
  },
];

export const EMPTY_USER: UserDataInterface = {
  exp: 0,
  iat: 0,
  auth_time: 0,
  jti: "",
  iss: "",
  sub: "",
  typ: "",
  azp: "",
  session_state: "",
  acr: "",
  "allowed-origins": [],
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
  edcmfndi: "",
};

// ========================================= Auth

export const AUTH_LOADING_STATUS = "loading";
export const AUTHENTICATED_STATUS = "authenticated";

// ========================================= PACS Data
// CONSTATNS
export const PACS_TEMPLATE = "templates/DeclaracionJuramentada.pdf";
export const PENSIONER_AUTORIZATION =
  "templates/AUTORIZACION DESCUENTO MESADA PENSIONAL.pdf";
export const VALLE_DEL_CAUCA_DEPARTMENT_CODE = "76";
export const CALI_CITY_CODE = "76001";

export const CIVIL_STATUS_SPOUCE: SelectOption[] = [
  {
    label: "Casado",
    value: "2",
  },
  {
    label: "Unión libre",
    value: "5",
  },
];

export const CIVIL_STATUS: SelectOption[] = [
  {
    label: "Soltero",
    value: "1",
  },
  {
    label: "Casado(a)",
    value: "2",
  },
  {
    label: "Separado",
    value: "3",
  },
  {
    label: "Viudo/a",
    value: "4",
  },
  {
    label: "Unión Libre",
    value: "5",
  },
];
export const GENDER: SelectOption[] = [
  {
    label: "Femenino",
    value: "1",
    sapValue: "1",
  },
  {
    label: "Masculino",
    value: "2",
    sapValue: "0",
  },
];
export const SEXUAL_PREFERENCE: SelectOption[] = [
  {
    label: "Heterosexual",
    value: "01",
  },
  {
    label: "Homosexual",
    value: "02",
  },
  {
    label: "Bisexual",
    value: "03",
  },
  {
    label: "Información no disponible",
    value: "04",
  },
];
export const ACADEMIC_LEVEL: SelectOption[] = [
  {
    label: "PRIMARIA - GRADO 1",
    value: "01",
  },
  {
    label: "PRIMARIA -  GRADO 2",
    value: "02",
  },
  {
    label: "PRIMARIA - GRADO 3",
    value: "03",
  },
  {
    label: "PRIMARIA - GRADO 4",
    value: "04",
  },
  {
    label: "PRIMARIA - GRADO 5",
    value: "05",
  },
  {
    label: "BACHILLERATO - GRADO 6",
    value: "06",
  },
  {
    label: "BACHILLERATO - GRADO 7",
    value: "07",
  },
  {
    label: "BACHILLERATO - GRADO 8",
    value: "08",
  },
  {
    label: "BACHILLERATO - GRADO 9",
    value: "09",
  },
  {
    label: "BACHILLERATO - GRADO 10",
    value: "10",
  },
  {
    label: "BACHILLERATO - GRADO 11",
    value: "11",
  },
  {
    label: "TECNICO",
    value: "12",
  },
  {
    label: "ESTUDIOS SUPERIORES",
    value: "13",
  },
  {
    label: "NO FORMAL",
    value: "14",
  },
  {
    label: "NINGUNA",
    value: "99",
  },
];
export const ONE_ANSWER: SelectOption[] = [
  { label: "Si", value: "1" },
  { label: "No", value: "0" },
];
export const VULNERABILITY_FACT: SelectOption[] = [
  {
    label: "No aplica",
    value: "1",
  },
  {
    label: "Desplazado",
    value: "2",
  },
  {
    label: "Victima del conflicto armado No desplazado",
    value: "3",
  },
  {
    label: "Desmovilizado o reinsertado",
    value: "4",
  },
  {
    label: "Hijo (as) de desmovilizados o reinsertados",
    value: "5",
  },
  {
    label: "Damnificado desastre natural",
    value: "6",
  },
  {
    label: "Cabeza de familia",
    value: "7",
  },
  {
    label: "Hijo (as) de madres cabeza de familia",
    value: "8",
  },
  {
    label: "En condición de discapacidad",
    value: "9",
  },
  {
    label: "Población migrante",
    value: "10",
  },
  {
    label: "Población zonas frontera (Nacionales)",
    value: "11",
  },
  {
    label: "Ejercicio del trabajo sexual",
    value: "12",
  },
  {
    label: "No Disponible",
    value: "13",
  },
];
export const INDIGENOUS_ETNICHITY_CODE = "3";
export const ETNICHITY: SelectOption[] = [
  {
    label: "Afrocolombiano",
    value: "1",
  },
  {
    label: "Comunidad negra",
    value: "2",
  },
  {
    label: "Indígena",
    value: INDIGENOUS_ETNICHITY_CODE.toString(),
  },
  {
    label: "Palanquero",
    value: "4",
  },
  {
    label:
      "Raizal del Archipielago de San Andrés, Providencia y Santa Catalina",
    value: "5",
  },
  {
    label: "Room/gitano",
    value: "6",
  },
  {
    label: "No se autoreconoce en ninguno de los anteriores",
    value: "7",
  },
  {
    label: "No disponible",
    value: "8",
  },
];
export const OCUPATION: SelectOption[] = [
  { label: "Hogar", value: "01" },
  { label: "Empleado", value: "02" },
  { label: "Independiente", value: "03" },
  { label: "Pensionado", value: "04" },
  { label: "Desempleado", value: "05" },
];
export const SALARY_TYPE: SelectOption[] = [
  {
    label: "Integral",
    value: "01",
  },
  {
    label: "Fijo",
    value: "02",
  },
  {
    label: "Variable",
    value: "03",
  },
];
export const REASON_WITHDRAWAL: SelectOption[] = [
  {
    label: "Pasa a ser trabajador",
    value: "31",
  },
  {
    label: "Pac no depende del trabajador",
    value: "15",
  },
  {
    label: "Pensionado",
    value: "02",
  },
];
// ========================================= CampaignTypes of  affiliations

export const CAMPAIGN_TYPE_AFFILIATION_PAC_CODE = 3;
export const CAMPAIGN_TYPE_AFFILIATION_PENSIONER_CODE = 9;
export const CAMPAIGN_TYPE_AFFILIATION_INDEPENDENT_CODE = 5;

export const AFFILIATIONS_CAMPAIGN_TYPE: { [key: string]: string } = {
  [CAMPAIGN_TYPE_AFFILIATION_PAC_CODE]: "Gestión PACs",
  [CAMPAIGN_TYPE_AFFILIATION_PENSIONER_CODE]: "Afiliación Pensionados",
  [CAMPAIGN_TYPE_AFFILIATION_INDEPENDENT_CODE]: "Afiliación Independientes",
};
export const EMPLOYEE_OCCUPATION_CODE = "02";
export const KINDSHIP_SON_VALUE = "1";
export const KINDSHIP_STEPSON_VALUE = "2";
export const KINDSHIP_SPOUCE_VALUE = "5";
export const KINDSHIP_BROTHER_VALUE = "4";
export const PARENTS_KINDSHIP_CODE = "3";
export const PARENTS_MOTHER_KINDSHIP_CODE = "3.1";
export const PARENTS_FATHER_KINDSHIP_CODE = "3.2";
export const KINDSHIP: SelectOption[] = [
  { label: "Hijo/a", value: KINDSHIP_SON_VALUE },
  { label: "Hijastro/a", value: KINDSHIP_STEPSON_VALUE },
  { label: "Madre", value: PARENTS_MOTHER_KINDSHIP_CODE },
  { label: "Padre", value: PARENTS_FATHER_KINDSHIP_CODE },
  { label: "Hermano/a", value: KINDSHIP_BROTHER_VALUE },
  { label: "Cónyuge", value: KINDSHIP_SPOUCE_VALUE },
];

// ========================================= Status of request
export const FILED_STATUS_FILED_CODE = 1;
export const FILED_STATUS_APPROVED_CODE = 2;
export const FILED_STATUS_REJECTION_CODE = 3;
export const FILED_STATUS_IN_PROGRESS_CODE = 4;
export const FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE = 5;
export const FILED_STATUS_PROCESSED_WITH_ERROR_CODE = 6;
export const FILED_STATUS_RETURNED_CODE = 7;
export const FILED_STATUS_EXPIRED_CODE = 8;

export const FILED_STATUS: { [key: string]: string } = {
  [FILED_STATUS_FILED_CODE]: "Radicado",
  [FILED_STATUS_APPROVED_CODE]: "Aprobado",
  [FILED_STATUS_REJECTION_CODE]: "Rechazado",
  [FILED_STATUS_IN_PROGRESS_CODE]: "En proceso",
  [FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE]: "Procesado con éxito",
  [FILED_STATUS_PROCESSED_WITH_ERROR_CODE]: "Procesado con error",
  [FILED_STATUS_RETURNED_CODE]: "Devuelto",
  [FILED_STATUS_EXPIRED_CODE]: "Vencido",
};

// ________________________________________ SAP
/**
 * Pac bloqued document indicator ID
 */
export const BLOQUED_PAC_DOCUMENT_QA = "01"; // Used to identify if a PAC in pre prod has blocks
export const BLOQUED_PAC_SUBSIDY_QA = "01"; // Used to identify if a PAC in pre prod has blocks
export const BLOQUED_PAC_DOCUMENT = "1"; // Used to identify if a PAC in prod has blocks
export const BLOQUED_PAC_SUBSIDY = "1"; // Used to identify if a PAC in prod has blocks

/**
 * Pac bloqued subsidy indicator ID
 */

export const RELATIONSHIP = [
  { value: "SUB-0002", label: "COMPAÑERO/A" },
  { value: "SUB-0003", label: "HIJO/A" },
  { value: "SUB-0004", label: "HERMANO/A" },
  { value: "SUB-0005", label: "HIJASTRO/A" },
  { value: "SUB-0008", label: "PADRE" },
  { value: "SUB-0009", label: "MADRE" },
];

export const SPOUSE_SAP_CODE = "SUB-0002";
export const SON_SAP_CODE = "SUB-0003";
export const BROTHER_SAP_CODE = "SUB-0004";
export const STEPSON_SAP_CODE = "SUB-0005";
export const FATHER_SAP_CODE = "SUB-0008";
export const BIOLOGIC_MOTHER_OR_FATHER_SAP_CODE = "SUB-0007";
export const MOTHER_SAP_CODE = "SUB-0009";

export const SKIP_PAC = { label: "Pasa a ser trabajador", value: "31" };
export const NO_DEPENDENT_PAC = {
  label: "Pac no depende del trabajador",
  value: "15",
};
export const RETIRED_PAC = { label: "Pensionado", value: "02" };
export const END_PAC = { label: "Fin de convivencia", value: "11" };
export const AGE_PAC = { label: "Mayoría de edad", value: "14" };
export const DEATH_PAC = { label: "Fallecimiento", value: "000" };

export const REASON_WITHDRAWAL_PAC: { [key: string]: SelectOption[] } = {
  [SPOUSE_SAP_CODE]: [END_PAC, DEATH_PAC],
  [SON_SAP_CODE]: [SKIP_PAC, NO_DEPENDENT_PAC, AGE_PAC, DEATH_PAC],
  [BROTHER_SAP_CODE]: [SKIP_PAC, NO_DEPENDENT_PAC, AGE_PAC, DEATH_PAC],
  [STEPSON_SAP_CODE]: [SKIP_PAC, NO_DEPENDENT_PAC, AGE_PAC, DEATH_PAC],
  [FATHER_SAP_CODE]: [SKIP_PAC, NO_DEPENDENT_PAC, RETIRED_PAC, DEATH_PAC],
  [MOTHER_SAP_CODE]: [SKIP_PAC, NO_DEPENDENT_PAC, RETIRED_PAC, DEATH_PAC],
};

export const REASON_WITHDRAWAL_PAC_LIST = [
  SKIP_PAC,
  NO_DEPENDENT_PAC,
  RETIRED_PAC,
  END_PAC,
  AGE_PAC,
  DEATH_PAC,
];

export const WORKFLOW_UPDATE_PAC_DOCUMENTS_ID =
  "8eb4b4fe-618e-40e3-9d0b-b13a330cfef1";

export const CAMPAIGN_MASSIVE_AFFILIATION_CODE = 1;
export const CAMPAIGN_INDIVIDUAL_AFFILIATION_CODE = 2;
export const CAMPAIGN_APROVED_RETRAIT_AFFILIATION_CODE = 3;
export const CAMPAIGN_WHITOUT_APROVED_RETRAIT_AFFILIATION_CODE = 4;
export const CAMPAIGN_PAC_AFFILIATION_CODE = 6;
export const CAMPAIGN_PAC_WITHDRAWAL_APROVED_CODE = 7;
export const CAMPAIGN_PAC_WITHDRAWAL_CODE = 8;
export const CAMPAIGN_PAC_UPDATE_DOCUMENTS_CODE = 11;
export const CAMPAIGN_PAC_UPDATE_SCHOOL_CERTIFICATE = 18;

export const EDUCATION_UNLOCK_SAP_CONSTANT = 11;

export const STATE_ACTIVE = "Activo";
export const STATE_SUSPEN = "Suspendido";
export const APORTANT_COMPANY_VIGEN_STATUS = "VIGEN";
export const APORTANT_COMPANY_SUSPE_STATUS = "SUSPE";
export const APORTANT_COMPANY_RETIR_STATUS = "RETIR";
export const ALLOWED_STATUS = [
  APORTANT_COMPANY_VIGEN_STATUS,
  APORTANT_COMPANY_SUSPE_STATUS,
];

export const SAP_RESPONSE_INDIVIDUAL_WITHDRAWAL_SUCCESS_CODE = "001";
export const SAP_RESPONSE_INDIVIDUAL_AFFILIATION_SUCCESS_CODE = "376";
export const SAP_RESPONSE_DISTRIBUTION_DOCUMENT = "000";
export const SAP_RESPONSE_REJECTED = "999";
export const SAP_RESPONSE_GENERAL_REJECTED = "375";

// ========================================= Regular Expresions
export const ALPHABETIC_SPACELESS_REGEXP = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/;
export const ALPHABETIC_SPACE_REGEXP =
  /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(\s[A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;
export const ALPHABETIC_SPACE_MESSAGE =
  "Solo caracteres alfabéticos y espacio intermedio";
export const ALPHABETIC_SPACELESS_MESSAGE =
  "Solo caracteres alfabéticos y sin espacio";
export const ONLY_NUMBERS_REGEXP = /^[0-9]+$/;

export const CAMPAIGN_TYPE_PACS_MANAGMENT_CODE = 3;

export const TITLE_DOCS: { [key: number]: string } = {
  1: "Adjunta el registro civil de nacimiento del hijo del afiliado para acreditar el parentesco.",
  2: "Adjunta el documento de identidad legible. ",
  3: "Adjunta el formato de solicitud de declaración juramentada firmada por el trabajador, expedida por el ministerio de trabajo donde conste la vivencia y dependencia económica del trabajador. ",
  4: "Adjunta el documento de identidad legible.",
  5: "Adjunta el registro civil de matrimonio o formato de declaración juramentada expedido por el Ministerio del Trabajo, para el(a) compañero(a) permanente. ",
  6: "Adjunta el certificado laboral de la empresa indicando el salario y si recibe o no subsidio familiar monetario. ",
  7: "Adjunta el registro civil de nacimiento del hermano para acreditar el parentesco. Debe estar sin enmendaduras y ser legible no te preocupes, no requiere vigencia. ",
  8: "Adjunta el registro civil de nacimiento del afiliado, en el cual esté el nombre de sus padres para acreditar el parentesco. Debe estar sin enmendaduras y ser legible no te preocupes, no requiere vigencia. ",
  9: "Adjunta el registro civil de defunción del padre del afiliado.",
  10: "Adjunta el registro civil de defunción de la madre del afiliado.",
  11: "Adjunta la declaración juramentada donde coste la convivencia y dependencia económica del (los) hermano (s) huérfano (s) de padres con el trabajador. ",
  12: "Adjunta el documento de identidad legible del hermano del afiliado.",
  13: "Adjunta el registro civil de nacimiento del trabajador en el cual se registre el nombre de sus padres para acreditar el parentesco.",
  14: "Adjunta el certificado de EPS donde conste el tipo de afiliación como beneficiario del titular",
  15: "Adjunta la cédula de ciudadanía del padre o la madre",
  16: "Adjunta la declaración de no recibir pensión, salario ni renta. Además, el afiliado y sus padres deben completar y firmar el formato de solicitud de declaración juramentada expedido por el Ministerio de Trabajo. ",
  17: "Adjunta el registro civil de nacimiento del hijastro del afiliado para acreditar el parentesco.",
  18: "Adjunta la tarjeta de identidad legible",
  19: "Adjunta el certificado de custodia de padre/madre biológico (Recuerda que la custodia puede ser compartida, de lo contrario quien no tenga custodia no puede afiliar un beneficiario) o adjunta el certificado de la EPS del titular que acredite el grupo familiar unificado. ",
  20: "Adjunta la declaración juramentada expedida por el ministerio de trabajo donde conste el parentesco de hijastro y/o convivencia y dependencia económica con el trabajador. ",
  21: "Adjunta el certificado del registro de localización y caracterización de personas con discapacidad - RLCPD",
  22: "Adjunta el Documento de Identidad de Extranjero.",
  23: "Adjunta la resolución de la pensión.",
  24: "Adjunta el último recibo de mesada en el cual indique el valor de pensión sin deducciones.",
  25: "Adjunta el documento Paz y salvo de desafiliación (En caso de haber estado afiliado como pensionado a otra caja de Compensación Familiar en el Valle del Cauca)",
  26: "Adjunta el certificado del tiempo de afiliación de las cajas a las cuales perteneció.",
  27: "Adjunta el certificado de autorización de descuento para pensionados aportantes.",
};

export const CHECKBOX_VALIDATION_ERROR =
  "Debes aceptar el tratamiento de datos biométricos para continuar con la activación de tu identidad digital.";

export const USER_AUTHORIZATION = {
  biometricTermsAndConditions: "AuthorizationProcessingBiometricData",
};
export const DOCUMENTS_NOT_ALLOWED = ["CO1N"];
export const DOCUMENTS_NOT_ALLOWED_INDIVIDUAL = ["CO1N", "CO1L"];
export const RL_DOCUMENT_TYPE_CODE = "CO1L";

export const ADDRESS_TYPE_OPTIONS: SelectOption[] = [
  { value: "SECTOR_URBANO", label: "Sector Urbano" },
  { value: "SECTOR_RURAL", label: "Sector Rural" },
];

export const INDEPENDENT_CODE = "ZGRI";

export const PENSIONER_25_CODE = "ZGEN";

export const PENSIONER_CODE = "ZGRE";

export const TYPE_PENSIONER_CODE = "ZAPE";
export const TYPE_PENSIONER_25_CODE = "ZP25";
export const TYPE_INDEPENDENT_CODE = "ZAIN";

export const INDEPENDENTS_AFFILIATE = [
  INDEPENDENT_CODE,
  PENSIONER_25_CODE,
  PENSIONER_CODE,
];

export const URBAN_NOMENCLATURE_OPTIONS: SelectOption[] = [
  {
    label: "AUTOPISTA",
    value: "AUTOP",
  },
  {
    label: "AVENIDA",
    value: "AV",
  },
  {
    label: "CALLE",
    value: "CL",
  },
  {
    label: "CARRERA",
    value: "KR",
  },
  {
    label: "CIRCUNVALAR",
    value: "CCV",
  },
  {
    label: "DIAGONAL",
    value: "DG",
  },
  {
    label: "TRANSVERSAL",
    value: "TV",
  },
  {
    label: "TRONCAL",
    value: "TRL",
  },
];

export const RURAL_NOMENCLATURE_OPTIONS: SelectOption[] = [
  {
    label: "CABECERA MUNICIPAL",
    value: "CM",
  },
  {
    label: "CARRETERA",
    value: "CT",
  },
  {
    label: "CASERIO",
    value: "CAS",
  },
  {
    label: "CORREGIMIENTO",
    value: "CO",
  },
  {
    label: "FINCA",
    value: "FCA",
  },
  {
    label: "KILOMETRO",
    value: "KM",
  },
  {
    label: "PARCELACIÓN",
    value: "PCN",
  },
  {
    label: "VEREDA",
    value: "VDA",
  },
  {
    label: "VIA",
    value: "VIA",
  },
];

export const LETTER_OPTIONS = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
  { value: "H", label: "H" },
  { value: "I", label: "I" },
  { value: "J", label: "J" },
  { value: "K", label: "K" },
  { value: "L", label: "L" },
  { value: "M", label: "M" },
  { value: "N", label: "N" },
  { value: "O", label: "O" },
  { value: "P", label: "P" },
  { value: "Q", label: "Q" },
  { value: "R", label: "R" },
  { value: "S", label: "S" },
  { value: "T", label: "T" },
  { value: "U", label: "U" },
  { value: "V", label: "V" },
  { value: "W", label: "W" },
  { value: "X", label: "X" },
  { value: "Y", label: "Y" },
  { value: "Z", label: "Z" },
  { value: "BIS", label: "BIS" },
  { value: "A_BIS", label: "A BIS" },
  { value: "B_BIS", label: "B BIS" },
  { value: "C_BIS", label: "C BIS" },
  { value: "D_BIS", label: "D BIS" },
];

export const ZONE_OPTIONS = [
  { value: "NORTE", label: "NORTE" },
  { value: "SUR", label: "SUR" },
  { value: "ESTE", label: "ESTE" },
  { value: "OESTE", label: "OESTE" },
];

export const OTHER_CHARACTERISTICS_OPTIONS = [
  {
    label: "ADMINISTRACIÓN",
    value: "AD",
  },
  {
    label: "AGRUPACIÓN",
    value: "AGN",
  },
  {
    label: "ALTILLO",
    value: "AL",
  },
  {
    label: "APARTAMENTO",
    value: "APTO",
  },
  {
    label: "APARTAMENTO SÓTANO",
    value: "AS",
  },
  {
    label: "AUTOPISTA",
    value: "AUTOP",
  },
  {
    label: "AVENIDA",
    value: "AV",
  },
  {
    label: "AVENIDA CALLE",
    value: "AC",
  },
  {
    label: "AVENIDA CARRERA",
    value: "AK",
  },
  {
    label: "BARRIO",
    value: "BR",
  },
  {
    label: "BLOQUE",
    value: "BL",
  },
  {
    label: "BODEGA",
    value: "BG",
  },
  {
    label: "CABECERA MUNICIPAL",
    value: "CM",
  },
  {
    label: "CALLE",
    value: "CL",
  },
  {
    label: "CALLEJÓN",
    value: "CLJ",
  },
  {
    label: "CAMINO",
    value: "CN",
  },
  {
    label: "CARRETERA",
    value: "KR",
  },
  {
    label: "CASA",
    value: "CA",
  },
  {
    label: "CASERÍO",
    value: "CAS",
  },
  {
    label: "CÉLULA",
    value: "CEL",
  },
  {
    label: "CENTRO",
    value: "CE",
  },
  {
    label: "CENTRO COMERCIAL",
    value: "CECO",
  },
  {
    label: "CENTRO URBANO",
    value: "CEUR",
  },
  {
    label: "CIRCULAR",
    value: "CIR",
  },
  {
    label: "CIRCUNVALAR",
    value: "CCV",
  },
  {
    label: "CONDOMINIO",
    value: "CDM",
  },
  {
    label: "CONJUNTO",
    value: "CONJ",
  },
  {
    label: "CONSULTORIO",
    value: "CS",
  },
  {
    label: "CORREGIMIENTO",
    value: "CO",
  },
  {
    label: "DEPÓSITO",
    value: "DP",
  },
  {
    label: "DEPÓSITO SÓTANO",
    value: "DS",
  },
  {
    label: "DIAGONAL",
    value: "DG",
  },
  {
    label: "EDIFICIO",
    value: "ED",
  },
  {
    label: "ENTRADA",
    value: "EN",
  },
  {
    label: "ESQUINA",
    value: "ESQ",
  },
  {
    label: "ESTE",
    value: "ESTE",
  },
  {
    label: "ETAPA",
    value: "ET",
  },
  {
    label: "FINCA",
    value: "FCA",
  },
  {
    label: "GARAJE",
    value: "GJ",
  },
  {
    label: "GARAJE SÓTANO",
    value: "GS",
  },
  {
    label: "GRADA",
    value: "GR",
  },
  {
    label: "INFERIOR",
    value: "INF",
  },
  {
    label: "INSPECCIÓN DE POLICÍA",
    value: "IP",
  },
  {
    label: "INTERIOR",
    value: "IN",
  },
  {
    label: "KILOMETRO",
    value: "KM",
  },
  {
    label: "LOCAL",
    value: "LC",
  },
  {
    label: "LOCAL MEZZANINE",
    value: "LM",
  },
  {
    label: "LOCAL SÓTANO",
    value: "LS",
  },
  {
    label: "LOTE",
    value: "LT",
  },
  {
    label: "MANZANA",
    value: "MZ",
  },
  {
    label: "MANZANITA",
    value: "MZTA",
  },
  {
    label: "MEJORA",
    value: "MJ",
  },
  {
    label: "MEZZANINE",
    value: "MN",
  },
  {
    label: "MODULO",
    value: "MD",
  },
  {
    label: "MUNICIPIO",
    value: "MUN",
  },
  {
    label: "NORTE",
    value: "NORTE",
  },
  {
    label: "NÚCLEO",
    value: "NCO",
  },
  {
    label: "OCCIDENTE",
    value: "OCC",
  },
  {
    label: "OESTE",
    value: "OESTE",
  },
  {
    label: "OFICINA",
    value: "OF",
  },
  {
    label: "OFICINA SÓTANO",
    value: "OS",
  },
  {
    label: "PARCELA",
    value: "PA",
  },
  {
    label: "PARCELACIÓN",
    value: "PCN",
  },
  {
    label: "PASAJE",
    value: "PSJ",
  },
  {
    label: "PENTHOUSE",
    value: "PH",
  },
  {
    label: "PISO",
    value: "PI",
  },
  {
    label: "PORTERÍA",
    value: "PT",
  },
  {
    label: "PREDIO",
    value: "PD",
  },
  {
    label: "PRINCIPAL",
    value: "PPL",
  },
  {
    label: "PUENTE",
    value: "PN",
  },
  {
    label: "QUEBRADA",
    value: "QDA",
  },
  {
    label: "SALÓN",
    value: "SA",
  },
  {
    label: "SECTOR",
    value: "SEC",
  },
  {
    label: "SEMISÓTANO",
    value: "SS",
  },
  {
    label: "SUITE",
    value: "SU",
  },
  {
    label: "SUPERMANZANA",
    value: "SMZ",
  },
  {
    label: "SUR",
    value: "SUR",
  },
  {
    label: "TERRAZA",
    value: "TZ",
  },
  {
    label: "TORRE",
    value: "TO",
  },
  {
    label: "TRANSVERSAL",
    value: "TV",
  },
  {
    label: "TRONCAL",
    value: "TRL",
  },
  {
    label: "UNIDAD",
    value: "UN",
  },
  {
    label: "URBANIZACIÓN",
    value: "URB",
  },
  {
    label: "VEREDA",
    value: "VDA",
  },
  {
    label: "VÍA",
    value: "VIA",
  },
  {
    label: "ZONA",
    value: "ZN",
  },
];

export const INDEPENDENT_DOCS_TITLE = [
  "Adjunta documento de identidad legible",
  "Adjunta certificado de EPS, no puede ser mayor de 30 días de expedición",
  "Adjunta paz y salvo de desafiliación",
  "Adjunta documento de identidad del colombiano residente en el exterior en PDF",
  "Adjunta la certificación de ingresos en PDF expedida por un contador público, no inferior a dos SMLV",
  "Adjunta el certificado de supervivencia del afiliado apórtante por el consulado en PDF (es gratuito y se debe presentar cada seis meses) en la caja de compensación familiar.",
  "Adjunta paz y salvo de desafiliación",
  "Contrato de prestación de servicios (Aplica para contratistas del Estado o empresa privada)"
];
export const MESSAGE_ERROR_VALIDATE_TOTP = {
  alreadyUsed: "TOTP already used",
};

export const DOCTYPE_KINSHIP: { [key: string]: string[] } = {
  [KINDSHIP_SON_VALUE]: [
    "CO1C",
    "CO1D",
    "CO1E",
    "CO1P",
    "CO1T",
    "CO1V",
    "CO1Y",
    "CO1L",
  ],
  [KINDSHIP_STEPSON_VALUE]: [
    "CO1C",
    "CO1D",
    "CO1E",
    "CO1P",
    "CO1T",
    "CO1V",
    "CO1Y",
    "CO1L",
  ],
  [PARENTS_MOTHER_KINDSHIP_CODE]: [
    "CO1C",
    "CO1D",
    "CO1E",
    "CO1P",
    "CO1T",
    "CO1V",
    "CO1Y",
  ],
  [PARENTS_FATHER_KINDSHIP_CODE]: [
    "CO1C",
    "CO1D",
    "CO1E",
    "CO1P",
    "CO1T",
    "CO1V",
    "CO1Y",
  ],
  [KINDSHIP_BROTHER_VALUE]: [
    "CO1C",
    "CO1D",
    "CO1E",
    "CO1P",
    "CO1T",
    "CO1V",
    "CO1Y",
    "CO1L",
  ],
  [KINDSHIP_SPOUCE_VALUE]: [
    "CO1C",
    "CO1D",
    "CO1E",
    "CO1P",
    "CO1T",
    "CO1V",
    "CO1Y",
  ],
};
export const EPS_LIST = [
  {
    value: "60000441",
    label: "COOMEVA ENTIDAD PROMOTORA DE SALUD S A",
  },
  {
    value: "60000915",
    label: "ENTIDAD PROMOTORA DE SALUD SERVICIO OCCIDENTAL DE SALUD S A SOS",
  },
  {
    value: "60001206",
    label: "EPS Y MEDICINA PREPAGADA SURAMERICANA S. A",
  },
  {
    value: "60001485",
    label: "COOPERATIVA MULTIACTIVA DE DESARROLLO INTEGRAL COOSALUD",
  },
  {
    value: "60002304",
    label:
      "COSMITET LTDA CORPORACION DE SERVICIOS MEDICOS INTERNANCIONALES THEM Y CIA",
  },
  {
    value: "60003391",
    label: "SALUD TOTAL EPS S.A",
  },
  {
    value: "60003776",
    label: "ASOCIACION INDIGENA DEL CAUCA AIC EPS-INDIGENA",
  },
  {
    value: "60003971",
    label: "ASOCIACION MUTUAL EMPRESA SOLIDARIA DE SALUD EMSSANAR ESS",
  },
  {
    value: "60007382",
    label: "ASOCIACION MUTUAL LA ESPERANZA ASMET SALUD ESS",
  },
  {
    value: "60014849",
    label: "COMFENALCO VALLE",
  },
  { value: "60014853", label: "CAPRECOM" },
  {
    value: "60014854",
    label: "CRUZ BLANCA",
  },
  {
    value: "60014857",
    label: "CAFESALUD",
  },
  {
    value: "60014858",
    label: "ALIANSALUD",
  },
  {
    value: "60014859",
    label: "COLPATRIA",
  },
  {
    value: "60014860",
    label: "NUEVA EPS S.A.",
  },
  {
    value: "60014861",
    label: "FAMISANAR LTDA",
  },
  {
    value: "60014865",
    label: "CAJA DE COMPENSACION FAMILIAR COMPENSAR COMPENSAR",
  },
  {
    value: "60017964",
    label: "ENTIDAD PROMOTORA DE SALUD MALLAMAS E P S INDIGENA",
  },
  {
    value: "60020513",
    label: "ENTIDAD PROMOTORA DE SALUD ORGANISMO COOPERATIVO SALUDCOOP",
  },
  {
    value: "60020754",
    label: "ENTIDAD PROMOTORA DE SALUD SANITAS S A",
  },
  {
    value: "60020869",
    label: "ASOCIACION BARRIOS UNIDOS DE QUIBDO E.S.S",
  },
  {
    value: "70006836",
    label: "AMBUQ EPS-S-ESS ASOCIACION QUIBDO",
  },
  {
    value: "70011291",
    label: "MEDIMAS EPS S.A.S.",
  },
  {
    value: "70011571",
    label: "CAPITAL SALUD EPS-S S.A.S.",
  },
  {
    value: "70014204",
    label: "ASMET SALUD EPS SAS",
  },
  {
    value: "70015878",
    label: "ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS-S",
  },
  {
    value: "70021563",
    label:
      "ADMINISTRADORA DE LOS RECURSOS DEL SIST GENERAL DE SEGURIDAD SOCIAL EN SALUD",
  },
  {
    value: "70023769",
    label: "COOPERATIVA DE SALUD COMUNITARIA COMPARTA",
  },
  {
    value: "70032938",
    label: "CAPRESOCA EPS",
  },
  {
    value: "70049553",
    label: "CAJACOPI EPS SAS",
  },
];

export const ENTITIES_CONST = "ZEAS";

export const ENTITIES_AFFILIATIONS_APORTANT = "ZEPA";

export const APORTANT_TYPE = "4";

export const CONFIG_SMM = "SMM";

// USER RESUME

export const RESUME_FORM_PAGE = {
  GENERAL_INFO: 1,
  EDUCATION: 2,
  LANGUAGES: 3,
  KNOWLEDGE_AND_SKILL: 4,
  PROFILE_AND_EXPERIENCE: 5,
  RESUME_RESULT: 6,
};

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

// Job Postulation Module
export const POSTULATION_JOB_OFFERS_PER_PAGE = 10;

export enum FORM_DB_SELECT_OPTIONS {
  //GENERAL
  CITY_LIST = "CITY_LIST",
  GENDER_LIST = "GENDER_LIST",

  //EDUCATION
  EDUCATION_TITLE_OPTIONS = "EDUCATION_TITLE_OPTIONS",

  //LANGUAGES
  LANGUAGE_LIST_OPTIONS = "LANGUAGE_LIST_OPTIONS",
  LANGUAGE_LEVEL_OPTIONS = "LANGUAGE_LEVEL_OPTIONS",
  AFFIRMATIVE_LIST_OPTIONS = "AFFIRMATIVE_LIST_OPTIONS",

  //KNOWLEDGE AND SKILLS
  KNOWLEDGE_AND_SKILLS = "KNOWLEDGE_AND_SKILLS",
  KNOWLEDGE_LIST = "KNOWLEDGE_LIST",
  SKILLS_LIST = "SKILLS_LIST",

  //WORK EXPERIENCE
  WORK_ROLE = "WORK_ROLE",
}

// Flow Affiliations Aportant
export const WORKFLOW_ID_AFFILIATIONS_PENSIONER =
  "9e4a3f8c-7b21-4a3e-9d43-6c5f72de49b6";

export const CAMPAIGN_ID_AFFILIATIONS_APORTANT = "15";

export const CAMPAIGN_ID_AFFILIATIONS_25_ANIOS = "16";

export const CAMPAIGN_ID_AFFILIATIONS_1643 = "17";

export const CAMPAIGN_ID_INDEPENDENT = "9";

export const ACRONYM_AFFILIATIONS_PENSIONER = "AFI";

export const CAMPAING_AFFILIATIONS_PENSIONER_IDS = [
  CAMPAIGN_ID_AFFILIATIONS_APORTANT,
  CAMPAIGN_ID_AFFILIATIONS_25_ANIOS,
  CAMPAIGN_ID_AFFILIATIONS_1643,
];

export const REJECTION_REQUEST_UPDATE_TYPE = "rejection-approval-workflow";

export const TEMPLATE_ID_AFFILIATIONS_PENSIONER = "afiliacion_pensionado";

export const AFFILIATIONS_PENSIONER_MESSAGE_TYPE = {
  ZGRI: "Ya se encuentra afiliado como independiente, debe realizar el retiro como independiente para afiliarse como pensionado",
  ZGRP: "Ya se encuentra afiliado como trabajador, se debe comunicar con la empresa para realizar el retiro",
  ZGRE: "Ya se encuentra afiliado a Comfandi como pensionado",
  ZGEN: "Ya se encuentra afiliado a Comfandi como pensionado",
  ZAPE: "Ya se encuentra afiliado a Comfandi como pensionado",
};

export const AFFILIATIONS_INDEPENDENT_MESSAGE_TYPE = {
  ZGRI: "Ya se encuentra afiliado como independiente",
  ZGRP: "Ya se encuentra afiliado como trabajador, se debe comunicar con la empresa para realizar el retiro",
  ZGRE: "Ya se encuentra afiliado a Comfandi como pensionado, debe realizar el retiro como pensionado para afiliarse como independiente",
  ZGEN: "Ya se encuentra afiliado a Comfandi como pensionado, debe realizar el retiro como pensionado para afiliarse como independiente",
  ZAPE: "Ya se encuentra afiliado a Comfandi como pensionado, debe realizar el retiro como pensionado para afiliarse como independiente",
};

export const REASON = [
  { value: "01", label: "Terminación de contrato " },
  { value: "20", label: "Sustitución patronal" },
  { value: "04", label: "Fallecimiento" },
];

export const AFFILIATIONS_PENSIONER_FLOW_URL = (condition: string) => {
  switch (condition) {
    case "aportant":
      return "/menu-affiliations/pensioner/pensioner-aportant/load-complement-files";
    case "pensioner-25":
      return "/menu-affiliations/pensioner/pensioner-25/load-complement-files";
    case "pensioner-1643":
      return "/menu-affiliations/pensioner/pensioner-1643/load-complement-files";
    default:
      return "";
  }
};
export const EMAIL_REGEX =
  /^[a-zA-Z0-9](?!.*[.]{2})[a-zA-Z0-9._&+-]*[a-zA-Z0-9]@(?:(?!.*\.\.)[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export const PsyTestCompetencyList: Record<
  string,
  { Text: string; Color: string }
> = {
  VISION_OF_THE_FUTURE: { Text: "Visión de futuro", Color: "#3B82F6" },
  SOCIAL_SENSITIVITY: { Text: "Sensibilidad social", Color: "#F59E0B" },
  LEADERSHIP: { Text: "Liderazgo", Color: "#10B981" },
  DECISION_MAKING: { Text: "Toma de decisiones", Color: "#EF4444" },
  ACHIEVEMENT_ORIENTATION: { Text: "Orientación al logro", Color: "#8B5CF6" },
  ACTION_INITIATIVE: { Text: "Iniciativa de acción", Color: "#EC4899" },
  NETWORK_BUILDING: { Text: "Construcción de redes", Color: "#14B8A6" },
  CREATIVITY: { Text: "Creatividad", Color: "#F97316" },
  ADAPTATION_TO_CHANGE: { Text: "Adaptación al cambio", Color: "#6366F1" },
};

export const PsyTestDimensionList: Record<
  string,
  { Text: string; Color: string }
> = {
  ATTITUDE: { Text: "Actitud", Color: "#3B82F6" },
  DO: { Text: "Hacer", Color: "#10B981" },
  KNOW: { Text: "Saber", Color: "#8B5CF6" },
};

export type PsyTestCompetencyKey = keyof typeof PsyTestCompetencyList;
export type PsyTestDimensionKey = keyof typeof PsyTestDimensionList;

export const COLOMBIAN_DOCUMENT_TYPES = new Set(["CO1C", "CO1T", "CO1L"]);
export const INDEPENDET_0_6_PERCENT = "I1";
export const INDEPENDET_2_PERCENT = "I2";

export const APORTANT_CATEGORY_SAP: Record<string, string> = {
  [INDEPENDET_0_6_PERCENT]: "Afiliados independientes 0.6%",
  [INDEPENDET_2_PERCENT]: "Afiliados independientes 2%",
};
