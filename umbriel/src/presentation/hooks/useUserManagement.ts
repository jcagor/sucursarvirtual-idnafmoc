import { useState } from 'react';
import { UserExcelService, UserExcelData, ValidationProgress } from '@/domain/usecases/excel/userExcelService';
import { BulkUsersService } from '@/domain/services/bulkUsersService';
import { useToast } from './useToast';
import { appContainer } from '@/infrastructure/ioc';
import { SERVICE_TYPES } from '@/infrastructure/ioc/containers/services/service.types';

interface UseUserManagementReturn {
  hasFileUploaded: boolean;
  validationErrors: { row: number; errors: string[] }[];
  isLoading: boolean;
  progress: {
    processedRows: number;
    totalRows: number;
    percentage: number;
  } | null;
  handleFileUpload: (file: File) => Promise<void>;
  handleSubmit: (values: UserExcelData) => Promise<void>;
  generateTemplate: () => void;
  resetValidation: () => void;
}

export const useUserManagement = (): UseUserManagementReturn => {
  const [hasFileUploaded, setHasFileUploaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ row: number; errors: string[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<{ processedRows: number; totalRows: number; percentage: number } | null>(null);
  const { showToast } = useToast();

  const bulkUsersService = appContainer.get<BulkUsersService>(SERVICE_TYPES._BulkUsersService);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const { errors, validData } = await UserExcelService.validateExcelData(file, (progress: ValidationProgress) => {
        setProgress({
          processedRows: progress.processedRows,
          totalRows: progress.totalRows,
          percentage: (progress.processedRows / progress.totalRows) * 100
        });
        setValidationErrors(progress.errors);
      });
      
      if (errors.length > 0) {
        setValidationErrors(errors);
        setHasFileUploaded(false);
        showToast({ type: 'error', message: `Se encontraron ${errors.length} errores en el archivo` });
        return;
      }

      const validationResult = await bulkUsersService.validateUsers(validData);
      
      if (validationResult.errors.length > 0) {
        setValidationErrors(validationResult.errors);
        setHasFileUploaded(false);
        showToast({ type: 'error', message: `Se encontraron ${validationResult.errors.length} errores en el archivo` });
        return;
      }

      setHasFileUploaded(true);
      showToast({ type: 'success', message: 'Archivo validado correctamente' });
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      showToast({ type: 'error', message: 'Error al procesar el archivo' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: UserExcelData) => {
    try {
      setIsLoading(true);
      const result = await bulkUsersService.processUsers([values]);
      
      if (result.failed > 0) {
        showToast({ type: 'error', message: 'Error al procesar los usuarios' });
      } else {
        showToast({ type: 'success', message: 'Usuarios procesados correctamente' });
      }
    } catch (error) {
      console.error('Error al procesar usuarios:', error);
      showToast({ type: 'error', message: 'Error al procesar usuarios' });
    } finally {
      setIsLoading(false);
    }
  };

  const generateTemplate = () => {
    UserExcelService.generateTemplate();
    showToast({ type: 'success', message: 'Plantilla descargada correctamente' });
  };

  const resetValidation = () => {
    setHasFileUploaded(false);
    setValidationErrors([]);
    setProgress(null);
  };

  return {
    hasFileUploaded,
    validationErrors,
    isLoading,
    progress,
    handleFileUpload,
    handleSubmit,
    generateTemplate,
    resetValidation
  };
}; 