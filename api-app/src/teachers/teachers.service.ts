import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {
  }
   create(createTeacherDto: CreateTeacherDto) {
    return this.prisma.teacher.create({ data: createTeacherDto });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: number) {
    return this.prisma.teacher.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
   return this.prisma.teacher.update({
     where: { id },
     data: updateTeacherDto,
   });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
