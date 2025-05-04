import { Injectable, Inject } from '@nestjs/common';
import { DeliveryRepository } from 'src/domain/repositories/delivery.repository';


@Injectable()
export class DeliveryService {
    constructor(
        @Inject('DeliveryRepository')
        private readonly deliveryRepository: DeliveryRepository,
    ) { }

    async createDelivery(deliveryData: any): Promise<any> {

        return this.deliveryRepository.save(deliveryData);
    }


}