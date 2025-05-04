import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../services/payment.service';

@Injectable()
export class GetPaymentUseCase {
    constructor(private readonly paymentService: PaymentService) { }

    async execute(id: string): Promise<any> {
        const payment = await this.paymentService.getPayment(id);
        return payment;
    }
}