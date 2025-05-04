import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from '../../../domain/repositories/payment.repository';
import { PaymentOrmEntity } from '../entities/payment.orm-entity';

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    @InjectRepository(PaymentOrmEntity)
    private readonly repository: Repository<PaymentOrmEntity>,
  ) { }



  async save(payment: PaymentOrmEntity): Promise<PaymentOrmEntity> {
    return this.repository.save(payment);
  }

  async findById(id: string): Promise<PaymentOrmEntity | null> {
    return this.repository.findOne({ where: { id } });
  }
}