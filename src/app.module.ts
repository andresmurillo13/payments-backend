import {  Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './infrastructure/controllers/payment.controller';
import { PaymentService } from './application/services/payment.service';
import { ProcessPaymentUseCase } from './application/use-cases/payments/process-payment.use-case';
import { PaymentRepositoryImpl } from './infrastructure/database/repositories/payment.repository.impl';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOrmEntity } from './infrastructure/database/entities/payment.orm-entity';
import { WompiProvider } from './infrastructure/providers/wompi.provider';
import { GetPaymentUseCase } from './application/use-cases/payments/get-payment.use-case';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductRepositoryImpl } from './infrastructure/database/repositories/product.repository.impl';
import { ProductOrmEntity } from './infrastructure/database/entities/product.orm-entity';
import { GetProductByIdUseCase } from './application/use-cases/products/get-product-by-id.use-case';
import { GetAllProductsUseCase } from './application/use-cases/products/get-all-products.use-case';
import { CustomerOrmEntity } from './infrastructure/database/entities/customer.orm-entity';
import { CustomerController } from './infrastructure/controllers/customer.controller';
import { GetCustomerByIdUseCase } from './application/use-cases/customers/get-customer-by-id.use-case';
import { CreateCustomerUseCase } from './application/use-cases/customers/create-customer.use-case';
import { CustomerRepositoryImpl } from './infrastructure/database/repositories/customer.repository.impl';
import { CustomerService } from './application/services/customer.service';
import { DeliveryOrmEntity } from './infrastructure/database/entities/delivery.orm-entity';
import { DeliveryController } from './infrastructure/controllers/delivery.controller';
import { CreateDeliveryUseCase } from './application/use-cases/deliveries/create-delivery.use-case';
import { DeliveryRepositoryImpl } from './infrastructure/database/repositories/delivery.repository.impl';
import { DeliveryService } from './application/services/delivery.service';
import { UpdateStockUseCase } from './application/use-cases/products/update-stock.use-case';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [PaymentOrmEntity, ProductOrmEntity, CustomerOrmEntity, DeliveryOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PaymentOrmEntity, ProductOrmEntity, CustomerOrmEntity, DeliveryOrmEntity]),

    HttpModule,
  ],
  controllers: [PaymentController, ProductController, CustomerController, DeliveryController],
  providers: [
    //providers
    WompiProvider,

    //services
    PaymentService,
    CustomerService,
    ProductService,
    DeliveryService,
    // Use Cases
    CreateCustomerUseCase,
    CreateDeliveryUseCase,
    ProcessPaymentUseCase,
    GetPaymentUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    GetCustomerByIdUseCase,
    UpdateStockUseCase,


    {
      provide: 'PaymentRepository',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    {
      provide: 'CustomerRepository',
      useClass: CustomerRepositoryImpl,
    },
    {
      provide: 'DeliveryRepository',
      useClass: DeliveryRepositoryImpl,
    },

  ],
})
export class AppModule { }