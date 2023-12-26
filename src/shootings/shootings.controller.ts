import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateShootingDto } from './dto/update-shooting.dto';
import { ShootingsService } from './shootings.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('shootings')
export class ShootingsController {
  constructor(
    private readonly shootingsService: ShootingsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'imageFiles', maxCount: 10 }]),
  )
  async create(@UploadedFiles() files: { imageFiles: Express.Multer.File[] }) {
    console.log('files', files);
    const uploadPromise = files.imageFiles.map((file) =>
      this.cloudinaryService.uploadFile(file),
    );
    const res = await Promise.all(uploadPromise);
    console.log('res', res);

    return this.shootingsService.create();
  }

  @Get()
  findAll() {
    return this.shootingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shootingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShootingDto: UpdateShootingDto,
  ) {
    return this.shootingsService.update(+id, updateShootingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shootingsService.remove(+id);
  }
}
