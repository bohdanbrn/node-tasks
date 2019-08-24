import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<IUser> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersService.findOne({ username });
        if (user && user.password === password) {
            delete user.password;
            return user;
        }
        return null;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(authCredentialsDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { username } = user;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
