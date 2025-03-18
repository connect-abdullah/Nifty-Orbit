import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ProductCategory } from './entities/product_category.entity';
import { Brand } from 'src/brand/entities/brand.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategory: ProductCategory = new ProductCategory();
    productCategory.category_name = createProductCategoryDto.category_name;
    return this.productCategoryRepository.save(productCategory);
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  findOne(id: number){
    return this.productCategoryRepository.findOne({
      where: { product_category_id: id },
      relations: { products: true },
    });
  }
  async getCategoriesByBrand(brandName: string) {
    console.log(brandName);
    const category = this.productCategoryRepository.find({
      where: { brand:{ brand_name : ILike (brandName),} },
      relations: { brand: true },
    });
    console.log(category);
    return category;
  }
  async bulkInsert(data: any[]) {
    const products = data.map((row) => ({
      category_name: String(row['Category']), // Ensure it's a string
      brand_id: Number(row['BrandId']),
    }));

    // Ensure objects match the Product entity
    const validProducts = products.map((product) =>
      Object.assign(new ProductCategory(), product),
    );
    console.log(validProducts);

    // Save in DB
    await this.productCategoryRepository.save(validProducts);
  }

  update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    return `This action updates a #${id} productCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}
