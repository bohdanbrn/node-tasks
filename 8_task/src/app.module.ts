import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        MessagesModule,
        AuthModule,
        UsersModule,
        ConversationsModule,
    ],
})
export class AppModule {}
