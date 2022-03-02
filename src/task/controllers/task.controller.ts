import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { TaskRequest } from '../common/dto/request/task.request';
import { TaskStatusResponse } from '../common/dto/response/tastStatus.response';
import { BASE_TASK, CREATE_TASK, STATUS_TASK } from '../common/routes/Routes';
import { TaskService } from '../services/task.service';

@ApiTags('tasks')
@Controller(BASE_TASK)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post(CREATE_TASK)
  @UseInterceptors(FileInterceptor('file'))
  createTask(
    @UploadedFile() file: Express.Multer.File,
    @Query('heigth') heigth: number,
    @Query('width') width: number,
  ) {
    return this.taskService.createTask(file, {'heigth': heigth, 'width': width});
  }

  @Get(STATUS_TASK)
  statusTask(@Param('id') id: string) {
    return this.taskService.statusTask(id);
  }
}
