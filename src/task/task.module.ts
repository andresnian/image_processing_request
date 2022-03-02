import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './controllers/task.controller';
import { TASK } from '../common/models/task.model';
import { TaskService } from './services/task.service';
import { TaskSchema } from './schema/task.schema';
import { HttpModule } from '@nestjs/axios';
import { AxiosAdapter } from './adapters/axios.adapter';
import { S3AwsAdapter } from './adapters/s3Aws.adapter';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 180000,
        maxRedirects: 10
      })
    }),
    MongooseModule.forFeatureAsync([
      {
        name: TASK.name,
        useFactory: () => {
          return TaskSchema;
        },
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, AxiosAdapter, S3AwsAdapter],
})
export class TaskModule {}
