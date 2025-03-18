import { ProductCategory } from 'src/product_category/entities/product_category.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column({ length: 255 })
  brand_name: string;

  @Column({ length: 255 })
  brand_image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
  
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.brand)
  productCategories: ProductCategory[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
