import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CustomerService } from 'src/application/services/customer.service';
import { CreateCustomerUseCase } from 'src/application/use-cases/customers/create-customer.use-case';
import { GetCustomerByIdUseCase } from 'src/application/use-cases/customers/get-customer-by-id.use-case';



@Controller('customers')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    ) { }
    @Post()
    async createCustomer(@Body() customerData: { name: string; email: string }): Promise<any> {
        const { name, email } = customerData;
        return this.createCustomerUseCase.execute(name, email);
    }
    @Get(':id')
    async getCustomer(@Param('id') id: string) {
        return this.getCustomerByIdUseCase.execute(id);
    }
}
