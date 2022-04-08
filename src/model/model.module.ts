import { ModelSchema } from './schemas/model.schema';
import { Model } from './schemas/model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }]),
  ],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
