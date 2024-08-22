import { typeContent } from "@prisma/client";
import { LessonContent } from "src/lesson-content/entities/lesson-content.entity";

export const content = [
  {
    contentname: 'HTMLpdf',
    type: typeContent.pdf,
    contentURL:
      'http://localhost:5000/upload/seed/3f19108cdf7934618384f92210243f80e9.pdf',
    lessonId: 1,
  },
  {
    contentname: 'HTMLvideo',
    type: typeContent.video,
    contentURL:
      'http://localhost:5000/upload/seed/75dfaa29e14a5a4d36a3d7638792bd47.mp4',
    lessonId: 1,
  },
  {
    contentname: 'CSSpdf',
    type: typeContent.pdf,
    contentURL:
      'http://localhost:5000/upload/seed/fe25898a4110de105a65dc68d4bc5484cb.pdf',
    lessonId: 2,
  },
  {
    contentname: 'HTML & CSS checkpoint',
    type: typeContent.checkpoint,
    contentURL:
      'http://localhost:5000/upload/seed/fe25898a4110de105a65dc68d4bc5484cb.pdf',
    lessonId: 2,
  
  },
  {
    contentname: 'Bootstrapdf',
    type: typeContent.pdf,
    contentURL:
      'http://localhost:5000/upload/seed/7118e35a31e38ce7d61e59bf1e552a107.pdf',
    lessonId: 3,
  },
  {
    contentname: 'variablespdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/Variables (1).pdf',
    lessonId: 4,
  },
  {
    contentname: 'Functionspdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/FUNCTION.pdf',
    lessonId: 5,
  },
  {
    contentname: 'Logical operator && More Conditionals pdf',
    type: typeContent.pdf,
    contentURL:
      'http://localhost:5000/upload/seed/_Logical operator && More Conditionals (1).pdf',
    lessonId: 6,
  },
  {
    contentname: 'While loop pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/while loop (1).pdf',
    lessonId: 7,
  },
  {
    contentname: 'For Loop iteration pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/For Loop iteration.pdf',
    lessonId: 8,
  },
  {
    contentname: 'Arrays pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/Arrays (1).pdf',
    lessonId: 9,
  },
  {
    contentname: 'Objects- pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/Objects-.pdf',
    lessonId: 10,
  },
  {
    contentname: 'Data modeling pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/Data Modeling.pdf',
    lessonId: 11,
  },
  {
    contentname: 'DOM pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/DOM (1).pdf',
    lessonId: 12,
  },
  {
    contentname: 'React js pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/ReactJS.pdf',
    lessonId: 15,
  },
  {
    contentname: 'React js hooks pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/ReactJs Hooks.pdf',
    lessonId: 16,
  },
  {
    contentname: 'Redux pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/Redux (2).pdf',
    lessonId: 17,
  },
  {
    contentname: 'node js pdf',
    type: typeContent.pdf,
    contentURL: 'http://localhost:5000/upload/seed/Nodejs (1).pdf',
    lessonId: 19,
  },
];