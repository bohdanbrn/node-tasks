import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    UseGuards,
    Logger,
    Put,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from '../users/get-user-decorator';
import { UserRole } from '../users/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
    private logger = new Logger('MessagesController');
    constructor(private messagesService: MessagesService) {}

    @Get()
    getUserMessages(@GetUser() user: User): Promise<Message[]> {
        this.logger.verbose(`User "${user.username}" retrieving all messages.`);
        return this.messagesService.getUserMessages(user);
    }

    @Get('/:id')
    getMessageById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Message> {
        return this.messagesService.getMessageById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createMessage(
        @Body() createMessageDto: CreateMessageDto,
        @GetUser() user: User,
    ): Promise<Message> {
        this.logger.verbose(
            `User ${user.username} creating a new message. Data: ${JSON.stringify(
                createMessageDto,
            )}`,
        );
        return this.messagesService.createMessage(createMessageDto, user);
    }

    @Put('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    updateMessage(
        @Param('id') id: number,
        @Body() updateMessageDto: UpdateMessageDto,
    ): Promise<Message> {
        return this.messagesService.updateMessage(id, updateMessageDto);
    }

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    deleteMessage(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.messagesService.deleteMessage(id, user);
    }
}
