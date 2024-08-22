import { Injectable } from '@nestjs/common';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { create } from 'domain';
import { LessonContent } from 'src/lesson-content/entities/lesson-content.entity';
@Injectable()
export class WeeksService {
  constructor(private readonly prisma: PrismaService) {}

   async create(createWeekDto: CreateWeekDto) {
    const { contentweek, ...rest } = createWeekDto;
    let data = { ...rest };

    return  await this.prisma.week.create ({
      data: {
        ...rest,
        WeekContent: {
          createMany :{data:contentweek.map(elem=>({LessonContentId:elem}))} 
        }

      },

    }) ;
  }

  findAll() {
    return this.prisma.week.findMany ({include:{ WeekContent:{include:{LessonContent:true}} } });
  }

  findOne(id: number) {
    return this.prisma.week.findUniqueOrThrow({
      where: { id },
      include: { WeekContent: true },
    });
  }
  update(id: number, updateWeekDto: UpdateWeekDto) {
    return this.prisma.week.update({
      where: { id },
      data: updateWeekDto,
    });
  }

  remove(id: number) {
    return this.prisma.week.delete({ where: { id } });
  }
}
