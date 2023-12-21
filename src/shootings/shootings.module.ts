import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ShootingsController } from './shootings.controller';
import { ShootingsService } from './shootings.service';

@Module({
  controllers: [ShootingsController],
  providers: [ShootingsService, CloudinaryService],
})
export class ShootingsModule {}
