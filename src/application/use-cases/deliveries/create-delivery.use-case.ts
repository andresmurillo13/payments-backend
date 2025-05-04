import { Injectable } from '@nestjs/common';
import { DeliveryService } from 'src/application/services/delivery.service';

@Injectable()
export class CreateDeliveryUseCase {
    constructor(
        private readonly deliveryService: DeliveryService
    ) { }

    async execute(deliveryData: any): Promise<any> {
        const delivery = await this.deliveryService.createDelivery(deliveryData);
        return delivery;

    }

}