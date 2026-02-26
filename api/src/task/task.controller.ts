import { Controller, Post, Get, Param, Put, Patch, Body, Query, UseGuards, Req } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Req() req, @Body() body: { description: string; status?: TaskStatus; date?: string }) {
        const userId = req.user.userId;
        return this.taskService.createTask(body.description, userId, body.status, body.date);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Req() req) {
        return this.taskService.getAllTasks(req.user.userId);
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
        return this.taskService.deleteTask(Number(id), { status: TaskStatus.DELETED, active: false });
    }
}
