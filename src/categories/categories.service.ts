import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Model } from 'mongoose';
import { Film } from 'src/schemas/film.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Film.name) private filmModel: Model<Film>,
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

  async remove(id: string) {
    this.filmModel.updateMany(
      {
        category: id,
      },
      {
        category: null,
      },
    );
    const foundCategory = await this.categoryModel.findById(id);
    if (foundCategory.image) {
    }

    return this.categoryModel.findByIdAndDelete(id);
  }
}
