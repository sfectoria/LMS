import { Injectable } from '@nestjs/common';
import {
  CreateUserResponseDto,
  Responses,
} from './dto/create-user-response.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserResponsesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Responses, userId: number) {
    return await this.prisma.userResponses.createMany({
      data: dto.responses.map((elem) => ({
        questionId: elem.questionId,
        propositionanswerId: elem.propositionId,
        userId,
      })),
    });
  }

  findAllByUserAndCheckpoin(userId: number, checkpointId: number) {
    return this.prisma.userResponses.findMany({
      where: {
        userId,
        Question: { lessonContentId: checkpointId },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userResponse`;
  }

  update(id: number, updateUserResponseDto: UpdateUserResponseDto) {
    return `This action updates a #${id} userResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResponse`;
  }
}
