import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GetMongoModule } from '../setup-mongo';
import {
  ExerciceCollection,
  ExerciceCollectionSchema,
} from '../entities/collection.entity';
import { Exercise, ExerciseSchema } from '../entities/exercise.entity';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
  let service: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionService],
      imports: [
        MongooseModule.forFeature([
          { name: ExerciceCollection.name, schema: ExerciceCollectionSchema },
          { name: Exercise.name, schema: ExerciseSchema },
        ]),
        GetMongoModule(),
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
