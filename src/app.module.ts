import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DATABASE_URL } from './config/env.config';
import { FilmsModule } from './films/films.module';
import { ImagesModule } from './images/images.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ShootingsModule } from './shootings/shootings.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(DATABASE_URL),

    UsersModule,
    AuthModule,
    FilmsModule,
    ImagesModule,
    CloudinaryModule,
    ShootingsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
