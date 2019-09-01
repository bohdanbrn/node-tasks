import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';
import { ConversationRepository } from './conversation.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectRepository(ConversationRepository)
        private conversationRepository: ConversationRepository,
    ) {}

    async getUserConversations(user: User): Promise<Conversation[]> {
        return await this.conversationRepository.getUserConversations(user.id);
    }

    async getUserConversationById(id: number, user: User): Promise<Conversation> {
        const conversation = await this.conversationRepository.getUserConversationById(id, user);

        if (!conversation) {
            throw new NotFoundException(`Conversation not found`);
        }

        return conversation;
    }

    async createConversation(
        createConversationDto: CreateConversationDto,
        user: User,
    ): Promise<Conversation> {
        return this.conversationRepository.createConversation(createConversationDto, user);
    }

    async updateConversation(
        id: number,
        updateConversationDto: UpdateConversationDto,
    ): Promise<Conversation> {
        const isUpdated = await this.conversationRepository.update({ id }, updateConversationDto);

        if (!isUpdated) {
            throw new InternalServerErrorException('Conversation not updated');
        }

        return await this.conversationRepository.findOne(id);
    }

    async deleteConversation(id: number, user: User): Promise<void> {
        const result = await this.conversationRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Conversation with ID "${id}" not found`);
        }
    }
}
