import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeliveryOrmEntity } from "../entities/delivery.orm-entity";
import { DeliveryRepository } from "src/domain/repositories/delivery.repository";



@Injectable()
export class DeliveryRepositoryImpl implements DeliveryRepository {
    constructor(
        @InjectRepository(DeliveryOrmEntity)
        private readonly repository: Repository<DeliveryOrmEntity>,
    ) { }

    async save(delivery: DeliveryOrmEntity): Promise<DeliveryOrmEntity> {
        return this.repository.save(delivery);
    }

}