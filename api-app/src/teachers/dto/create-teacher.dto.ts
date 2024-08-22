import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  imageURL: string;
  @ApiProperty()
  specialty: string;
  @ApiProperty()
  about: string;
}
