import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB } from 'utils/Constants';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(DB), TasksModule, AuthModule, UsersModule],
})
export class AppModule {}
