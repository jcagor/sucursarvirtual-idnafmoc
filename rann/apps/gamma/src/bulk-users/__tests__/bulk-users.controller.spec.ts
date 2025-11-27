import { Test, TestingModule } from '@nestjs/testing';
import { BulkUsersController } from '../bulk-users.controller';
import { BulkUsersService } from '../bulk-users.service';
import { BulkUserDto } from '../dto/bulk-user.dto';

describe('BulkUsersController', () => {
  let controller: BulkUsersController;
  let service: BulkUsersService;

  const mockBulkUsersService = {
    validateUsers: jest.fn(),
    processBulkUsers: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulkUsersController],
      providers: [
        {
          provide: BulkUsersService,
          useValue: mockBulkUsersService
        }
      ],
    }).compile();

    controller = module.get<BulkUsersController>(BulkUsersController);
    service = module.get<BulkUsersService>(BulkUsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validateUsers', () => {
    it('should validate users', async () => {
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

      const expectedResult = {
        processedRows: 1,
        totalRows: 1,
        errors: [],
        validData: users
      };

      mockBulkUsersService.validateUsers.mockResolvedValue(expectedResult);

      const result = await controller.validateUsers({ users });

      expect(service.validateUsers).toHaveBeenCalledWith(users);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('processUsers', () => {
    it('should process users', async () => {
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

      const expectedResult = {
        totalProcessed: 1,
        successful: 1,
        failed: 0,
        results: [{
          user: users[0],
          success: true
        }]
      };

      mockBulkUsersService.processBulkUsers.mockResolvedValue(expectedResult);

      const result = await controller.processUsers({ users });

      expect(service.processBulkUsers).toHaveBeenCalledWith(users);
      expect(result).toEqual(expectedResult);
    });
  });
}); 