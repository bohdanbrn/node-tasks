import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageRepository } from './message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository]), ConversationsModule, AuthModule],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule {}
