import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Put,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './user-role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
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

    @Put('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUser> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    deleteUser(@Param('id') id: string): Promise<{ message: string }> {
        return this.usersService.deleteUser(id);
    }
}
