import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async getAllUsers(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    async getUserById(id: string): Promise<IUser> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }

        const user = await this.userModel.findOne({ _id: id });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async createUser(userDto: UserDto): Promise<IUser> {
        const newUser = new this.userModel(userDto);

        const isSaved = await newUser.save();

        if (!isSaved) {
            throw new InternalServerErrorException('User not created');
        }

        return newUser;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }
        const isUpdated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });

        if (!isUpdated) {
            throw new InternalServerErrorException('User not updated');
        }

        return updateUserDto;
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }

        const isDeleted = await this.userModel.findByIdAndRemove(id);

        if (!isDeleted) {
            throw new InternalServerErrorException('User not deleted');
        }

        return { message: 'success' };
    }
}
