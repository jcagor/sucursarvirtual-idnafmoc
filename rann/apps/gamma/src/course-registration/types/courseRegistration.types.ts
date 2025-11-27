export interface Intersection {
  sessionId: string;
  newSessionId: string;
}

export interface IntersectionList extends Array<Intersection> {}

export enum CONFLICT_TYPE{
    ALREADY_ENROLLED= "INSCRITO_ACTUALMENTE",
    TIME_OVERLAP = "CRUCE_HORARIOS",
    MAXIMUM_REACHED = "MAX_NUMERO_CURSOS",
    NO_CONFLICT = "SIN_CONFLICTO",
}

export interface ConflictInformation{
    conflict:boolean,
    conflictMessage?:string,
    conflictType?: CONFLICT_TYPE,

    conflictList?:IntersectionList, // only for CONFLICT_TYPE.TIME_OVERLAP
    maximumCoursesAllowed?:number, // only for CONFLICT_TYPE.MAXIMUM_REACHED
}
