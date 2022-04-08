import { BrandDocument } from './schemas/brand.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  findAll() {
    return this.brandModel.find();
  }

  findOne(id: string) {
    return this.brandModel.findOne({ _id: id }).populate('models');
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.brandModel.findOne({ _id: id });
    brand.updateOne(updateBrandDto);

    return brand.findOne();
  }

  remove(id: string) {
    this.brandModel.deleteOne({ _id: id }).exec();
    return true;
  }
}
