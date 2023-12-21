import { PartialType } from '@nestjs/mapped-types';
import { CreateShootingDto } from './create-shooting.dto';

export class UpdateShootingDto extends PartialType(CreateShootingDto) {}
