import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  getTasks() {
    return this.taskService.getAllTask();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.delteTaskById(id);
  }
}
