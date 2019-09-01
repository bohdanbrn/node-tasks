import { IsNotEmpty } from 'class-validator';

export class UpdateConversationDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
