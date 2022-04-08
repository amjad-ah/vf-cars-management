import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
