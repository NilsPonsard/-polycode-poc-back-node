import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExerciceCollection,
  ExerciceCollectionSchema,
} from 'src/entities/collection.entity';
import { Exercise, ExerciseSchema } from 'src/entities/exercise.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExerciceCollection.name, schema: ExerciceCollectionSchema },
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
