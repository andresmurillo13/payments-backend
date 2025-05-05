import { Test, TestingModule } from '@nestjs/testing';
import { ProcessPaymentUseCase } from './process-payment.use-case';
import { PaymentService } from '../../services/payment.service';
import { WompiProvider } from '../../../infrastructure/providers/wompi.provider';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customer.service';


describe('ProcessPaymentUseCase', () => {
    let processPaymentUseCase: ProcessPaymentUseCase;
    let paymentService: jest.Mocked<PaymentService>;
    let wompiProvider: jest.Mocked<WompiProvider>;
    let productService: jest.Mocked<ProductService>;
    let customerService: jest.Mocked<CustomerService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProcessPaymentUseCase,
                {
                    provide: PaymentService,
                    useValue: {
                        createPayment: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: WompiProvider,
                    useValue: {
                        getAcceptanceToken: jest.fn(),
                        createCardTransaction: jest.fn(),
                    },
                },
                {
                    provide: ProductService,
                    useValue: {},
                },
                {
                    provide: CustomerService,
                    useValue: {
                        createCustomer: jest.fn(),
                    },
                },
            ],
        }).compile();

        processPaymentUseCase = module.get<ProcessPaymentUseCase>(ProcessPaymentUseCase);
        paymentService = module.get(PaymentService);
        wompiProvider = module.get(WompiProvider);
        productService = module.get(ProductService);
        customerService = module.get(CustomerService);
    });

    it('should process a payment successfully', async () => {
      
        const paymentData = {
            amount: 100,
            paymentMethod: 'CARD',
            productId: 'product-123',
            customerEmail: 'test@example.com',
            customerName: 'John Doe',
            address: '123 Main St',
            token: 'token-123',
        };

        const mockCustomer = {
            id: 'customer-123',
            fullName: paymentData.customerName,
            email: paymentData.customerEmail,
            phone: '1234567890', 
            ...paymentData,
        };
        const mockPayment = { id: 'payment-123', ...paymentData, status: 'PENDING' };
        const mockAcceptanceToken = { acceptanceToken: 'acceptance-token-123' };
        const mockWompiResponse = {
            data: {
                status: 'APPROVED',
                reference: 'payment-123',
                payment_link: 'https://payment-link.com',
            },
        };

        customerService.createCustomer.mockResolvedValue(mockCustomer);
        paymentService.createPayment.mockResolvedValue(mockPayment);
        wompiProvider.getAcceptanceToken.mockResolvedValue(mockAcceptanceToken);
        wompiProvider.createCardTransaction.mockResolvedValue(mockWompiResponse);

      
        const result = await processPaymentUseCase.execute(paymentData);

     
        expect(customerService.createCustomer).toHaveBeenCalledWith(
            paymentData.customerName,
            paymentData.customerEmail,
        );
        expect(paymentService.createPayment).toHaveBeenCalledWith(
            paymentData.amount,
            paymentData.paymentMethod,
            paymentData.productId,
            paymentData.customerEmail,
            paymentData.customerName,
            paymentData.address,
        );
        expect(wompiProvider.getAcceptanceToken).toHaveBeenCalled();
        expect(wompiProvider.createCardTransaction).toHaveBeenCalledWith({
            amountInCents: paymentData.amount * 100,
            customerEmail: paymentData.customerEmail,
            paymentMethodToken: paymentData.token,
            reference: mockPayment.id,
            acceptanceToken: mockAcceptanceToken.acceptanceToken,
            redirectUrl: 'https://tuapp.com/payment-result',
        });
        expect(paymentService.save).toHaveBeenCalledWith({
            ...mockPayment,
            status: 'APPROVED',
        });
        expect(result).toEqual({
            id: mockPayment.id,
            status: 'APPROVED',
            amount: paymentData.amount,
            reference: mockWompiResponse.data.reference,
            paymentUrl: mockWompiResponse.data.payment_link,
        });
    });

    it('should throw an error if acceptance token retrieval fails', async () => {
      
        const paymentData = {
            amount: 100,
            paymentMethod: 'CARD',
            productId: 'product-123',
            customerEmail: 'test@example.com',
            customerName: 'John Doe',
            address: '123 Main St',
            token: 'token-123',
        };

        customerService.createCustomer.mockResolvedValue({
            id: 'customer-123',
            fullName: paymentData.customerName,
            email: paymentData.customerEmail,
            phone: '1234567890',
            ...paymentData,
        });
        paymentService.createPayment.mockResolvedValue({ id: 'payment-123', ...paymentData, status: 'PENDING' });
        wompiProvider.getAcceptanceToken.mockRejectedValue(new Error('Failed to get acceptance token'));

      
        await expect(processPaymentUseCase.execute(paymentData)).rejects.toThrow(
            'Failed to get acceptance token',
        );
    });
});