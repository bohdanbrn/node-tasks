import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
        return this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
