import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Film, FilmSchema } from 'src/schemas/film.schema';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
  ],
})
export class CategoriesModule {}
