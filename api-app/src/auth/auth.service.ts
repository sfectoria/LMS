import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto) {
    // 'This action adds a new auth'
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new HttpException('invalid email', HttpStatus.BAD_REQUEST);
    }
    const { password, ...rest } = user;
    if (await bcrypt.compare(dto.password, password)) {
      const token = this.jwtService.sign(rest);
      return token;
    } else {
      throw new HttpException('invalid password', HttpStatus.BAD_REQUEST);
    }
  }
  async getMyInfo(token: string) {
    const myInfo = this.jwtService.decode(token);
    return myInfo;
  }
  async updateMe(dto: any, id: number) {
    if (dto['password']) {
      throw new HttpException(
        'Vous ne pouvez pas modifier le mot de passe',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          id: {
            not: id, // Exclude the current user
          },
        },
      });

      if (existingUser) {
        throw new HttpException(
          "L'adresse e-mail est déjà utilisée",
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const { email, ...resto } = dto;
    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      
      data: {
        email: email,
        ...resto
      },
    });
    const { password, ...rest } = updatedUser;
    const token = this.jwtService.sign(rest);
    return token;
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
