import { ModelDocument, Model as ModelSchema } from './schemas/model.schema';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const model = await this.modelModel.findOne({ _id: id }).populate('brand');
    if (!model) {
      throw new NotFoundException(`Model with id ${id} not found`);
    }

    return model;
  }

  async update(id: string, updateModelDto: UpdateModelDto) {
    const model = await this.modelModel.findOneAndUpdate(
      { _id: id },
      updateModelDto,
    );
    if (!model) {
      throw new NotFoundException(`Model with id ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const deleted = await this.modelModel.findOneAndDelete({ _id: id });

    if (!deleted) {
      throw new NotFoundException(`Model with id ${id} not found`);
    }
  }
}
