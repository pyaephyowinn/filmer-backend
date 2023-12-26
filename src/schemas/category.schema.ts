import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Film } from './film.schema';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Film' })
  films: Film[];
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
