import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    product.brand = createProductDto.brand_id;
    product.category = createProductDto.product_category_id;
    return this.productRepository.save(product);
  }
  async getProductsByBrandAndCategory(brandId: number, categoryId: number) {
    return this.productRepository.find({
      where: {
        brand: { brand_id: brandId },
        category: { product_category_id: categoryId },
      },
      relations: { brand: true , category: true},// Load related entities
    });
  }

  async getProductDetails(productId: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')  // Ensure 'category' exists in entity
      .leftJoinAndSelect('product.brand', 'brand')  // Ensure 'brand' exists in entity
      .select([
        'product.product_id AS product_id',
        'category.product_category_id AS product_category_id',
        'category.category_name AS category_name',
        'product.price AS price',
        'product.quantity AS quantity',
        'product.short_description AS short_des',
        'brand.brand_name AS brand_name',
      ])
      .where('product.product_id = :productId', { productId })
      .getRawOne();
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  
    return product;
  }

  findOne(id: number) {
    return this.productRepository.findBy({ product_id: id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async bulkInsert(data: any[]) {
    const products = data.map((row) => ({
      part_number: String(row['Part Number'] || row['part number']), // Ensure it's a string
      brand: Number(row['Brand']), // Ensure it's a number
      product_category: Number(row['Category']),
      condition: String(row['Condition']),
      sub_condition: String(row['Sub Condtion']),
      price: String(row['Price']), // Convert to number, default 0 if NaN
      quantity: String(row['Quantity']), // Convert to integer, default 0 if NaN
      short_description: String(row['Short Description'] || ''),
      long_description: String(row['Long Description'] || ''),
       Approved: row['Approved'] === 'Done' ? true : false, // Convert to boolean
    }));

    // Ensure objects match the Product entity
    const validProducts = products.map((product) =>
      Object.assign(new Product(), product),
    );
    console.log(validProducts);

    // Save in DB
    await this.productRepository.save(validProducts);
  }
}
