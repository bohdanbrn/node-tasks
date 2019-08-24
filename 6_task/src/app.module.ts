import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import config from '../config/keys';

@Module({
    imports: [UsersModule, MessagesModule, MongooseModule.forRoot(config.mongoURI), AuthModule],
})
export class AppModule {}
