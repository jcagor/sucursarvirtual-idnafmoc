import * as XLSX from 'xlsx';
import { UserFormValidations } from '@/domain/validations/users/formValidations';

export interface UserExcelData {
  documentType: string;
  documentNumber: string;
  email: string;
  name: string;
  companyDocumentType: string;
  companyDocumentNumber: string;
}

export interface ValidationProgress {
  processedRows: number;
  totalRows: number;
  errors: { row: number; errors: string[] }[];
  validData: UserExcelData[];
}

export class UserExcelService {
  private static readonly VALID_DOCUMENT_TYPES = ['CC', 'CE', 'NIT'];
  private static readonly VALID_HEADERS = [
    'documentType',
    'documentNumber',
    'email',
    'name',
    'companyDocumentType',
    'companyDocumentNumber'
  ];
  private static readonly BATCH_SIZE = 100; 

  public static generateTemplate(): void {
    
    const headers = this.VALID_HEADERS;

    const exampleData = [
      {
        documentType: 'CC',
        documentNumber: '123456789',
        email: 'ejemplo@correo.com',
        name: 'Juan Pérez',
        companyDocumentType: 'NIT',
        companyDocumentNumber: '900123456'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(exampleData, { header: headers });
    
    
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    const descriptions = [
      'Tipo de documento (CC, CE, NIT)',
      'Número de documento',
      'Correo electrónico',
      'Nombre completo',
      'Tipo de documento de la empresa (CC, CE, NIT)',
      'Número de documento de la empresa'
    ];

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      if (!worksheet[cell]) continue;
      
      
      if (!worksheet[cell].c) worksheet[cell].c = [];
      worksheet[cell].c.push({
        t: 's',
        v: descriptions[C]
      });
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'modelo_registro_usuarios.xlsx');
  }

  public static validateExcelData(
    file: File,
    onProgress?: (progress: ValidationProgress) => void
  ): Promise<{ 
    errors: { row: number; errors: string[] }[],
    validData: UserExcelData[]
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          
          const headers = this.getHeaders(worksheet);
          const headerErrors = this.validateHeaders(headers);
          if (headerErrors.length > 0) {
            reject(new Error(`Errores en los encabezados: ${headerErrors.join(', ')}`));
            return;
          }

          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          const totalRows = jsonData.length;
          const errors: { row: number; errors: string[] }[] = [];
          const validData: UserExcelData[] = [];

          
          for (let i = 0; i < totalRows; i += this.BATCH_SIZE) {
            const batch = jsonData.slice(i, i + this.BATCH_SIZE);
            
            
            batch.forEach((row: any, batchIndex: number) => {
              const rowIndex = i + batchIndex;
              const normalizedRow = this.normalizeRowData(row);
              const rowErrors = this.validateRow(normalizedRow);
              
              if (rowErrors.length > 0) {
                errors.push({ row: rowIndex + 2, errors: rowErrors });
              } else {
                validData.push(normalizedRow);
              }
            });

            
            if (onProgress) {
              onProgress({
                processedRows: Math.min(i + this.BATCH_SIZE, totalRows),
                totalRows,
                errors,
                validData
              });
            }

            
            await new Promise(resolve => setTimeout(resolve, 0));
          }

          resolve({ errors, validData });
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsBinaryString(file);
    });
  }

  private static getHeaders(worksheet: XLSX.WorkSheet): string[] {
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    const headers: string[] = [];
    
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
      headers.push(cell ? cell.v.toString().trim() : '');
    }
    
    return headers;
  }

  private static validateHeaders(headers: string[]): string[] {
    const errors: string[] = [];
    const normalizedHeaders = headers.map(h => h.replace(/\([^)]*\)/g, '').trim());

    
    this.VALID_HEADERS.forEach(requiredHeader => {
      if (!normalizedHeaders.includes(requiredHeader)) {
        errors.push(`Falta el encabezado: ${requiredHeader}`);
      }
    });

    
    normalizedHeaders.forEach(header => {
      if (!this.VALID_HEADERS.includes(header)) {
        errors.push(`Encabezado no permitido: ${header}`);
      }
    });

    return errors;
  }

  private static validateRow(row: UserExcelData): string[] {
    const errors: string[] = [];
    const validationSchema = UserFormValidations.getUserFormValidation();

    
    if (!this.VALID_DOCUMENT_TYPES.includes(row.documentType)) {
      errors.push(`documentType: Debe ser uno de los siguientes valores: ${this.VALID_DOCUMENT_TYPES.join(', ')}`);
    }

    
    if (!this.VALID_DOCUMENT_TYPES.includes(row.companyDocumentType)) {
      errors.push(`companyDocumentType: Debe ser uno de los siguientes valores: ${this.VALID_DOCUMENT_TYPES.join(', ')}`);
    }

    
    try {
      validationSchema.validateSync(row, { abortEarly: false });
    } catch (err: any) {
      if (err.inner) {
        err.inner.forEach((error: any) => {
          errors.push(`${error.path}: ${error.message}`);
        });
      }
    }

    return errors;
  }

  private static normalizeRowData(row: any): UserExcelData {
    
    const normalizedRow: any = {};
    Object.keys(row).forEach(key => {
      const normalizedKey = key.replace(/\([^)]*\)/g, '').trim();
      normalizedRow[normalizedKey] = row[key];
    });

    return {
      documentType: normalizedRow.documentType?.toString().trim() || '',
      documentNumber: normalizedRow.documentNumber?.toString().trim() || '',
      email: normalizedRow.email?.toString().trim() || '',
      name: normalizedRow.name?.toString().trim() || '',
      companyDocumentType: normalizedRow.companyDocumentType?.toString().trim() || '',
      companyDocumentNumber: normalizedRow.companyDocumentNumber?.toString().trim() || ''
    };
  }
} 