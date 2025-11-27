import { City } from "./city";
import { Community } from "./community";
import { Department } from "./department";
import { DocumentType } from "./documentType";
import { Nationality } from "./nationality";
import { Occupation } from "./occupation";
import { Reserve } from "./reserve";

export interface Options {
  occupation: Occupation[];
  reserve: Reserve[];
  community: Community[];
  city: City[];
  department: Department[];
  nationality: Nationality[];
  documentTypes: DocumentType[];
}
