import { Injectable, HttpException } from '@nestjs/common';
import { PaymentService } from '../../services/payment.service';

import { ProductService } from '../../services/product.service';
import { WompiProvider } from 'src/infrastructure/providers/wompi.provider';
import { CustomerService } from 'src/application/services/customer.service';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly wompiProvider: WompiProvider,
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
  ) { }

  async execute(paymentData: {
    amount: number;
    paymentMethod: string; 
    productId: string;
    customerEmail: string;
    customerName: string;
    address: string;
    token: string;
  }): Promise<any> {
    const {
      amount,
      paymentMethod,
      productId,
      customerEmail,
      customerName,
      address,
      token,
    } = paymentData;

    const customer = await this.customerService.createCustomer(
      customerName,
      customerEmail,
    )

   

    const payment = await this.paymentService.createPayment(
      amount,
      paymentMethod,
      productId,
      customerEmail,
      customerName,
      address,
    );


    const { acceptanceToken } = await this.wompiProvider.getAcceptanceToken();

   

    const wompiResponse = await this.wompiProvider.createCardTransaction({
      amountInCents: amount * 100,
      customerEmail,
      paymentMethodToken: token,
      reference: payment.id,
      acceptanceToken,
      redirectUrl: 'https://tuapp.com/payment-result',

    });
   

    const transactionStatus = wompiResponse.data.status;


    payment.status = transactionStatus;
    await this.paymentService.save(payment);



    return {
      id: payment.id,
      status: transactionStatus,
      amount,
      reference: wompiResponse.data.reference,
      paymentUrl: wompiResponse.data.payment_link,
    };
  }
}
