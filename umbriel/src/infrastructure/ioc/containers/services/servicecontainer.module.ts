import { ContainerModule, interfaces } from 'inversify';
import { SERVICE_TYPES } from './service.types';
import { BulkUsersService } from '@/domain/services/bulkUsersService';

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<BulkUsersService>(SERVICE_TYPES._BulkUsersService).to(BulkUsersService);
}); 