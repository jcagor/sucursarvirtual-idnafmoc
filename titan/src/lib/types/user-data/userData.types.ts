export interface UserDataInterface {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  "allowed-origins": string[];
  scope: string;
  sid: string;
  email_verified: boolean;
  identification_number: string;
  name: string;
  identification_type: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  edcmfndi: string;
}

export interface SiseUnregisteredUser {
  created_at: string | undefined;
  updated_at: string | undefined;
  identification_number: string;
  name: string;
  identification_type: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean | undefined;
  edcmfndi: string | undefined;
}

export interface AvailableTrainingCourse {
  created_at: string;
  updated_at: string;
  name: string;
  duration_hours: number;
  maximum_inscribed: number;
  minimum_inscribed: number;
  target_population: string;
  observation: string;
  course_schedule: string;
  offer_frequency: string;
  certification_entity: string;
  formation_line: string;
  region: string;
  start_date: string;
  id: string;
}

export interface UserDataRetrieved {
  document_type?: string;
  document_number?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  firstLastName?: string;
  middleName?: string;
  middleLastName?: string;
}
