import { IsString } from 'class-validator';

export class CreateFilmDto {
  @IsString({ message: 'filmUrl cannot be empty.' })
  filmUrl: string;
}
