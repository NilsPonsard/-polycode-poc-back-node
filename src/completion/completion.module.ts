import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExerciceCollection,
  ExerciceCollectionSchema,
} from '../entities/collection.entity';
import { Exercise, ExerciseSchema } from '../entities/exercise.entity';
import { CompletionController } from './completion.controller';
import { CompletionService } from './completion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExerciceCollection.name, schema: ExerciceCollectionSchema },
      // { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [CompletionController],
  providers: [CompletionService],
})
export class CompletionModule {}
