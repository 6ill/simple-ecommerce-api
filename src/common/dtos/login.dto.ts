import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: "john_doe"
    })
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty({
        example: "abcedfgh"
    })
    @IsString()
    @IsNotEmpty()
    password:string;
}