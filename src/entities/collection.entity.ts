import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Exercise } from './exercise.entity';

export type CollectionDocument = Collection & Document;

@Schema()
export class Collection extends Document {
  @Prop()
  _id: string;

  @Prop({ index: true, required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  })
  content: Exercise[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);