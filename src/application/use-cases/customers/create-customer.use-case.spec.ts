import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { CustomerService } from 'src/application/services/customer.service';

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCase;
  let customerService: jest.Mocked<CustomerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerUseCase,
        {
          provide: CustomerService,
          useValue: {
            createCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    createCustomerUseCase = module.get<CreateCustomerUseCase>(CreateCustomerUseCase);
    customerService = module.get(CustomerService);
  });

  it('should create a customer successfully', async () => {

    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const mockCustomer = { 
        id: 'customer-123', 
        name, 
        email, 
        fullName: name, 
        phone: '1234567890', 
        address: '123 Main St' 
    };
    customerService.createCustomer.mockResolvedValue(mockCustomer);

 
    const result = await createCustomerUseCase.execute(name, email);

   
    expect(result).toEqual(mockCustomer);
    expect(customerService.createCustomer).toHaveBeenCalledWith(name, email);
    expect(customerService.createCustomer).toHaveBeenCalledTimes(1);
  });
});