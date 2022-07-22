import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB } from 'utils/Constants';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot(DB), TasksModule],
})
export class AppModule {}
