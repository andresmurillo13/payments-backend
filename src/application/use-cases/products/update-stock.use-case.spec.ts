import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStockUseCase } from './update-stock.use-case';
import { ProductService } from '../../services/product.service';

describe('UpdateStockUseCase', () => {
    let updateStockUseCase: UpdateStockUseCase;
    let productService: jest.Mocked<ProductService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateStockUseCase,
                {
                    provide: ProductService,
                    useValue: {
                        updateStock: jest.fn(),
                    },
                },
            ],
        }).compile();

        updateStockUseCase = module.get<UpdateStockUseCase>(UpdateStockUseCase);
        productService = module.get(ProductService);
    });

    it('should update the stock of a product', async () => {
   
        const productId = 'product-123';
        const quantity = 5;

     
        await updateStockUseCase.execute(productId, quantity);

        expect(productService.updateStock).toHaveBeenCalledWith(productId, -Math.abs(quantity));
        expect(productService.updateStock).toHaveBeenCalledTimes(1);
    });
});