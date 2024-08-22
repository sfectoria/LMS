import { Module } from '@nestjs/common';
import { UserResponsesService } from './user-responses.service';
import { UserResponsesController } from './user-responses.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserResponsesController],
  providers: [UserResponsesService,PrismaService],
})
export class UserResponsesModule {}
