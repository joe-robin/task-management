import { NestFactory } from '@nestjs/core';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ unique: true })
  userName: string;

  @Prop({ select: false })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
