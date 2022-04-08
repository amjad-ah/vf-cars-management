import { CarDocument } from './schemas/car.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.carModel
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
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const car = this.carModel.findOne({ _id: id });
    car.updateOne(updateCarDto);

    return car.findOne();
  }

  remove(id: string) {
    this.carModel.deleteOne({ _id: id }).exec();
    return true;
  }
}
