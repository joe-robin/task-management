import { IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
