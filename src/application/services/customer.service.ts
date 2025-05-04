import { Injectable, Inject } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerEntity } from '../../domain/entities/customer.entity';


@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository) { }

  async createCustomer(name: string, email: string): Promise<CustomerEntity> {
    const customer = new CustomerEntity(undefined, name, email, 'default-phone', 'default-address');

    await this.customerRepository.save(customer);

    return customer;
  }

  async getCustomer(id: string): Promise<CustomerEntity | null> {
    return this.customerRepository.findById(id);
  }
}