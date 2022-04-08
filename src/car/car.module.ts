import { CarSchema } from './schemas/car.schema';
import { Car } from './schemas/car.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
