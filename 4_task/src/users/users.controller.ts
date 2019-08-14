import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<IUser[]> {
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<IUser> {
        return await this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() userDto: UserDto): Promise<IUser> {
        return this.usersService.createUser(userDto);
    }

    @Put('/:id')
    updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<IUser> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<{ message: string }> {
        return this.usersService.deleteUser(id);
    }
}
