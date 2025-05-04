import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductOrmEntity } from '../entities/product.orm-entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {

    constructor(
        @InjectRepository(ProductOrmEntity)
        private readonly repository: Repository<ProductOrmEntity>,
    ) { }

    async findAll(): Promise<ProductOrmEntity[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<ProductOrmEntity | null> {
        return this.repository.findOne({ where: { id } });
    }

    async updateStock(id: string, quantityChange: number): Promise<void> {
        const product = await this.repository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        console.log('Producto encontrado:', product);

        product.stock = (product.stock || 0) + quantityChange;

        if (product.stock < 0) {
            throw new Error('Stock insuficiente');
        }

        await this.repository.save(product);
    }
}