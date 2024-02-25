import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from 'src/schemas/image.schema';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(Image.name) private imageModel: Model<Image>,
  ) {}

  async create(files: CreateImageDto) {
    const uploadedImages = await this.cloudinaryService.uploadMultipleFiles(
      files.imageFiles,
    );

    const images = uploadedImages.map((i) => ({
      image: i,
    }));

    return this.imageModel.create(images);
  }

  findAll() {
    return this.imageModel.find({});
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
