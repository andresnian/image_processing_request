import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { InjectAwsService } from "nest-aws-sdk";
import { Observable, of } from "rxjs";
import { BUCKET_NAME } from "../common/constants/aws.constants";

@Injectable()
export class S3AwsAdapter{
  constructor(@InjectAwsService(S3) private readonly s3: S3){}
  updateFile(key: string, file: Express.Multer.File) : Promise<any>{
    console.log(`S3AwsAdapter - updateFile(${key}, ${file.originalname})`)
    const uploadParams: S3.PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      
    }
    return new Promise((res, rej)=> {
      this.s3.upload(uploadParams, (err, data)=> {
        if(err){
          rej(err)
        }else{
          res(data)
        }
      })
    })
  }
}