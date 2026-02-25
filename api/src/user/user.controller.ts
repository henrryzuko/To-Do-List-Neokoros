import { Controller, Post, Get, Param, Put, Patch, Body, Query } from '@nestjs/common';
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
        @Query('onlyActive') onlyActive?: string,
    ) {
        let onlyActiveFilter: boolean | undefined = onlyActive === undefined ? true : onlyActive === 'true'

        if (onlyActive === 'true') onlyActiveFilter = true;
        if (onlyActive === 'false') onlyActiveFilter = false;
        
        return this.userService.getUserById(Number(id), onlyActiveFilter);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ name: string }>) {
        return this.userService.updateUser(Number(id), body);
    }

    @Patch(':id/deactivate')
    deactivate(@Param('id') id: string) {
        return this.userService.deleteUser(Number(id), { active: false });
    }
}
