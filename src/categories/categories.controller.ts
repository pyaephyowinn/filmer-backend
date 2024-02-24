import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('imageFile'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) return this.categoriesService.create(createCategoryDto);

    const createdImage = await this.cloudinaryService.uploadFile(file);
    return this.categoriesService.create(
      createCategoryDto,
      createdImage.secure_url,
    );
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageFile'))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      return this.categoriesService.update({
        id,
        updateCategoryDto: updateCategoryDto,
      });

    const createdImage = await this.cloudinaryService.uploadFile(file);
    return this.categoriesService.update({
      id,
      updateCategoryDto,
      image: createdImage.secure_url,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
