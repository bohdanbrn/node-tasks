import { ReflectMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/user-role.enum';

export const Roles = (...roles: UserRole[]) => ReflectMetadata('roles', roles);
