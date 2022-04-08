import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    BrandModule,
    ModelModule,
    MongooseModule.forRoot('mongodb://localhost/cars'),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
