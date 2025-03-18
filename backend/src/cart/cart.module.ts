import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Module({
    imports: [ProductsModule,
      CartItem,
      UsersModule,
      TypeOrmModule.forFeature([Cart, Product, User,CartItem])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
