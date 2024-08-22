import { PrismaClient } from '@prisma/client';
import { dataCourses } from './data';
import { dataPrograms } from './Forfaits';
import { dataTeachers } from './TEACHERS';
import { SessionData } from './SessionData';
import { dataUser } from './Userdata';
import { LessonData } from './lesson';
import { WeeksData } from './Weeks';
import * as bcrypt from 'bcrypt';
import { content } from './content';
import { contentweek } from './WeekContent';
import { programcourse } from './ProgramCourse';
import { sessionUserdata } from './SessionUser';
 

// import { contentweek } from './WeekContent';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
    const usersdatahush = await Promise.all(
      dataUser.map(async (dto) => {
        const { password, ...rest } = dto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // This action adds a new user
        return { password: hashedPassword, ...rest };
      }),
    );
    const users = await prisma.user.createMany({
      data: usersdatahush,
    });
  const courses = await prisma.course.createMany({
    data: dataCourses,
  });
  const programs = await prisma.program.createMany({
    data: dataPrograms,
  });
  await prisma.programCourse.createMany({data:programcourse})

  const teachers = await prisma.teacher.createMany({
    data: dataTeachers,
  });


  const lessons = await prisma.lesson.createMany({
    data: LessonData,
  });
  
  const lessonContent = await prisma.lessonContent.createMany({
    data: content,
  });

 
  const sessions = await prisma.session.createMany({
    data: SessionData,
  });
  const sessionUser = await prisma.sessionUser.createMany({
    data: sessionUserdata,
  });
 
  let array = [];
  // for (let i = 0; i < 5; i++) {
  //   for (let j = 0; j < 5; j++) {
  //     array.push({ sessionId: i + 1, userId: j + 1 });
  //   }
  // } 
  


  const quest = await prisma.sessionUser.createMany({
    data: array,
  });


  const weeks = await prisma.week.createMany({
    data: WeeksData,
  });

  const weekContent = await prisma.weekContent.createMany({
    data: contentweek ,
  });
  console.log('seeded');
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
