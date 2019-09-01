import { IsString, MinLength, MaxLength, Matches, IsIn, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password to weak',
    })
    password: string;

    @IsIn([UserRole.USER, UserRole.ADMIN])
    @IsEnum(UserRole)
    role: string;
}
