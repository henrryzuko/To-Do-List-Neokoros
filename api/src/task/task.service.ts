import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async createTask(description: string, userId: number, status: TaskStatus = TaskStatus.OPEN, date?: string): Promise<Task> {
        return this.prisma.task.create({
            data: { description, userId, status, date: date ? new Date(date) : undefined }
        });
    };

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    };

    async getTaskById(id: number, onlyActive?: boolean): Promise<Task | null> {
        const whereParams: any = { id };

        if (onlyActive !== undefined) {
            whereParams.active = onlyActive;
        }
        
        return this.prisma.task.findFirst({ where: whereParams });
    };

    async updateTask(id: number, data: Partial<{ description: string, status: TaskStatus, date: string | null}>): Promise<Task> {
        const updateData: any = {};

        if (data.description !== undefined) {
            updateData.description = data.description;
        }

        if (data.status !== undefined) {
            updateData.status = data.status;
        }

        if (data.date !== undefined) {
            updateData.date = data.date ? new Date(data.date) : null;
        }
        
        return this.prisma.task.update({ 
            where: { id },
            data: updateData
        });
    };

    async deleteTask(id: number, data: Partial<{ active: boolean }>): Promise<Task> {
        return this.prisma.task.update({ where: { id }, data });
    };
}
