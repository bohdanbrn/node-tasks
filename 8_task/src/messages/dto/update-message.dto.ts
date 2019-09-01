import { IsNotEmpty } from 'class-validator';

export class UpdateMessageDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;
}
