import { Injectable, Logger } from '@nestjs/common';
import { BulkUserDto, ValidationProgressDto, BulkUserResponseDto } from './dto/bulk-user.dto';

@Injectable()
export class BulkUsersService {
  private readonly logger = new Logger(BulkUsersService.name);
  private readonly BATCH_SIZE = 50;

  async processBulkUsers(users: BulkUserDto[]): Promise<BulkUserResponseDto> {
    const results: BulkUserResponseDto = {
      totalProcessed: users.length,
      successful: 0,
      failed: 0,
      results: []
    };

    // Procesar por lotes
    for (let i = 0; i < users.length; i += this.BATCH_SIZE) {
      const batch = users.slice(i, i + this.BATCH_SIZE);
      const batchResults = await this.processBatch(batch);
      
      results.successful += batchResults.filter(r => r.success).length;
      results.failed += batchResults.filter(r => !r.success).length;
      results.results.push(...batchResults);

      this.logger.log(`Procesado lote ${Math.floor(i / this.BATCH_SIZE) + 1} de ${Math.ceil(users.length / this.BATCH_SIZE)}`);
    }

    return results;
  }

  private async processBatch(batch: BulkUserDto[]): Promise<{ user: BulkUserDto; success: boolean; error?: string }[]> {
    const results = [];

    for (const user of batch) {
      try {
        // Aquí irá la lógica real de procesamiento cuando tengamos el endpoint
        // Por ahora es un dummy que simula éxito o fallo aleatoriamente
        const shouldFail = Math.random() < 0.2;
        
        if (shouldFail) {
          throw new Error('Error simulado en el procesamiento del usuario');
        }

        // Simulamos un delay para simular procesamiento
        await new Promise(resolve => setTimeout(resolve, 100));

        results.push({
          user,
          success: true
        });
      } catch (error) {
        results.push({
          user,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  validateUsers(users: BulkUserDto[]): ValidationProgressDto {
    const errors: { row: number; errors: string[] }[] = [];
    const validData: BulkUserDto[] = [];

    users.forEach((user, index) => {
      const rowErrors: string[] = [];

      // Validaciones básicas
      if (!user.documentType || !['CC', 'CE', 'NIT'].includes(user.documentType)) {
        rowErrors.push('Tipo de documento inválido');
      }

      if (!user.documentNumber) {
        rowErrors.push('Número de documento requerido');
      }

      if (!user.email || !this.isValidEmail(user.email)) {
        rowErrors.push('Email inválido');
      }

      if (!user.name) {
        rowErrors.push('Nombre requerido');
      }

      if (!user.companyDocumentType || !['CC', 'CE', 'NIT'].includes(user.companyDocumentType)) {
        rowErrors.push('Tipo de documento de empresa inválido');
      }

      if (!user.companyDocumentNumber) {
        rowErrors.push('Número de documento de empresa requerido');
      }

      if (rowErrors.length > 0) {
        errors.push({ row: index + 1, errors: rowErrors });
      } else {
        validData.push(user);
      }
    });

    return {
      processedRows: users.length,
      totalRows: users.length,
      errors,
      validData
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
} 