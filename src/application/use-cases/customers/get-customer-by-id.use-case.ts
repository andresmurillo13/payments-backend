import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/application/services/customer.service';


@Injectable()
export class GetCustomerByIdUseCase {
    constructor(private readonly customerService: CustomerService) { }

    async execute(id: string): Promise<any> {
        const customer = await this.customerService.getCustomer(id);
        return customer;
    }
}
