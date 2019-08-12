import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    getAllUsers(): IUser[] {
        const filePath = this.getFilePath();
        const usersData = fs.readFileSync(filePath).toString();

        return JSON.parse(usersData);
    }

    getUserById(id: number): IUser {
        const users = this.getAllUsers();

        return users.find(user => +user.id === +id);
    }

    createUser(userDto: UserDto): IUser {
        const { name, email } = userDto;
        const users = this.getAllUsers();

        const user: IUser = {
            id: users.length + 1,
            name,
            email,
        };
        users.push(user);

        const isSaved = this.saveUsers(users);

        if (isSaved) {
            return user;
        } else {
            return null;
        }
    }

    editUser(id: number, userDto: UserDto): IUser {
        const { name, email } = userDto;
        const users = this.getAllUsers();
        const userIndex = this.getUserIndexById(id, users);

        if (userIndex >= 0) {
            users[userIndex].name = name;
            users[userIndex].email = email;

            const isSaved = this.saveUsers(users);

            if (isSaved) {
                return users[userIndex];
            }
        }

        return null;
    }

    deleteUser(id: number): boolean {
        const users = this.getAllUsers();
        const userIndex = this.getUserIndexById(id, users);

        if (userIndex >= 0) {
            users.splice(userIndex, 1);

            const isSaved = this.saveUsers(users);

            if (isSaved) {
                return true;
            }
        }

        return false;
    }

    private getFilePath(): string {
        return path.join(__dirname, '/../../data/users.json');
    }

    private getUserIndexById(id: number, users: IUser[]): number {
        for (const i in users) {
            if (+users[i].id === +id) {
                return +i;
            }
        }
        return -1;
    }

    private saveUsers(users: IUser[]): boolean {
        try {
            const filePath = this.getFilePath();
            fs.writeFileSync(filePath, JSON.stringify(users));

            return true;
        } catch (e) {
            return false;
        }
    }
}
