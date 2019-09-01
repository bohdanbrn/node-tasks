import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Conversation } from '../conversations/conversation.entity';

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(type => User, user => user.messages, { eager: false })
    user: User;

    @ManyToOne(type => Conversation, conversation => conversation.messages, { eager: false })
    conversation: Conversation;
}
