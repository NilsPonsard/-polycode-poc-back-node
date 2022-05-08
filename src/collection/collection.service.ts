import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExerciceCollection,
  ExerciceCollectionDocument,
} from 'src/entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(ExerciceCollection.name)
    private ExerciceCollectionModel: Model<ExerciceCollectionDocument>,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  findAll(offset: number, limit: number): Promise<ExerciceCollection[]> {
    return this.ExerciceCollectionModel.find(
      {},
      { _id: 1, description: 1, name: 1 },
    )
      .skip(offset)
      .limit(limit)
      .exec();
  }

  findOne(id: number): Promise<ExerciceCollection> {
    return this.ExerciceCollectionModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
