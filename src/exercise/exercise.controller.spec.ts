import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GetMongoModule } from '../setup-mongo';
import { Exercise, ExerciseSchema } from '../entities/exercise.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

describe('ExerciseController', () => {
  let controller: ExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [ExerciseService],
      imports: [
        GetMongoModule(),
        MongooseModule.forFeature([
          { name: Exercise.name, schema: ExerciseSchema },
        ]),
      ],
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
