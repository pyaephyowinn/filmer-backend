import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from 'src/schemas/film.schema';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  create(film: CreateFilmDto, userId: string) {
    return this.filmModel.create({
      ...film,
      user: userId,
      category: film.categoryId,
    });
  }

  async findAll() {
    const data = await this.filmModel
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$category._id',
            name: { $first: '$category.name' },
            description: { $first: '$category.description' },
            image: { $first: '$category.image' },
            films: {
              $push: {
                id: '$_id',
                filmUrl: '$filmUrl',
              },
            },
          },
        },
      ])
      .exec();

    return data;

    return this.filmModel.find({}).populate('user category', 'name');
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
