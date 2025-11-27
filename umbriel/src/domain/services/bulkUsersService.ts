import { injectable, inject } from 'inversify';
import type { AxiosInstance } from 'axios';
import { NETWORK_TYPES } from '@/infrastructure/ioc/containers/network/network.types';
import { UserExcelData } from '@/domain/usecases/excel/userExcelService';

export interface ValidationProgress {
  processedRows: number;
  totalRows: number;
  errors: { row: number; errors: string[] }[];
  validData: UserExcelData[];
}

export interface BulkUserResponse {
  totalProcessed: number;
  successful: number;
  failed: number;
  results: {
    user: UserExcelData;
    success: boolean;
    error?: string;
  }[];
}

@injectable()
export class BulkUsersService {
  private readonly axiosInstance: AxiosInstance;

  constructor(@inject(NETWORK_TYPES._AxiosBusinessInstance) axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async validateUsers(users: UserExcelData[]): Promise<ValidationProgress> {
    try {
      const response = await this.axiosInstance.post<ValidationProgress>('/bulk-users/validate', {
        users
      });
      return response.data;
    } catch (error) {
      console.error('Error al validar usuarios:', error);
      throw error;
    }
  }

  async processUsers(users: UserExcelData[]): Promise<BulkUserResponse> {
    try {
      const response = await this.axiosInstance.post<BulkUserResponse>('/bulk-users/process', {
        users
      });
      return response.data;
    } catch (error) {
      console.error('Error al procesar usuarios:', error);
      throw error;
    }
  }
} 