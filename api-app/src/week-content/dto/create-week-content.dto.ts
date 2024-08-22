import { ApiProperty } from '@nestjs/swagger';



export class CreateWeekContentDto {
    @ApiProperty()
    weekId : number ;
    @ApiProperty()
    LessonContentId: number;
}
