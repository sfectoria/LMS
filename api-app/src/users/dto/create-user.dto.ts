import { ApiProperty } from "@nestjs/swagger"
import { roleContent } from "@prisma/client";
import { IsEmail , IsNumber} from "class-validator"
export class CreateUserDto {
    @ApiProperty()
    image : string;
    @ApiProperty()
    firstName :string ;
    @ApiProperty()
    lastName :string ;
    @IsEmail()
    @ApiProperty()
    email :string ;
    @ApiProperty()
    password :string;
    @ApiProperty()
    @IsNumber()
    phone :number;
    @ApiProperty()
    address :string;
    @ApiProperty()
    role: roleContent;
}
