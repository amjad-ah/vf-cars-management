import { NoEnoughCredit } from './../exceptions/NoEnoughCredit';
import { Card, CardDocument } from './../card/schemas/card.schema';
import { Pass, PassDocument } from './schemas/pass.schema';
import { Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreatePassDto } from './dto/create-pass.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class PassService {
  constructor(
    @InjectModel(Pass.name) private passModel: Model<PassDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(createPassDto: CreatePassDto) {
    const session = await this.connection.startSession();
    session.startTransaction();
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    const passInAMinute = await this.passModel
      .find({
        card: createPassDto.card,
        createdAt: { $gt: date },
        cost: { $gt: 0 },
      })
      .session(session);

    const cost = passInAMinute.length > 0 ? 0 : 4;
    const card = await this.cardModel
      .findById(createPassDto.card)
      .session(session);
    if (card.credit < cost) {
      session.abortTransaction();
      throw new NoEnoughCredit('Not enough credit');
    }
    await card.updateOne({ credit: card.credit - cost }).session(session);
    const createdPass = new this.passModel({ ...createPassDto, cost }); // .session(session);
    session.commitTransaction();

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
