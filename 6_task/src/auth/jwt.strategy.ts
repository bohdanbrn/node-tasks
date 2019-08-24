import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<IUser> {
        const { username } = payload;
        const user = await this.usersService.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
