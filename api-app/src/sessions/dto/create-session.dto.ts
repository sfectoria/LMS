import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionDto {
  @ApiProperty()
  programId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  imageURL: string;
  userIds:number[]
}
