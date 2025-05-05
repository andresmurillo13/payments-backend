import { Test, TestingModule } from '@nestjs/testing';
import { GetAllProductsUseCase } from './get-all-products.use-case';
import { ProductService } from '../../services/product.service';

describe('GetAllProductsUseCase', () => {
  let getAllProductsUseCase: GetAllProductsUseCase;
  let productService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllProductsUseCase,
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllProductsUseCase = module.get<GetAllProductsUseCase>(GetAllProductsUseCase);
    productService = module.get(ProductService);
  });

  it('should return all products', async () => {
    // Arrange
    const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
    productService.findAll.mockResolvedValue(mockProducts);

    // Act
    const result = await getAllProductsUseCase.execute();

    // Assert
    expect(result).toEqual(mockProducts);
    expect(productService.findAll).toHaveBeenCalledTimes(1);
  });
});