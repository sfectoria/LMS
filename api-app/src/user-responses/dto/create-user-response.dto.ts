import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponseDto {
  @ApiProperty()
  propositionId: number;
  @ApiProperty()
  questionId: number;

}
export class Responses {
  @ApiProperty()
  responses: CreateUserResponseDto[];


}
