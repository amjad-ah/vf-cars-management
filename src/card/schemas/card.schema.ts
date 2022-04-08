import { Car } from './../../car/schemas/car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CardDocument = Card & mongoose.Document;

@Schema({ versionKey: false })
export class Card {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  })
  car: Car;

  @Prop()
  credit: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);
