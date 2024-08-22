import { Module } from '@nestjs/common';
import { WeekContentService } from './week-content.service';
import { WeekContentController } from './week-content.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WeekContentController],
  providers: [WeekContentService,PrismaService],
})
export class WeekContentModule {}
