import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EmployeeDocument = Employee & mongoose.Document;

@Schema({ versionKey: false })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  position: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
