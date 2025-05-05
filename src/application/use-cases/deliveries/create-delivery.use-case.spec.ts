import { Test, TestingModule } from '@nestjs/testing';
import { CreateDeliveryUseCase } from './create-delivery.use-case';
import { DeliveryService } from 'src/application/services/delivery.service';

describe('CreateDeliveryUseCase', () => {
    let createDeliveryUseCase: CreateDeliveryUseCase;
    let deliveryService: jest.Mocked<DeliveryService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDeliveryUseCase,
                {
                    provide: DeliveryService,
                    useValue: {
                        createDelivery: jest.fn(),
                    },
                },
            ],
        }).compile();

        createDeliveryUseCase = module.get<CreateDeliveryUseCase>(CreateDeliveryUseCase);
        deliveryService = module.get(DeliveryService);
    });

    it('should create a delivery successfully', async () => {
       
        const deliveryData = { id: 'delivery-123', address: '123 Main St', status: 'PENDING' };
        deliveryService.createDelivery.mockResolvedValue(deliveryData);

    
        const result = await createDeliveryUseCase.execute(deliveryData);

       
        expect(result).toEqual(deliveryData);
        expect(deliveryService.createDelivery).toHaveBeenCalledWith(deliveryData);
        expect(deliveryService.createDelivery).toHaveBeenCalledTimes(1);
    });
});