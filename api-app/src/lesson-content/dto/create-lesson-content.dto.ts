import { ApiProperty } from '@nestjs/swagger';
import { typeContent } from '@prisma/client';

export class Answer {
  @ApiProperty()
  label: string;
  @ApiProperty()
  isCorrect: boolean;
}

export class Question {
  
  id: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  label: string;
  @ApiProperty()
  scale: number;
  @ApiProperty()
  propositions?: Answer[];
}
export class CreateLessonContentDto {
  @ApiProperty()
  contentname: string;
  @ApiProperty()
  type: typeContent;
  @ApiProperty()
  contentURL: string;
  @ApiProperty()
  lessonId: number;
   @ApiProperty()
  questions?: Question[];
}

