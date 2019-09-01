import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { Message } from '../messages/message.entity';
import { UserRole } from './user-role.enum';
import { IsEnum } from 'class-validator';
import { Conversation } from 'src/conversations/conversation.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @Column('text')
    @IsEnum(UserRole)
    role: string;

    @OneToMany(type => Message, message => message.user, { eager: true })
    messages: Message[];

    @ManyToMany(() => Conversation, conversation => conversation.users, {
        cascade: true,
    })
    @JoinTable({
        name: 'usersConversations',
        joinColumn: { name: 'userId' },
        inverseJoinColumn: { name: 'conversationId' },
    })
    conversations: Conversation[];
}
