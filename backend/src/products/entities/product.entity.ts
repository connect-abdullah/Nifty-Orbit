import { Brand } from 'src/brand/entities/brand.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { ProductCategory } from 'src/product_category/entities/product_category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Or,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(
    () => ProductCategory,
    (product_category) => product_category.products,
    { eager: true }
  )
  @JoinColumn({ name: 'product_category_id' })
  category: ProductCategory;

  @ManyToOne(
    () => OrderItem,
    (order_item) => order_item.product,
  )
  order_item: OrderItem;

  @OneToMany(() => CartItem,(cart)=> cart.product)
  cart : CartItem

  @Column()
  price: string;

  @Column()
  quantity: string;

  @Column({ type: 'text', default: '' })
  short_description: string;

  @Column()
  Approved: string;

  @Column({ length: 255 })
  part_number: string;

  @Column({ length: 255 })
  condition: string;

  @Column({ length: 255 })
  sub_condition: string;

  @Column({ type: 'text', default: '' })
  long_description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
