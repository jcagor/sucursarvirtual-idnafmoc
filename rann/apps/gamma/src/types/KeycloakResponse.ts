export interface KeycloakResponse {
  email_verified: boolean;
  name: string;
  identification_number: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  identification_type: string;
  sub: string;
  sid?: string;
  edcmfndi?: string;
  gender?: string;
  born_date?: string;
  expedition_date?: string;
  realm_access?: {
    roles: string[];
  };
}
