import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column({  nullable: false })
  payment_method: string

  @Column({ type: 'decimal'})
  amount: number;

  @ManyToOne(()=> User, (user) => user.payments)
  user: User;

  
  @ManyToOne(()=> Order, (order) => order.payments)
  order: Order;

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
     @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      })
      updated_at: Date;
}
