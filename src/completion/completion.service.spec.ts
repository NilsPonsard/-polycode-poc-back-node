import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GetMongoModule } from '../setup-mongo';
import {
  ExerciceCollection,
  ExerciceCollectionSchema,
} from '../entities/collection.entity';
import { CompletionService } from './completion.service';

describe('CompletionService', () => {
  let service: CompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: ExerciceCollection.name, schema: ExerciceCollectionSchema },
          // { name: Exercise.name, schema: ExerciseSchema },
        ]),
        GetMongoModule(),
      ],
      providers: [CompletionService],
    }).compile();

    service = module.get<CompletionService>(CompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
