import { Brand } from './../../brand/schemas/brand.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ModelDocument = Model & mongoose.Document;

@Schema({ versionKey: false })
export class Model {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
