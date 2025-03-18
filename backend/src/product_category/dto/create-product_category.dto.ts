import { Product } from 'src/products/entities/product.entity';

export class CreateProductCategoryDto {
  category_name: string;
  products: Product[];
}
