import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product_category.entity';
import { BrandModule } from 'src/brand/brand.module';
import { Brand } from 'src/brand/entities/brand.entity';

@Module({
  imports: [BrandModule,TypeOrmModule.forFeature([ProductCategory, Brand])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
