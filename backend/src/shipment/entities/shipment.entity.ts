import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  shipment_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  shipment_date: Date;

  @Column({ nullable: false })
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;
  
  @Column()
  company: string;

  @Column()
  tracking_number: string;

  @ManyToOne(()=> User, (user) => user.shipment)
  user: User;

   @OneToMany(() => Order, (order) => order.shipment)
   orders: Order[];

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
     @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      })
      updated_at: Date;
}
