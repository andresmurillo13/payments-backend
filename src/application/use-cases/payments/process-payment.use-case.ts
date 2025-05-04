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
    paymentMethod: string; // 'CARD'
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

    console.log('Customer created:', customer);



    const payment = await this.paymentService.createPayment(
      amount,
      paymentMethod,
      productId,
      customerEmail,
      customerName,
      address,
    );

    console.log('Payment created:', payment);


    const { acceptanceToken } = await this.wompiProvider.getAcceptanceToken();

    console.log('Acceptance Token:', acceptanceToken);

    const wompiResponse = await this.wompiProvider.createCardTransaction({
      amountInCents: amount * 100,
      customerEmail,
      paymentMethodToken: token,
      reference: payment.id,
      acceptanceToken,
      redirectUrl: 'https://tuapp.com/payment-result',

    });
    console.log('Wompi Response:', wompiResponse);

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
