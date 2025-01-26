import { Controller, Get, Param } from '@nestjs/common';
import { Resource, Roles } from 'nest-keycloak-connect';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get()
  @Roles({ roles: ['admin'] })
  findAll(): TaskDto[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  @Roles({ roles: ['admin'] })
  findOne(@Param('id') id: string): TaskDto {
    return this.taskService.getTask(+id);
  }
}
