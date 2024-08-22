import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProgramDto: CreateProgramDto) {
    const { courses, ...rest } = createProgramDto;
    return await this.prisma.program.create({
      data: {
        ...rest,
        ProgramCourse: {
          createMany:{data:courses.map(elem=>({courseId:elem.id}))}
        }
      },
    });
    // const programCorses = await this.prisma.programCourse.createMany({
    //   data: courses.map((elem) => ({
    //     courseId: elem.id,
    //     programId: program.id,
    //   })),
    // });
    //  return await this.prisma.program.create({
    //    data: dto,
    //  });
  }

  findAll() {
    return this.prisma.program.findMany();
  }

  findOne(id: number) {
    return this.prisma.program.findUniqueOrThrow({ where: { id },include:{ProgramCourse:{include:{course: {include : {Lesson: true}}}}} });
  }

  update(id: number, updateProgramDto: UpdateProgramDto) {
    return this.prisma.program.update({
      where: { id },
      data: updateProgramDto,
    });
  }

  remove(id: number) {
    return this.prisma.program.delete({ where: { id } });
  }
}
