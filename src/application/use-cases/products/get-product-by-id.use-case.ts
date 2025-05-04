import { Injectable } from '@nestjs/common';
import { ProductService } from '../../services/product.service';

@Injectable()
export class GetProductByIdUseCase {
    constructor(private readonly productService: ProductService) { }

    async execute(id: string): Promise<any | null> {
        const product = await this.productService.findById(id);
        return product;
    }
}