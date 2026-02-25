import { Controller, Post, Get, Param, Put, Patch, Body, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() body: { description: string; userId: number; status?: TaskStatus; date?: string }) {
        return this.taskService.createTask(body.description, body.userId, body.status, body.date);
    }

    @Get()
    findAll() {
        return this.taskService.getAllTasks();
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Query('onlyActive') onlyActive?: string,
    ) {
        let onlyActiveFilter: boolean | undefined = onlyActive === undefined ? true : onlyActive === 'true'

        if (onlyActive === 'true') onlyActiveFilter = true;
        if (onlyActive === 'false') onlyActiveFilter = false;

        return this.taskService.getTaskById(Number(id), onlyActiveFilter);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ description: string; status: TaskStatus; date: string }>) {
        return this.taskService.updateTask(Number(id), body);
    }

    @Patch(':id/deactivate')
    deactivate(@Param('id') id: string) {
        return this.taskService.deleteTask(Number(id), { active: false });
    }
}
