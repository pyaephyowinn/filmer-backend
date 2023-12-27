import { IsOptional, IsString } from 'class-validator';

export class CreateFilmDto {
  @IsString({ message: 'filmUrl cannot be empty.' })
  filmUrl: string;

  @IsString()
  @IsOptional()
  categoryId: string;
}
