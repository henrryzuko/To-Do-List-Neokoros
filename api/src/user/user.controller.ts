import { Controller, Post, Get, Param, Put, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() body: { name: string }) {
        return this.userService.createUser(body.name);
    }

    @Get()
    findAll() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Query('onlyActive') onlyActive: string,
    ) {
        const active = onlyActive !== 'false';
        return this.userService.getUserById(Number(id), active);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ name: string }>) {
        return this.userService.updateUser(Number(id), body);
    }

    @Put(':id')
    delete(@Param('id') id: string, @Body() body: Partial<{ active: false }>) {
        return this.userService.deleteUser(Number(id), body);
    }
}
