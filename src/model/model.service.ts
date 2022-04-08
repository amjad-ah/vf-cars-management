import { ModelDocument, Model as ModelSchema } from './schemas/model.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(ModelSchema.name) private modelModel: Model<ModelDocument>,
  ) {}

  create(createModelDto: CreateModelDto) {
    const createdCat = new this.modelModel(createModelDto);
    return createdCat.save();
  }

  findAll() {
    return this.modelModel.find().populate('brand');
  }

  findOne(id: string) {
    return this.modelModel.findOne({ _id: id }).populate('brand');
  }

  update(id: string, updateModelDto: UpdateModelDto) {
    const model = this.modelModel.findOne({ _id: id });
    model.updateOne(updateModelDto);

    return model.findOne();
  }

  remove(id: string) {
    this.modelModel.deleteOne({ _id: id }).exec();
    return true;
  }
}
