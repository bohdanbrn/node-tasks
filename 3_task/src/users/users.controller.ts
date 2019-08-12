import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<IUser[]> {
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number): Promise<IUser> {
        return await this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() userDto: UserDto): Promise<IUser> {
        return this.usersService.createUser(userDto);
    }

    @Put('/:id')
    editUser(
        @Param('id') id: number,
        @Body() userDto: UserDto,
    ): IUser {
        return this.usersService.editUser(id, userDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number): { message: string } {
        const isDeleted = this.usersService.deleteUser(id);

        if (isDeleted) {
            return {message: 'success'};
        }

        return null;
    }
}
