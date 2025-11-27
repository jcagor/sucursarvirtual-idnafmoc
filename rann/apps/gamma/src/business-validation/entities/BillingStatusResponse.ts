export interface BillingStatusResponse {
  nit: string;
  businessName: string;
  representativeDocument: string;
  representativeName: string;
  address: string;
  telephone: string;
  city: string;
  email: string;
  regionHome: string;
  program: string; // <- Read
  priceValue: string; // <- Read
  regionBilling: string; // "CALI"
  initialValidationDate: string; // <- get from Validation table
  deliveryDateBilling: string; // <- Current time?
  advancePercent: string; // <- Read consultant hours
  programStartDate: string; // <- Read program schedule
  programEndDate: string; // <- Read program schedule
  provider: string; // <- "Desarrollo empresarial"
  remissionDate: string; // <- Read initialValidationDate
  templateType: string; // <- "Cobro"
}

export interface BillingStatusResponseList extends Array<BillingStatusResponse>{};
