import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('deliveries')
export class DeliveryOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    paymentId: string;

    @Column()
    customerId: string;

    @Column()
    deliveryAddress: string;

    @Column()
    deliveryDate: Date;
}
