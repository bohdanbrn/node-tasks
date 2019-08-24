import {
    Injectable,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { IMessage } from './interfaces/message.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>) {}

    async getAllMessages(): Promise<IMessage[]> {
        return await this.messageModel.find();
    }

    async getMessageById(id: string): Promise<IMessage> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }

        const message = await this.messageModel.findOne({ _id: id });

        if (!message) {
            throw new NotFoundException('Message not found');
        }

        return message;
    }

    async createMessage(messageDto: MessageDto): Promise<IMessage> {
        const newMessage = new this.messageModel(messageDto);

        const isSaved = await newMessage.save();

        if (!isSaved) {
            throw new InternalServerErrorException('Message not created');
        }

        return newMessage;
    }

    async updateMessage(id: string, updateMessageDto: UpdateMessageDto): Promise<IMessage> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }
        const isUpdated = await this.messageModel.findByIdAndUpdate(id, updateMessageDto, {
            new: true,
        });

        if (!isUpdated) {
            throw new InternalServerErrorException('Message not updated');
        }

        return updateMessageDto;
    }

    async deleteMessage(id: string): Promise<{ message: string }> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }

        const isDeleted = await this.messageModel.findByIdAndRemove(id);

        if (!isDeleted) {
            throw new InternalServerErrorException('Message not deleted');
        }

        return { message: 'success' };
    }
}
