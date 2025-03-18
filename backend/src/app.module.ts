import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { BrandModule } from './brand/brand.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemModule } from './order_item/order_item.module';
import { ShipmentModule } from './shipment/shipment.module';
import { DataSource } from 'typeorm';
import { PaymentModule } from './payment/payment.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port : 5432,
      username : 'postgres',
      password : process.env.password,
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    ProductCategoryModule,
    BrandModule,
    AuthModule,
    OrdersModule,
    OrderItemModule,
    ShipmentModule,
    PaymentModule,
    CartModule,
    CartItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

