import { Brand } from "src/brand/entities/brand.entity";
import { ProductCategory } from "src/product_category/entities/product_category.entity";

export class CreateProductDto {
  brand_id: Brand;

  product_category_id: ProductCategory;

  price: string;

  quantity: string;

  short_description: string;

  long_description: string;

  status: string;

  part_number: string;

  condition: string;
  
  sub_condition: string;
}
