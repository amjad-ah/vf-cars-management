import { Card, CardSchema } from './../card/schemas/card.schema';
import { Pass, PassSchema } from './schemas/pass.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassService } from './pass.service';
import { PassController } from './pass.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pass.name, schema: PassSchema }]),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [PassController],
  providers: [PassService],
})
export class PassModule {}
