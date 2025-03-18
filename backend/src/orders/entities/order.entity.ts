import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Shipment } from 'src/shipment/entities/shipment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export enum OrderStatus {
  PROCESSING = 'processing',
  CANCELLED = 'cancelled',
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ nullable: false })
  order_date: Date;

  @Column({  type: 'decimal', nullable: false })
  total_price: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  order_status: OrderStatus;

  @ManyToOne(()=> User, (user) => user.orders)
  user: User;

 @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

    @ManyToOne(() => Shipment, (shipment) => shipment.orders)
   shipment: Shipment;

   @ManyToOne(() => Payment, (payment) => payment.order)
   payments: Payment;

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
     @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      })
      updated_at: Date;
}
