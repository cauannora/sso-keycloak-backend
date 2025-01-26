import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      done: true
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      done: true
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      done: false
    }
  ]

  getTasks(): TaskDto[] {
    return this.tasks;
  }

  getTask(id: number): TaskDto {
    return this.tasks.find(task => task.id === id);
  }
}
