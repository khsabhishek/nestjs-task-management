import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dtc';
import { TaskStatus } from './task-statu.enum';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  task: any;

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskByID(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id: id, user: user },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async DeleteTasks(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id: id, user: user });
    if (result.affected == 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async createTasks(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = await this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskByID(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
