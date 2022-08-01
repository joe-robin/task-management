import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskPayload } from './dto/create-task-payload.dto';
import { CreateTaskDto } from './dto/createTaskWithUser.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(
    @Body() createTaskPayload: CreateTaskPayload,
    @GetUser() user: string,
  ) {
    const createTaskObj = { ...createTaskPayload, user };
    return this.taskService.createTask(createTaskObj);
  }

  @Get()
  getTasks(@GetUser() user: string) {
    return this.taskService.getAllTask(user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: string) {
    return this.taskService.getTaskById(id, user);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: string,
  ) {
    const { status } = updateTaskStatusDto;

    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: string) {
    return this.taskService.deleteTaskById(id, user);
  }
}
