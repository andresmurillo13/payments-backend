import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/application/services/customer.service';

@Injectable()
export class CreateCustomerUseCase {
    constructor(private readonly customerService: CustomerService) { }

    async execute(name: string, email: string): Promise<any> {
        const customer = await this.customerService.createCustomer(name, email);
        return customer;
    }

}