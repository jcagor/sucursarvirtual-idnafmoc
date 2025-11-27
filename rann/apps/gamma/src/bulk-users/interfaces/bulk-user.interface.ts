export interface BulkUser {
  documentType: string;
  documentNumber: string;
  email: string;
  name: string;
  companyDocumentType: string;
  companyDocumentNumber: string;
}

export interface BulkUserResult {
  user: BulkUser;
  success: boolean;
  error?: string;
}

export interface BulkUserResponse {
  totalProcessed: number;
  successful: number;
  failed: number;
  results: BulkUserResult[];
}

export interface ValidationProgress {
  processedRows: number;
  totalRows: number;
  errors: { row: number; errors: string[] }[];
  validData: BulkUser[];
} 