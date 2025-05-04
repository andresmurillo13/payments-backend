import { Injectable, Inject } from '@nestjs/common';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
  ) { }

  async createPayment(
    amount: number,
    paymentMethod: string,
    productId: string,
    customerEmail: string,
    customerName: string,
    address: string,
  ): Promise<PaymentEntity> {
    const payment = new PaymentEntity(
      undefined,
      amount,
      'PENDING',
      paymentMethod,
      productId,
      customerEmail,
      customerName,
      address,
    );

    return this.paymentRepository.save(payment);
  }

  async getPayment(id: string): Promise<PaymentEntity | null> {
    return this.paymentRepository.findById(id);
  }

  async save(payment: PaymentEntity): Promise<PaymentEntity> {
    return this.paymentRepository.save(payment);
  }
  async updateStatus(id: string, status: string): Promise<void> {
    const payment = await this.getPayment(id);
    if (payment) {
      payment.status = status;
      await this.save(payment);
    }
  }
}