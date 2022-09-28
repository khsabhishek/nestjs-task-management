import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dtc';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
    ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @GetUser() user: User,): Promise<Task> {
    return this.tasksService.getTaskByID(id, user);
  }

  @Post()
  createTask(
    @Body() CreateTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTasks(CreateTaskDto, user);
  }

  @Delete('/:id')
  DeleteTasks(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.DeleteTasks(id, user);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    return this.tasksService.updateTaskById(id, status, user);
  }
}
