import { Injectable } from '@nestjs/common';
import { ProductService } from '../../services/product.service';

@Injectable()
export class UpdateStockUseCase {
    constructor(private readonly productService: ProductService) { }

    async execute(productId: string, quantity: number): Promise<void> {

        await this.productService.updateStock(productId, -Math.abs(quantity));
    }
}
