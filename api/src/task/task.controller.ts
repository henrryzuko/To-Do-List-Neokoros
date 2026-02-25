import { Controller, Post, Get, Param, Put, Body, Query } from '@nestjs/common';
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
        @Query('onlyActive') onlyActive: string,
    ) {
        const active = onlyActive !== 'false';
        return this.taskService.getTaskById(Number(id), active);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ description: string; status: TaskStatus; date: string }>) {
        return this.taskService.updateTask(Number(id), body);
    }

    @Put(':id')
    delete(@Param('id') id: string, @Body() body: Partial<{ active: false }>) {
        return this.taskService.deleteTask(Number(id), body);
    }
}
