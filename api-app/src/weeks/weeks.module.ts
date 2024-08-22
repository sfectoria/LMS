import { Module } from '@nestjs/common';
import { WeeksService } from './weeks.service';
import { WeeksController } from './weeks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [WeeksController],
  providers: [WeeksService ,PrismaService],
})
export class WeeksModule {}
