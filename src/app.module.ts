import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { TaskRepository } from './tasks/tasks.repository';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task.management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Task],
    }),
    TypeOrmExModule.forCustomRepository([TaskRepository]),
    AuthModule,
  ],
})
export class AppModule {}
