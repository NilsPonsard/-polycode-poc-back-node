import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ExerciceCollection,
  ExerciceCollectionSchema,
} from '../entities/collection.entity';
import { Exercise, ExerciseSchema } from '../entities/exercise.entity';
import { GetMongoModule } from '../setup-mongo';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

describe('CollectionController', () => {
  let controller: CollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionController],
      providers: [CollectionService],
      imports: [
        MongooseModule.forFeature([
          { name: ExerciceCollection.name, schema: ExerciceCollectionSchema },
          { name: Exercise.name, schema: ExerciseSchema },
        ]),
        GetMongoModule(),
      ],
    }).compile();

    controller = module.get<CollectionController>(CollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
