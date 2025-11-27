import { UserTrainingEntityInterface } from "lib";
import { UserDataInterface } from "lib/types/user-data/userData.types";

export interface CourseRegistrationData {
  datos: {
    id_regional: number;
    id_programa: string;
    codigo_matricula: string;
    capacidad: number;
    costo: number;
    fecha_desde: string;
    fecha_hasta: string;
    Usuarios: Array<{
      tipo_identificacion: string;
      identificacion: string;
      nombre1: string;
      nombre2: string;
      apellido1: string;
      apellido2: string;
      genero: string;
      email: string;
      celular: number;
    }>;
  };
}

export interface TrainingCourseData {
  id: string;
  name: string;
  duration_hours: number;
  maximum_inscribed: number;
  minimum_inscribed: number;
  target_population: string;
  observation: string;
  course_schedule: string;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingUserData {
  tipo_identificacion: string;
  identificacion: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  genero: string;
  email: string;
  celular: number;
}

export const createTrainingUserData = (
  sessionData: UserDataInterface
): TrainingUserData => {
  return {
    tipo_identificacion: sessionData.identification_type || "cedula",
    identificacion: sessionData.identification_number || "",
    nombre1: sessionData.given_name?.split(" ")[0] || "",
    nombre2: sessionData.given_name?.split(" ")[1] || "",
    apellido1: sessionData.family_name?.split(" ")[0] || "",
    apellido2: sessionData.family_name?.split(" ")[1] || "",
    genero: "No especificado",
    email: sessionData.email || "",
    celular: 3251428565, // Valor por defecto
  };
};

export const createCourseRegistrationData = (
  course: TrainingCourseData,
  userData: TrainingUserData
): CourseRegistrationData => {
  const startDate = new Date(course.start_date);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 3);

  return {
    datos: {
      id_regional: 33, // Valor por defecto
      id_programa: course.id,
      codigo_matricula: `MAT${new Date().getFullYear()}${course.name
        .substring(0, 5)
        .toUpperCase()}`,
      capacidad: course.maximum_inscribed || 32,
      costo: 1540320, // Valor por defecto
      fecha_desde: startDate.toISOString().split("T")[0],
      fecha_hasta: endDate.toISOString().split("T")[0],
      Usuarios: [userData],
    },
  };
};

export interface CourseScheduleQuery {
  courseName: string;
  unemployed: boolean;
  courseCode?: string;
}

// From lalande, course schedule creation form.

export interface CourseType {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

export enum CourseAccessType {
  cerrado = "CLOSED",
  abierto = "OPEN"
}

export enum CONFLICT_TYPE{
    ALREADY_ENROLLED = "INSCRITO_ACTUALMENTE",
    TIME_OVERLAP = "CRUCE_HORARIOS",
    MAXIMUM_REACHED = "MAX_NUMERO_CURSOS",
    NO_CONFLICT = "SIN_CONFLICTO",
}

export interface CourseScheduleType {
  id?: string;
  course_id: string;
  name: string;
  modality: string;
  startDate: string;
  endDate: string;
  typeUser: string;
  supplier: string;
  sessions?: number;
  state?: string;
  description?: string;

  id_regional: string;
  cost: string;
  accessType: CourseAccessType;

  createdAt: string;
  updatedAt: string;

  course?: CourseType;

  conflict?:boolean;
  conflict_type?: CONFLICT_TYPE;
}

export interface CourseScheduleTypeList extends Array<CourseScheduleType> {}

// from utopia create employee register

export interface RegistrantPersonType {
  document_type: string;
  document_number: string;
  firstName: string;
  middleName: string;
  firstLastName: string;
  middleLastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  status: string;
  observations: string;
}

export interface QueryRegisterUnemployedInCourse {
  course_schedule_id: string;
  unemployed: RegistrantPersonType;
}

export interface QueryRegisterEmployeeInCourse {
  course_schedule_id: string;
  employee: RegistrantPersonType;
}

export interface ResponseCreateCourseRegistration {
  error?: boolean;
  message?: string;
  numberEmployeesRegisteredNow: number;
  totalNumberRegisteredEmployees: number;
  numberEmployeesToStartCourse: number;
}

// UI TYPES
export interface UnemployedCourseInfo {
  course: UserTrainingEntityInterface;
  schedule?: CourseScheduleTypeList;
}

export interface UnemployedCourseInfoList extends Array<UnemployedCourseInfo> {}
