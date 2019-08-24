import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Put,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { IMessage } from './interfaces/message.interface';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from 'src/users/user-role.enum';

@Controller('messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Get()
    async getMessages(): Promise<IMessage[]> {
        return await this.messagesService.getAllMessages();
    }

    @Get('/:id')
    async getMessageById(@Param('id') id: string): Promise<IMessage> {
        return await this.messagesService.getMessageById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createMessage(@Body() messageDto: MessageDto): Promise<IMessage> {
        return this.messagesService.createMessage(messageDto);
    }

    @Put('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    updateMessage(
        @Param('id') id: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ): Promise<IMessage> {
        return this.messagesService.updateMessage(id, updateMessageDto);
    }

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    deleteMessage(@Param('id') id: string): Promise<{ message: string }> {
        return this.messagesService.deleteMessage(id);
    }
}
