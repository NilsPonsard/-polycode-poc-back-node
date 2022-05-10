import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Exercise } from './exercise.entity';

export type ExerciceCollectionDocument = ExerciceCollection & Document;

@Schema()
export class ExerciceCollection extends Document {
  @ApiProperty()
  @Prop({ index: true, required: true })
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  })
  content: Exercise[];
}

export const ExerciceCollectionSchema =
  SchemaFactory.createForClass(ExerciceCollection);
