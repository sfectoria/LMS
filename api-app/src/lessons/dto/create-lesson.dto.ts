import { ApiProperty } from '@nestjs/swagger';


export class CreateLessonDto {
  @ApiProperty()
  imageURL: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  courseId: number;
}




