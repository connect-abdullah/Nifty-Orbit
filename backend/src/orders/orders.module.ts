import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { ShipmentModule } from 'src/shipment/shipment.module';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderItemService } from 'src/order_item/order_item.service';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/users/entities/user.entity';
import { Shipment } from 'src/shipment/entities/shipment.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { CartModule } from 'src/cart/cart.module';
import { OrderItemModule } from 'src/order_item/order_item.module';
import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItemsModule } from 'src/cart-items/cart-items.module';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Module({
    imports: [UsersModule,
      ProductsModule,
      ShipmentModule,
      PaymentModule,
      OrderItemModule,
      CartModule,
      CartItemsModule,
       TypeOrmModule.forFeature([Order, Product, User, CartItem, OrderItem, Shipment, Cart, Payment]),],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
