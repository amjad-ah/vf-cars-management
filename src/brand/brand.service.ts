import { BrandDocument } from './schemas/brand.schema';
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    return createdBrand
      .save()
      .then((data) => data)
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const errors = {};

          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });
          throw new BadRequestException({ errors });
        }
        throw err;
      });
  }

  findAll() {
    return this.brandModel.find();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel.findOneAndUpdate(
      { _id: id },
      updateBrandDto,
    );
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const deleted = await this.brandModel.findOneAndDelete({ _id: id });

    if (!deleted) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
  }
}
