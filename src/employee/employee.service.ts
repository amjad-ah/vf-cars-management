import { EmployeeDocument } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id);
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeModel.findOneAndUpdate(
      { _id: id },
      updateEmployeeDto,
    );
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const deleted = await this.employeeModel.findOneAndDelete({ _id: id });

    if (!deleted) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }
}
