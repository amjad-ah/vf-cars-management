import { CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  create(createCardDto: CreateCardDto) {
    const createdCard = new this.cardModel({ ...createCardDto, credit: 10 });
    return createdCard.save();
  }

  findAll() {
    return this.cardModel.find();
  }

  findOne(id: string) {
    return this.cardModel.findOne({ _id: id }).populate({
      path: 'car',
      populate: [
        {
          path: 'model',
          populate: [
            {
              path: 'brand',
            },
          ],
        },
        {
          path: 'employee',
        },
      ],
    });
  }

  remove(id: string) {
    this.cardModel.deleteOne({ _id: id }).exec();
    return true;
  }
}
