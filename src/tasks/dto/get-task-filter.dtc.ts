import { TaskStatus } from '../task-statu.enum';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
