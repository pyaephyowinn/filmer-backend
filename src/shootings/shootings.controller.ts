import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ShootingsService } from './shootings.service';
import { UpdateShootingDto } from './dto/update-shooting.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('shootings')
export class ShootingsController {
  constructor(private readonly shootingsService: ShootingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'imageFiles', maxCount: 10 }]),
  )
  create(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('files', files);
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
