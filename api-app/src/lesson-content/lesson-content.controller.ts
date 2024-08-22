import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonContentService } from './lesson-content.service';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/users/decoratorRole';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user';
@ApiTags('lessonContent')
@Controller('lesson-content')
export class LessonContentController {
  constructor(private readonly lessonContentService: LessonContentService) {}
  @Roles('manager')
  @Post()
  createMany(@Body() createLessonContentDto: CreateLessonContentDto[]) {
    return this.lessonContentService.createMany(createLessonContentDto);
  }
  @Post('checkpoint')
  createCheckpoint(@Body() createLessonContentDto: CreateLessonContentDto) {
    return this.lessonContentService.createCheckPoint(createLessonContentDto);
  }

  @Get()
  findAll() {
    return this.lessonContentService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('checkpoint/:id/my-reponse')
  findOneWithResponsesOfUser(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.lessonContentService.findOneWithResponsesOfUser(+id, user.id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonContentService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLessonContentDto: UpdateLessonContentDto,
  // ) {
  //   return this.lessonContentService.update(+id, updateLessonContentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonContentService.remove(+id);
  }
}
