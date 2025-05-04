import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { GetAllProductsUseCase } from '../../application/use-cases/products/get-all-products.use-case';
import { GetProductByIdUseCase} from '../../application/use-cases/products/get-product-by-id.use-case';





@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly getAllProductsUseCase: GetAllProductsUseCase,
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
    ) { }

    @Get('/all')
    async getAllProducts() {
        return this.getAllProductsUseCase.execute();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return this.getProductByIdUseCase.execute(id);
    }
}