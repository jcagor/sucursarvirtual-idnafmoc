import { Test, TestingModule } from '@nestjs/testing';
import { BulkUsersService } from '../bulk-users.service';
import { BulkUserDto } from '../dto/bulk-user.dto';

describe('BulkUsersService', () => {
  let service: BulkUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkUsersService],
    }).compile();

    service = module.get<BulkUsersService>(BulkUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUsers', () => {
    it('should validate users correctly', () => {
      const users: BulkUserDto[] = [
        {
          documentType: 'CC',
          documentNumber: '123456789',
          email: 'test@example.com',
          name: 'Test User',
          companyDocumentType: 'NIT',
          companyDocumentNumber: '900123456'
        }
      ];

      const result = service.validateUsers(users);

      expect(result.processedRows).toBe(1);
      expect(result.totalRows).toBe(1);
      expect(result.errors).toHaveLength(0);
      expect(result.validData).toHaveLength(1);
    });

    it('should detect invalid users', () => {
      const users: BulkUserDto[] = [
        {
          documentType: 'INVALID',
          documentNumber: '',
          email: 'invalid-email',
          name: '',
          companyDocumentType: 'INVALID',
          companyDocumentNumber: ''
        }
      ];

      const result = service.validateUsers(users);

      expect(result.processedRows).toBe(1);
      expect(result.totalRows).toBe(1);
      expect(result.errors).toHaveLength(1);
      expect(result.validData).toHaveLength(0);
      expect(result.errors[0].errors).toContain('Tipo de documento inválido');
      expect(result.errors[0].errors).toContain('Email inválido');
    });
  });

  describe('processBulkUsers', () => {
    it('should process users in batches', async () => {
      const users: BulkUserDto[] = Array(60).fill({
        documentType: 'CC',
        documentNumber: '123456789',
        email: 'test@example.com',
        name: 'Test User',
        companyDocumentType: 'NIT',
        companyDocumentNumber: '900123456'
      });

      const result = await service.processBulkUsers(users);

      expect(result.totalProcessed).toBe(60);
      expect(result.successful + result.failed).toBe(60);
      expect(result.results).toHaveLength(60);
    });

    it('should handle empty user array', async () => {
      const users: BulkUserDto[] = [];

      const result = await service.processBulkUsers(users);

      expect(result.totalProcessed).toBe(0);
      expect(result.successful).toBe(0);
      expect(result.failed).toBe(0);
      expect(result.results).toHaveLength(0);
    });
  });
}); 