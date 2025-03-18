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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as XLSX from 'xlsx';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }
  @Get('filter')
  async getProducts(
    @Query('brandId') brandId: number,
    @Query('categoryId') categoryId: number,
  ) {
    return this.productsService.getProductsByBrandAndCategory(brandId, categoryId);
  }

  @Get(':id/details')
  async getProductDetails(@Param('id') id: number) {
    return await this.productsService.getProductDetails(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
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
    await this.productsService.bulkInsert(data);

    return { message: 'Excel file processed successfully!' };
  }
}
