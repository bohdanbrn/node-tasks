import { IsString, IsIn, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class GetUserDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    username?: string;

    @IsEnum(UserRole)
    @IsOptional()
    @IsIn([UserRole.USER, UserRole.ADMIN])
    role?: string;
}
