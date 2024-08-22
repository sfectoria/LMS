import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProgramDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   durationOnsite: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   durationOnline: string;
  @ApiProperty()
  @IsNotEmpty()
  imageURL: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsArray()
  courses: Course[];
}
type Course = {
  id: number;
};
