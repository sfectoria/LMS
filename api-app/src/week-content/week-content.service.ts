import { Injectable } from '@nestjs/common';
import { CreateWeekContentDto } from './dto/create-week-content.dto';
import { UpdateWeekContentDto } from './dto/update-week-content.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()


export class WeekContentService { 
  constructor(private readonly prisma: PrismaService) { }
  create(createWeekContentDto: CreateWeekContentDto) {
    return this.prisma.weekContent.create({ data : createWeekContentDto });
  }

  findAll() {
    return this.prisma.weekContent.findMany();
  }

  findOne(id: number) {
    return this.prisma.weekContent.findUniqueOrThrow({
      where: { id }
    });
  }

  update(id: number, updateWeekContentDto: UpdateWeekContentDto) {
    return `This action updates a #${id} weekContent`;
  }

  remove(id: number) {
    return this.prisma.weekContent.delete({ where: { id } });
  }
} 
