import { EmployeeDocument } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const createdCat = new this.employeeModel(createEmployeeDto);
    return createdCat.save();
  }

  findAll() {
    return this.employeeModel.find();
  }

  findOne(id: string) {
    return this.employeeModel.findOne({ _id: id });
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.employeeModel.findOne({ _id: id });
    employee.updateOne(updateEmployeeDto);

    return employee.findOne();
  }

  remove(id: string) {
    this.employeeModel.deleteOne({ _id: id }).exec();
    return true;
  }
}
