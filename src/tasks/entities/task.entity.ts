import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
@Schema()
export class Task {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @Prop()
  user: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
