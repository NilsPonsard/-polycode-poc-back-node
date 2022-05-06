import { Injectable } from '@nestjs/common';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { Exercise, ExerciseDocument } from 'src/entities/exercise.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExerciceService {
  constructor(
    @InjectModel(Exercise.name)
    private ExerciseModel: Model<ExerciseDocument>,
  ) {}

  // create(createExerciceDto: CreateExerciceDto) {
  //   return 'This action adds a new exercice';
  // }

  findAll(): Promise<Exercise[]> {
    return this.ExerciseModel.find().exec();
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
