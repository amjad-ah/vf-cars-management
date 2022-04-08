import { NoEnoughCredit } from './../exceptions/NoEnoughCredit';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PassService } from './pass.service';
import { CreatePassDto } from './dto/create-pass.dto';

@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassService) {}

  @Post()
  async create(@Body() createPassDto: CreatePassDto) {
    try {
      return await this.passService.create(createPassDto);
    } catch (error) {
      if (error instanceof NoEnoughCredit) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.passService.findAll();
  }
}
