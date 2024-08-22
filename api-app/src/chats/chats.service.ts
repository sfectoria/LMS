import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}
  async createMgs(dto: CreateChatDto) {
    return await this.prisma.msgs.create({
      data: dto,
      include: { sender: true },
    });
  }
  async findAllUserBySessionId(sessionId: number) {
    return await this.prisma.sessionUser.findMany({ where: { sessionId } });
  }

  findAllMgssBySessionId(sessionId: number) {
    return this.prisma.msgs.findMany({
      where: { sessionId },
      include: { sender: true },
    });
  }
  
  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
