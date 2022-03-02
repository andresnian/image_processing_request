import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter {
  constructor(private httpService: HttpService){}
  postCallAxios(path: string, request: any){
    console.log(`AxiosAdapter - postCallAxios(${path}, ${request})`)
    return this.httpService.post(path, request).toPromise()
  }
}