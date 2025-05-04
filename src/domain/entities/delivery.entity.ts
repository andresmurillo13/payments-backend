export class DeliveryEntity {
    id: string;
    paymentId: string;
    customerId: string;
    deliveryAddress: string;
    deliveryDate: Date;

    constructor(
        id: string,
        paymentId: string,
        customerId: string,
        deliveryAddress: string,
        deliveryDate: Date,
    ) {
        this.id = id;
        this.paymentId = paymentId;
        this.customerId = customerId;
        this.deliveryAddress = deliveryAddress;
        this.deliveryDate = deliveryDate;
    }
}