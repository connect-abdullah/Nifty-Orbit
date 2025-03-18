import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal' ,nullable: false })
  price: number;    
  
  @ManyToOne(()=> Order, (order)=>order.orderItems)
  @JoinColumn({name: 'order_id'})
  order: Order;


  @ManyToOne(()=> Product, (product)=>product.order_item)
  @JoinColumn({name: 'product_id'})
  product: Product;

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

     @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      })
      updated_at: Date;
}
