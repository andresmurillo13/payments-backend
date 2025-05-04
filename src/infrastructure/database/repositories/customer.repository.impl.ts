import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';
import { CustomerRepository } from 'src/domain/repositories/customer.repository';



@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
    constructor(
        @InjectRepository(CustomerOrmEntity)
        private readonly repository: Repository<CustomerOrmEntity>,
    ) { }

    async save(customer: CustomerOrmEntity): Promise<CustomerOrmEntity> {
        return this.repository.save(customer);
    }

    async findById(id: string): Promise<CustomerOrmEntity | null> {
        return this.repository.findOne({ where: { id } });
    }
}