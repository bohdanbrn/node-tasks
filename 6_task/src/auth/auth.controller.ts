import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';

@Controller()
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() createUserDto: CreateUserDto): Promise<IUser> {
        return this.usersService.createUser(createUserDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
