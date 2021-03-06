import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { EmployeeModule } from './employee/employee.module';
import { CarModule } from './car/car.module';
import { CardModule } from './card/card.module';
import { PassModule } from './pass/pass.module';

@Module({
  imports: [
    BrandModule,
    ModelModule,
    MongooseModule.forRoot(
      // TODO: this should be in a config file
      'mongodb+srv://root:root@cars.sbrjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    EmployeeModule,
    CarModule,
    CardModule,
    PassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
