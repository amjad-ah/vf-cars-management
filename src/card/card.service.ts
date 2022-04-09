import { CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  create(createCardDto: CreateCardDto) {
    const createdCard = new this.cardModel({ ...createCardDto, credit: 10 });
    return createdCard
      .save()
      .then((data) => data)
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const errors = {};

          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });
          throw new BadRequestException({ errors });
        }
        throw err;
      });
  }

  findAll() {
    return this.cardModel.find();
  }

  async findOne(id: string) {
    const card = await this.cardModel.findOne({ _id: id }).populate({
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

    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    return card;
  }

  async remove(id: string) {
    const deleted = await this.cardModel.findOneAndDelete({ _id: id });

    if (!deleted) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
  }
}
