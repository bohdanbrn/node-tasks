import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateMessageDto {
    @IsOptional()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;
}
