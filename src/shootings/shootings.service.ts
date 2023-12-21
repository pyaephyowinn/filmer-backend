import { Injectable } from '@nestjs/common';
import { CreateShootingDto } from './dto/create-shooting.dto';
import { UpdateShootingDto } from './dto/update-shooting.dto';

@Injectable()
export class ShootingsService {
  create(createShootingDto?: CreateShootingDto) {
    return 'This action adds a new shooting';
  }

  findAll() {
    return `This action returns all shootings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shooting`;
  }

  update(id: number, updateShootingDto: UpdateShootingDto) {
    return `This action updates a #${id} shooting`;
  }

  remove(id: number) {
    return `This action removes a #${id} shooting`;
  }
}
