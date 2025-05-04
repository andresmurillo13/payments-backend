import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('customers')
export class CustomerOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'fullName' })
    fullName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;
}