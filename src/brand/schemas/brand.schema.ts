import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BrandDocument = Brand & mongoose.Document;

@Schema({ versionKey: false })
export class Brand {
  @Prop({ required: true })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
