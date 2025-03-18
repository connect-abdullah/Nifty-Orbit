import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
   imports: [ProductsModule,
        UsersModule,
        TypeOrmModule.forFeature([CartItem, Product, User, Cart])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
