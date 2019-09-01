import { Message } from './message.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../users/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Conversation } from '../conversations/conversation.entity';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    private logger = new Logger('MessageRepository');

    async createMessage(
        createMessageDto: CreateMessageDto,
        user: User,
        conversation: Conversation,
    ): Promise<Message> {
        const { title, text } = createMessageDto;

        const message = new Message();
        message.title = title;
        message.text = text;
        message.user = user;
        message.conversation = conversation;

        try {
            await message.save();
            delete message.user;

            return message;
        } catch (e) {
            this.logger.error(
                `Failed to create a message for user "${user.username}. Data: ${JSON.stringify(
                    createMessageDto,
                )}`,
                e.stack,
            );
            throw new InternalServerErrorException();
        }
    }
}
