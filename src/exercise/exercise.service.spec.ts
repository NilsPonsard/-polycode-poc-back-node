import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GetMongoModule } from '../setup-mongo';
import { Exercise, ExerciseSchema } from '../entities/exercise.entity';
import { ExerciseService } from './exercise.service';

describe('ExerciceService', () => {
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseService],
      imports: [
        GetMongoModule(),
        MongooseModule.forFeature([
          { name: Exercise.name, schema: ExerciseSchema },
        ]),
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
