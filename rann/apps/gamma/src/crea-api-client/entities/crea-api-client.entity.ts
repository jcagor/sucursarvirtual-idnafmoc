export class CreaApiClient {}

export interface UserCourse{
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

export interface InfoRegistration{    
        codigo_matricula: string;
        id_matricula: number;
}

export interface RegistrationInformation {
    id_regional: number;
    id_programa: number;
    codigo_matricula: string;
    capacidad: number;
    costo: number;
    fecha_desde: string; // format 2025-03-25
    fecha_hasta: string; // format 2025-04-25
    Usuarios: Array<UserCourse>;

    mensaje?: string;
    status?: string;//"success";
    matricula?: InfoRegistration;
    error?:string;
}

export interface QueryCourseRegistration{
    datos: RegistrationInformation;
}
