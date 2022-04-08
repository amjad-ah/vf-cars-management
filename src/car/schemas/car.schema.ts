import { Model } from './../../model/schemas/model.schema';
import { Employee } from './../../employee/schemas/employee.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CarDocument = Car & mongoose.Document;

@Schema({ versionKey: false })
export class Car {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Model' })
  model: Model;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  employee: Employee;

  @Prop({ required: true, unique: true })
  plateNumber: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
