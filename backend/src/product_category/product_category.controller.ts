import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file', { storage: undefined })) // No disk storage
  async uploadExcelFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }

    // Read the file buffer (no need to save it on disk)
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save extracted data into the database
    await this.productCategoryService.bulkInsert(data);

    return { message: 'Excel file processed successfully!' };
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productCategoryService.findOne(+id);
  // }
  @Get(':brandName')
  async getCategories(@Param('brandName') brandName: string) {
    console.log(brandName);
    console.log("this is req brandname ${brandname")
    return this.productCategoryService.getCategoriesByBrand(brandName);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
