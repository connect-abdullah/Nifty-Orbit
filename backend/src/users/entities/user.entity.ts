import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Shipment } from 'src/shipment/entities/shipment.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(()=> Order, (order) => order.user)
  orders: Order[];

  @OneToMany(()=> Shipment, (shipment) => shipment.user)
  shipment: Shipment[];

  @OneToMany(()=> Payment, (payment) => payment.user)
  payments: Payment[];
  
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
  
   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

     @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      })
      updated_at: Date;
}
