import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  description: string;

  imageFile: Express.Multer.File;
}
