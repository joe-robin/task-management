import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskPayload {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  user: string;
}
