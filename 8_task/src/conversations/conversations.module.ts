import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { ConversationRepository } from './conversation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([ConversationRepository]), AuthModule],
    controllers: [ConversationsController],
    providers: [ConversationsService],
    exports: [ConversationsService],
})
export class ConversationsModule {}
