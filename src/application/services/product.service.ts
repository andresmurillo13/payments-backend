import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class ProductService {

    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) { }

    async findAll(): Promise<any[]> {
        return this.productRepository.findAll();
    }

    async findById(id: string): Promise<any | null> {
        return this.productRepository.findById(id);
    }
    async updateStock(id: string, quantityChange: number): Promise<void> {
        await this.productRepository.updateStock(id, quantityChange);
    }

}