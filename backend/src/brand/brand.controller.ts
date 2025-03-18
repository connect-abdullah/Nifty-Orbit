import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';


@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
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
    await this.brandService.bulkInsert(data);

    return { message: 'Excel file processed successfully!' };
  }

  @Get(':name')
  findAllProducts(@Param('name') name: string) {
    return this.brandService.findAllProducts(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
