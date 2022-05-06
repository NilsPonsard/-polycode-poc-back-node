import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise extends Document {
  // @Prop()
  // _id: string;

  @Prop({ index: true, required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  content: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
