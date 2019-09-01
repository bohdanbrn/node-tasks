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
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from '../users/get-user-decorator';
import { UserRole } from '../users/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('conversations')
@UseGuards(AuthGuard('jwt'))
export class ConversationsController {
    private logger = new Logger('ConversationsController');
    constructor(private readonly conversationsService: ConversationsService) {}

    @Get()
    getUserConversations(@GetUser() user: User): Promise<Conversation[]> {
        this.logger.verbose(`User "${user.username}" retrieving his conversations.`);
        return this.conversationsService.getUserConversations(user);
    }

    @Get('/:id')
    getUserConversationById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Conversation> {
        return this.conversationsService.getUserConversationById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createConversation(
        @Body() createConversationDto: CreateConversationDto,
        @GetUser() user: User,
    ): Promise<Conversation> {
        this.logger.verbose(
            `User ${user.username} creating a new conversation. Data: ${JSON.stringify(
                createConversationDto,
            )}`,
        );
        return this.conversationsService.createConversation(createConversationDto, user);
    }

    @Put('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    updateConversation(
        @Param('id') id: number,
        @Body() updateConversationDto: UpdateConversationDto,
    ): Promise<Conversation> {
        return this.conversationsService.updateConversation(id, updateConversationDto);
    }

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    deleteConversation(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.conversationsService.deleteConversation(id, user);
    }
}
