import { PaymentEntity } from '../entities/payment.entity';

export interface PaymentRepository {
  findById(id: string): Promise<PaymentEntity | null>;
  save(payment: PaymentEntity): Promise<PaymentEntity>;
}