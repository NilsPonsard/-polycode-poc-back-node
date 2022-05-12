import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GetMongoModule } from '../setup-mongo';
import {
  ExerciceCollection,
  ExerciceCollectionSchema,
} from '../entities/collection.entity';
import { CompletionController } from './completion.controller';
import { CompletionService } from './completion.service';

describe('CompletionController', () => {
  let controller: CompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GetMongoModule(),
        MongooseModule.forFeature([
          { name: ExerciceCollection.name, schema: ExerciceCollectionSchema },
          // { name: Exercise.name, schema: ExerciseSchema },
        ]),
      ],
      controllers: [CompletionController],
      providers: [CompletionService],
    }).compile();

    controller = module.get<CompletionController>(CompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
