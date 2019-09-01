import { IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
