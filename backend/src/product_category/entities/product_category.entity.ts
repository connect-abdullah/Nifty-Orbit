import { Brand } from 'src/brand/entities/brand.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  product_category_id: number;

  @Column({ length: 255 })
  category_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
