import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { dataSource } from '../data-source';
import {
  ExerciceCollection,
  ExerciceCollectionDocument,
} from '../entities/collection.entity';
import { Completion } from '../entities/completion.entity';
import { Exercise, ExerciseDocument } from '../entities/exercise.entity';
import { User } from '../entities/user.entity';

export class CollectionCompletion {
  @ApiProperty()
  completed: number;
  @ApiProperty()
  total: number;
}

@Injectable()
export class CompletionService {
  constructor(
    @InjectModel(ExerciceCollection.name)
    private ExerciceCollectionModel: Model<ExerciceCollectionDocument>,
  ) {}

  async getCollectionTotal(collectionId: string): Promise<number> {
    const collection = await this.ExerciceCollectionModel.findById(
      collectionId,
    ).exec();
    return collection?.content?.length ?? 0;
  }

  async getCollectionCompleted(
    collectionId: string,
    user: User,
  ): Promise<CollectionCompletion> {
    const total = await this.getCollectionTotal(collectionId);

    const { count: completed } = await dataSource
      .getRepository(Completion)
      .createQueryBuilder('completion')
      .where('completion.userId = :userId', { userId: user.id })
      .andWhere('completion.collectionId = :collectionId', { collectionId })
      .select('COUNT(DISTINCT completion.exerciseId)')
      .getRawOne();

    return { completed: parseInt(completed) || 0, total };
  }

  async setExerciseCompleted(
    collectionId: string,
    exerciseId: string,
    user: User,
  ): Promise<void> {
    const completion = new Completion();
    completion.collectionId = collectionId;
    completion.exerciseId = exerciseId;
    completion.user = user;
    await completion.save();
  }

  async getExerciseCompletion(
    collectionId: string,
    exerciseId: string,
    user: User,
  ) {
    const completion = await Completion.find({
      where: {
        user: {
          id: user.id,
        },
        collectionId,
        exerciseId,
      },
    });

    if (!completion) return { completed: false };
    return { completed: true, at: completion.map((c) => c.createdAt) };
  }
}
