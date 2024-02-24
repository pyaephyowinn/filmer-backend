import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(
    createCategoryDto: Omit<CreateCategoryDto, 'imageFile'>,
    imageUrl?: string,
  ) {
    return this.categoryModel.create({ ...createCategoryDto, image: imageUrl });
  }

  findAll() {
    return this.categoryModel.find({});
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update({
    id,
    updateCategoryDto,
    image,
  }: {
    id: string;
    updateCategoryDto: UpdateCategoryDto;
    image?: string;
  }) {
    if (!image) {
      return this.categoryModel.findByIdAndUpdate(id, {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
      });
    }
    return this.categoryModel.findByIdAndUpdate(id, {
      name: updateCategoryDto.name,
      description: updateCategoryDto.description,
      image: image,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
