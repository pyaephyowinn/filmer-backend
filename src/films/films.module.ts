import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from 'src/schemas/films.schema';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
  ],
})
export class FilmsModule {}
