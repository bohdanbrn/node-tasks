import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ConversationsService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageRepository)
        private messageRepository: MessageRepository,

        private conversationsService: ConversationsService,
    ) {}

    async getUserMessages(user: User): Promise<Message[]> {
        return await this.messageRepository.find({ user });
    }

    async getMessageById(id: number, user: User): Promise<Message> {
        const message = await this.messageRepository.findOne({ where: { id, user: user.id } });

        if (!message) {
            throw new NotFoundException(`Message not found`);
        }

        return message;
    }

    async createMessage(createMessageDto: CreateMessageDto, user: User): Promise<Message> {
        const { conversationId } = createMessageDto;

        const conversation = await this.conversationsService.getUserConversationById(
            conversationId,
            user,
        );

        return this.messageRepository.createMessage(createMessageDto, user, conversation);
    }

    async updateMessage(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
        const isUpdated = await this.messageRepository.update({ id }, updateMessageDto);

        if (!isUpdated) {
            throw new InternalServerErrorException('Message not updated');
        }

        return await this.messageRepository.findOne(id);
    }

    async deleteMessage(id: number, user: User): Promise<void> {
        const result = await this.messageRepository.delete({ id, user });

        if (result.affected === 0) {
            throw new NotFoundException(`Message with ID "${id}" not found`);
        }
    }
}
