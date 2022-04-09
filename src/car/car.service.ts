import { CarDocument } from './schemas/car.schema';
import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  create(createCarDto: CreateCarDto) {
    const createdCar = new this.carModel(createCarDto);
    return createdCar
      .save()
      .then((data) => {
        return data.populate([
          {
            path: 'model',
            populate: [
              {
                path: 'brand',
              },
            ],
          },
          {
            path: 'employee',
          },
        ]);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const errors = {};

          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });
          throw new BadRequestException({ errors });
        }
        // 11000 duplicate error code
        if (err.code == 11000) {
          throw new BadRequestException('Car already exists');
        }
        throw err;
      });
  }

  findAll() {
    return this.carModel.find().populate([
      {
        path: 'model',
        populate: [
          {
            path: 'brand',
          },
        ],
      },
      {
        path: 'employee',
      },
    ]);
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
