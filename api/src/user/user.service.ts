import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(name: string): Promise<User> {
        return this.prisma.user.create({ data: { name } });
    };

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany({ include: { tasks: true } });
    };

    async getUserById(id: number, onlyActive?: boolean): Promise<User | null> {
        const whereParams: any = { id };

        if (onlyActive !== undefined) {
            whereParams.active = onlyActive;
        }
        
        return this.prisma.user.findFirst({ where: whereParams });
    };

    async updateUser(id: number, data: Partial<{ name: string}>): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    };

    async deleteUser(id: number, data: Partial<{ active: boolean }>): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    };
}
