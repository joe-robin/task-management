import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { CreateTaskPayload } from './dto/create-task-payload.dto';
import { CreateTaskDto } from './dto/createTaskWithUser.dto';
import { UserPayload } from './dto/user-payload.dto';
import { Task, TaskDocument, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return await new this.taskModel(createTaskDto).save();
  }

  async getAllTask(user: string) {
    try {
      return await this.taskModel.find({ user }).orFail();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getTaskById(id: string, user: string) {
    try {
      return await this.taskModel.findOne({ _id: id, user }).orFail();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteTaskById(id: string, user: string) {
    try {
      return await this.taskModel.findOneAndDelete({ _id: id, user }).orFail();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: string) {
    try {
      return await this.taskModel
        .findOneAndUpdate({ _id: id, user }, { status }, { new: true })
        .orFail();
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
