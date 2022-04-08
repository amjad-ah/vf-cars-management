import { NoEnoughCredit } from './../exceptions/NoEnoughCredit';
import { Card, CardDocument } from './../card/schemas/card.schema';
import { Pass, PassDocument } from './schemas/pass.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreatePassDto } from './dto/create-pass.dto';

@Injectable()
export class PassService {
  constructor(
    @InjectModel(Pass.name) private passModel: Model<PassDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
  ) {}

  async create(createPassDto: CreatePassDto) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    const passInAMinute = await this.passModel.find({
      createdAt: { $gt: date },
      cost: { $gt: 0 },
    });

    const cost = passInAMinute.length > 0 ? 0 : 4;
    const card = await this.cardModel.findById(createPassDto.card);
    if (card.credit < cost) {
      throw new NoEnoughCredit('Not enough credit');
    }
    await card.updateOne({ credit: card.credit - cost });
    const createdPass = new this.passModel({ ...createPassDto, cost });

    return (await createdPass.save()).populate('card');
  }

  findAll() {
    return this.passModel.find().populate({
      path: 'card',
      populate: [
        {
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
        },
      ],
    });
  }
}
