import { CarDocument } from './schemas/car.schema';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  create(createCarDto: CreateCarDto) {
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  findAll() {
    return this.carModel.find();
  }

  async findOne(id: string) {
    const car = await this.carModel
      .findOne({ _id: id })
      .populate({
        path: 'model',
        populate: [
          {
            path: 'brand',
          },
        ],
      })
      .populate('employee');

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.carModel.findOneAndUpdate({ _id: id }, updateCarDto);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const deleted = await this.carModel.findOneAndDelete({ _id: id });

    if (!deleted) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
  }
}
