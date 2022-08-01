import { IsNotEmpty } from 'class-validator';
import { CreateTaskPayload } from './create-task-payload.dto';

export class CreateTaskDto extends CreateTaskPayload {
  @IsNotEmpty()
  user: string;
}
