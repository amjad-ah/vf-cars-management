import { Card } from './../../card/schemas/card.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PassDocument = Pass & mongoose.Document;

@Schema({ versionKey: false, timestamps: true })
export class Pass {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  })
  card: Card;

  @Prop()
  cost: number;
}

export const PassSchema = SchemaFactory.createForClass(Pass);
