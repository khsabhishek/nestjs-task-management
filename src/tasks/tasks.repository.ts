import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-statu.enum';

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {
}
// async createTask(createTaskDto: CreateTaskDto): Promise<Task> {}
// //     const { title, description } = createTaskDto;

//     const task = this.create({
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     });

//     await this.save(task);
//     return task;
//   }