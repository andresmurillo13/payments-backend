import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { PaymentService } from '../../application/services/payment.service';
import { ProcessPaymentUseCase } from '../../application/use-cases/payments/process-payment.use-case';
import { GetPaymentUseCase } from '../../application/use-cases/payments/get-payment.use-case';
import { WompiProvider } from '../providers/wompi.provider';
import { UpdateStockUseCase } from 'src/application/use-cases/products/update-stock.use-case';
import { CreateDeliveryUseCase } from 'src/application/use-cases/deliveries/create-delivery.use-case';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly processPaymentUseCase: ProcessPaymentUseCase,
    private readonly getPaymentByIdUseCase: GetPaymentUseCase,
    private readonly wompiProvider: WompiProvider,
    private readonly updateStockUseCase: UpdateStockUseCase,
    private readonly createDeliveryUseCase: CreateDeliveryUseCase,
  ) { }



  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() event: any,
    @Headers('X-Webhook-Signature') signature: string,
  ): Promise<string> {
    const isValid = this.wompiProvider.verifyWebhookSignature(event, signature);
    if (!isValid) return 'Invalid signature';

    const transaction = event?.data?.transaction;
    const reference = transaction?.reference;
    const status = transaction?.status;

    if (!reference || !status) return 'Missing transaction data';


    await this.paymentService.updateStatus(reference, status);

    const payment = await this.paymentService.getPayment(reference);

    if (!payment) {
      console.warn(`No se encontró pago con referencia ${reference}`);
      return 'Payment not found';
    }


    if (status === 'APPROVED') {
      const payment = await this.paymentService.getPayment(reference);
      await this.updateStockUseCase.execute(
        payment.productId,
        1
      );

      const delivery = await this.createDeliveryUseCase.execute({
        paymentId: reference,
        customerId: payment.customerName,
        deliveryAddress: payment.address,
        deliveryDate: new Date(),
      });
      console.log('Delivery created:', delivery);
    }

    return 'Webhook processed';
  }

  @Post()
  async createPayment(@Body() paymentData: {
    amount: number;
    paymentMethod: string;
    customerEmail: string;
    token: string;
    productId: string;
    customerName: string;
    address: string;
  }): Promise<any> {
    return this.processPaymentUseCase.execute(paymentData);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    return this.getPaymentByIdUseCase.execute(id);
  }
}