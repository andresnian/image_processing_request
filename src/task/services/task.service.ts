import { Inject, Injectable } from '@nestjs/common';
import { TaskRequest } from '../common/dto/request/task.request';
import { TaskResponse } from '../common/dto/response/task.response';
import { v4 as uuidV4 } from 'uuid';
import { TaskStatusResponse } from '../common/dto/response/tastStatus.response';
import { InjectModel } from '@nestjs/mongoose';
import { TASK } from 'src/common/models/task.model';
import { Model } from 'mongoose';
import { ITask } from '../common/interface/task.interface';
import { StateTask } from '../common/constants/state-task.constant';
import { AxiosAdapter } from '../adapters/axios.adapter';
import { ImageProcessLambdaRequest } from '../common/dto/request/lambdaImageProcess.request';
import { IMAGE_PROCESSING_LAMBDA_SERVICE } from '../common/routes/external.routes';
import { S3AwsAdapter } from '../adapters/s3Aws.adapter';
import { DIRECTORY_IMAGES_S3, SLASH } from '../common/constants/aws.constants';
import * as crypto from 'crypto';

@Injectable()
export class TaskService {
  constructor(
    private readonly axiosAdapter: AxiosAdapter,
    private readonly s3AwsAdapter: S3AwsAdapter,
    @InjectModel(TASK.name) private readonly model: Model<ITask>,
    ) {}
    
  async createTask(file: Express.Multer.File, taskRequest: TaskRequest): Promise<TaskResponse> {
    console.log(`createTask(${file.originalname}, ${StateTask.CREATED})`)
    const idTransaction = uuidV4()
    const newTask = new this.model({
      pathImage: `${DIRECTORY_IMAGES_S3}${SLASH}${file.originalname}`,
      state: StateTask.CREATED,
      nameImage: file.originalname,
      md5File: crypto.createHash('md5').update(`${DIRECTORY_IMAGES_S3}${SLASH}${file.originalname}`).digest('hex')
    });
    await newTask.save();

    this.callImageProcess(
      `${process.env.IMAGE_PROCESSING_LAMBDA_HOST}${IMAGE_PROCESSING_LAMBDA_SERVICE}`, 
      {
        'path': `${DIRECTORY_IMAGES_S3}${SLASH}${file.originalname}`,
        'height': taskRequest.heigth,
        'width': taskRequest.width
      }, 
      '', 
      file, 
      `${DIRECTORY_IMAGES_S3}${SLASH}${file.originalname}`
    )
    return {
      processId: newTask._id.toString()
    };
  }

  async statusTask(id: string): Promise<ITask> {
    console.log(`createTask(${id})`)
    return await this.model.findById(id);
  }

  callImageProcess(
    urlServiceLambda: string, 
    request: ImageProcessLambdaRequest, 
    idTransaction: string,
    file: Express.Multer.File,
    pathObject: string
  ){
      console.log(`TaskService - callImageProcess(${urlServiceLambda}, ${request})`)
      this.s3AwsAdapter.updateFile(pathObject, file)
        .then(res => {
          return this.axiosAdapter.postCallAxios(urlServiceLambda, request);
        }).then(res => {
          console.log("Response lambda ", res.data)
        }).catch(err => {
          console.error(err)
        })
  }
}
