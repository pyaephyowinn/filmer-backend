import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createFilmDto: CreateFilmDto, @Request() req) {
    return this.filmsService.create(createFilmDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    const updatedFilm = await this.filmsService.update(id, updateFilmDto);
    return {
      message: 'success',
      data: {
        updatedFilm,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.filmsService.remove(id);
    return {
      message: 'success',
    };
  }

  @Delete()
  async removeAll() {
    const deletedFilms = await this.filmsService.removeAll();
    return {
      message: 'success',
      data: {
        deletedFilms,
      },
    };
  }
}
