import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentUseCase } from './get-payment.use-case';
import { PaymentService } from '../../services/payment.service';

describe('GetPaymentUseCase', () => {
  let getPaymentUseCase: GetPaymentUseCase;
  let paymentService: jest.Mocked<PaymentService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPaymentUseCase,
        {
          provide: PaymentService,
          useValue: {
            getPayment: jest.fn(),
          },
        },
      ],
    }).compile();

    getPaymentUseCase = module.get<GetPaymentUseCase>(GetPaymentUseCase);
    paymentService = module.get(PaymentService);
  });

  it('should return a payment by ID', async () => {
  
    const paymentId = 'payment-123';
    const mockPayment = { 
      id: paymentId, 
      amount: 100, 
      status: 'APPROVED', 
      paymentMethod: 'CREDIT_CARD', 
      productId: 'product-456', 
      customerEmail: 'customer@example.com', 
      customerName: 'John Doe', 
      address: '123 Main St' 
    };
    paymentService.getPayment.mockResolvedValue(mockPayment);

 
    const result = await getPaymentUseCase.execute(paymentId);

   
    expect(result).toEqual(mockPayment);
    expect(paymentService.getPayment).toHaveBeenCalledWith(paymentId);
    expect(paymentService.getPayment).toHaveBeenCalledTimes(1);
  });
});