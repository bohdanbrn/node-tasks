import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    conversationId: number;
}
