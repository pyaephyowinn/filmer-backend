import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Shooting {
  @Prop({ unique: true, required: true })
  ShootingUrl: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export type ShootingDocument = HydratedDocument<Shooting>;
export const ShootingSchema = SchemaFactory.createForClass(Shooting);
