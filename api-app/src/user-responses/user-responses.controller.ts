import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserResponsesService } from './user-responses.service';
import {
  CreateUserResponseDto,
  Responses,
} from './dto/create-user-response.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('USER RESPONSES')
@Controller('user-responses')
export class UserResponsesController {
  constructor(private readonly userResponsesService: UserResponsesService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserResponseDto: Responses, @Request() req: any) {
    return this.userResponsesService.create(createUserResponseDto, req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('mine/:checkpointId')
  findAllByUserAndCheckpoint(
    @Param('checkpointId') checkpointId: number,
    @Request() req: any,
  ) {
    return this.userResponsesService.findAllByUserAndCheckpoin(req.user.id,checkpointId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserResponseDto: UpdateUserResponseDto,
  ) {
    return this.userResponsesService.update(+id, updateUserResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResponsesService.remove(+id);
  }
}
