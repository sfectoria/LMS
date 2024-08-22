import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import  * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

   async create(dto: CreateUserDto) {
    const {password,...rest}=dto
    const salt= await bcrypt.genSalt()
    const hashedPassword=await bcrypt.hash(password, salt)
    // This action adds a new user
    return this.prisma.user.create({
      data:{password:hashedPassword,...rest},
    });
  }

  findAll() {
    // This action returns all users
    return this.prisma.user.findMany({
      where: {
        archived: false,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data:updateUserDto ,
       });
  }


  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
