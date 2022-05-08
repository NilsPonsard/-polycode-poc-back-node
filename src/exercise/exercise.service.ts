import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise, ExerciseDocument } from 'src/entities/exercise.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private ExerciseModel: Model<ExerciseDocument>,
  ) {}

  // create(createExerciceDto: CreateExerciceDto) {
  //   return 'This action adds a new exercice';
  // }

  findAll(): Promise<Exercise[]> {
    return this.ExerciseModel.find(
      {},
      { _id: 1, name: 1, description: 1 },
    ).exec();
  }

  async findOne(id: string) {
    return this.ExerciseModel.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  // update(id: number, updateExerciceDto: UpdateExerciceDto) {
  //   return `This action updates a #${id} exercice`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} exercice`;
  // }
}
