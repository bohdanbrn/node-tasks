import { Conversation } from './conversation.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { User } from '../users/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
    private logger = new Logger('ConversationRepository');

    async createConversation(
        createConversationDto: CreateConversationDto,
        user: User,
    ): Promise<Conversation> {
        const { name, description } = createConversationDto;

        const conversation = new Conversation();
        conversation.name = name;
        conversation.description = description;
        conversation.users = [user];

        try {
            await conversation.save();

            return conversation;
        } catch (e) {
            this.logger.error(
                `Failed to create a conversation for user "${user.username}. Data: ${JSON.stringify(
                    createConversationDto,
                )}`,
                e.stack,
            );
            throw new InternalServerErrorException();
        }
    }

    async getUserConversations(userId: number): Promise<Conversation[]> {
        try {
            return await this.createQueryBuilder('conversation')
                .leftJoin('conversation.users', 'user')
                .where('user.id = :userId', { userId })
                .getMany();
        } catch (e) {
            this.logger.error(`Failed to get a conversations for userID "${userId}`, e.stack);
            throw new InternalServerErrorException();
        }
    }

    async getUserConversationById(conversationId: number, user: User): Promise<Conversation> {
        try {
            return await this.createQueryBuilder('conversation')
                .leftJoin('conversation.users', 'user')
                .where('conversation.id = :conversationId', { conversationId })
                .andWhere('user.id = :userId', { userId: user.id })
                .getOne();
        } catch (e) {
            this.logger.error(
                `Failed to get a conversation "${conversationId}" for user "${user}`,
                e.stack,
            );
            throw new InternalServerErrorException();
        }
    }
}
