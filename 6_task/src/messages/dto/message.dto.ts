import { IsOptional, IsNotEmpty } from 'class-validator';

export class MessageDto {
    @IsOptional()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;
}
