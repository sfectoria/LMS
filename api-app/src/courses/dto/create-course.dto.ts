import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
    
  imageURL: string;
  @ApiProperty()
  videoURL: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  src: string;
  @ApiProperty()
  src1: string;
  @ApiProperty()
  src2: string;
  @ApiProperty()
  price: number;
}
