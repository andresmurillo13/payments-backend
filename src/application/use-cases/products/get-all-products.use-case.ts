import { Injectable } from '@nestjs/common';
import { ProductService } from '../../services/product.service';


@Injectable()
export class GetAllProductsUseCase {
    constructor(private readonly productService: ProductService) { }

    async execute(): Promise<any[]> {
        const products = await this.productService.findAll();
        return products;
    }
}