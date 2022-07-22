import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskStatus } from './entities/task.entity';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  createTask(createTaskDto: CreateTaskDto) {
    // const task:  = {
    //   id: uuid(),
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // };

    // this.tasks.push(task);
    // return task;
    return new this.taskModel(createTaskDto).save();
  }

  getAllTask() {
    // return this.tasks.filter((tesk) => {});
  }

  getTaskById(id: string) {
    // if (this.tasks.find((task) => task.id === id)) {
    //   return this.tasks.find((task) => task.id === id);
    // } else {
    //   throw new NotFoundException(`Task Id ${id} not found`);
    // }
  }

  delteTaskById(id: string) {
    // this.getTaskById(id);
    // const tasks = this.tasks.filter((task) => task.id !== id);
    // this.tasks = tasks;
    // return tasks;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    // const task = this.getTaskById(id);
    // task.status = status;
    // return task;
  }
}
