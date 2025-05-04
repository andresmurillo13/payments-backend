import { Body, Controller, Post } from "@nestjs/common";
import { CreateDeliveryUseCase } from "src/application/use-cases/deliveries/create-delivery.use-case";



@Controller('deliveries')
export class DeliveryController {
    constructor(
        private readonly createDeliveryUseCase: CreateDeliveryUseCase,

    ) { }

    @Post()
    async createDelivery(@Body() deliveryData: { paymentId: string; customerId: string; deliveryAddress: string; deliveryDate: Date }): Promise<any> {
        const { paymentId, customerId, deliveryAddress, deliveryDate } = deliveryData;
        return this.createDeliveryUseCase.execute({ paymentId, customerId, deliveryAddress, deliveryDate });
    }
}