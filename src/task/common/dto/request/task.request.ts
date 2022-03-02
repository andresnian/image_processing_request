import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly heigth: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly width: number;
}
