import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { Shipment } from 'src/shipment/entities/shipment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;
  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "user_id" })  // Ensures correct foreign key
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })  
  cartItems: CartItem[];

  @Column()
  quantity: number;


   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
     @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      })
      updated_at: Date;
}
