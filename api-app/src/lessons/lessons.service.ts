import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { create } from 'domain';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLessonDto: CreateLessonDto) {
    
    // if (contents) data['LessonContent'] = { create: contents };
    return this.prisma.lesson.create({
      data: createLessonDto });
  }
  findAll() {
    return this.prisma.lesson.findMany({ include: { LessonContent: true } });
  }

  findOne(id: number) {
    return this.prisma.lesson.findUniqueOrThrow({
      where: { id },
      include: { LessonContent: true },
    });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
