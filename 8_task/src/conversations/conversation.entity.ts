import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToMany } from 'typeorm';
import { Message } from 'src/messages/message.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => Message, message => message.conversation, { eager: true })
    messages: Message[];

    @ManyToMany(() => User, user => user.conversations)
    users: User[];
}
