import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeekContentService } from './week-content.service';
import { CreateWeekContentDto } from './dto/create-week-content.dto';
import { UpdateWeekContentDto } from './dto/update-week-content.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('week-content')
@ApiTags("week content")
export class WeekContentController {
  constructor(private readonly weekContentService: WeekContentService) {}

  @Post()
  create(@Body() createWeekContentDto: CreateWeekContentDto) {
    return this.weekContentService.create(createWeekContentDto);
  }

  @Get()
  findAll() {
    return this.weekContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekContentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekContentDto: UpdateWeekContentDto) {
    return this.weekContentService.update(+id, updateWeekContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekContentService.remove(+id);
  }
}
