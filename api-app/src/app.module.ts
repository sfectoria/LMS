import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { ProgramsModule } from './programs/programs.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { LessonsModule } from './lessons/lessons.module';
import { ChatsModule } from './chats/chats.module';

import { WeeksModule } from './weeks/weeks.module';
import { UserResponsesModule } from './user-responses/user-responses.module';
import { WeekContentModule } from './week-content/week-content.module';
import {LessonContentModule}  from './lesson-content/lesson-content.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    CoursesModule,
    ProgramsModule,
    TeachersModule,
    AuthModule,
    SessionsModule,
    LessonsModule,
    WeeksModule,
    ChatsModule,
    LessonContentModule,
    UserResponsesModule,
    WeekContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

