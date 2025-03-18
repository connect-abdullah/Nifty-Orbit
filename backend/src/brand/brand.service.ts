import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto) {
    // TODO: implement logic here
    const brand: Brand = new Brand();
    brand.brand_name = createBrandDto.brand_name;
    brand.brand_image = createBrandDto.brand_image;
    return this.brandRepo.save(brand);
  }

  findAll() {
    return this.brandRepo.find();
  }

  findAllProducts(name: string) {
    return this.brandRepo.findOne({
      where: { brand_name: name },
      relations: { products: true, productCategories: true },
    });
  }

  async bulkInsert(data: any[]) {
    const products = data.map((row) => ({
      brand_name: String(row['Brand Name']), // Ensure it's a string
      brand_image: String(row['Image']), // Ensure it's a number
    }));

    // Ensure objects match the Product entity
    const validProducts = products.map((product) =>
      Object.assign(new Brand(), product),
    );
    console.log(validProducts);

    // Save in DB
    await this.brandRepo.save(validProducts);
  }
  
  findOne(id: number) {
    return this.brandRepo.findBy({ brand_id: id });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
