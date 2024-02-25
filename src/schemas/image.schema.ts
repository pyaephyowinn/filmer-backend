import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';

@Schema({
  timestamps: true,
})
export class Image {
  @Prop({ type: Object })
  image: CloudinaryResponse;
}

export type ImageDocument = HydratedDocument<Image>;
export const ImageSchema = SchemaFactory.createForClass(Image);
