import { Injectable } from '@nestjs/common';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonContentService {
  constructor(private readonly prisma: PrismaService) {}
  createMany(createLessonContentDto: CreateLessonContentDto[]) {
    return this.prisma.lessonContent.createMany({
      data: createLessonContentDto,
    });
  }
  createCheckPoint(dto: CreateLessonContentDto) {
    console.log(dto, 'this is the dto');
    return this.prisma.lessonContent.create({
      data: {
        contentname: dto.contentname,
        type: 'checkpoint',
        lessonId:dto.lessonId,
        questions: {
          create: dto.questions.map((el) => ({
            scale: el.scale,
            label: el.label,
            propositions: {
              create: el.propositions.map((p) => ({
                isCorrect: p.isCorrect,
                label: p.label,
              })),
            },
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.lessonContent.findMany();
  }

  findOne(id: number) {
    return this.prisma.lessonContent.findUniqueOrThrow({
      where: { id },
      include: { lesson: true, questions: { include: { propositions: true } } },
    });
  }
  findOneWithResponsesOfUser(id: number, userId: number) {
    return this.prisma.lessonContent.findUniqueOrThrow({
      where: { id },
      include: {
        lesson: true,
        questions: {
          include: {
            propositions: {
              include: {
                userResponses: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // update(id: number, updateLessonContentDto: UpdateLessonContentDto) {
  //   return this.prisma.lessonContent.update({
  //     where: { id },
  //     data: updateLessonContentDto,
  //   });
  // }

  remove(id: number) {
    return this.prisma.lessonContent.delete({ where: { id } });
  }
}
