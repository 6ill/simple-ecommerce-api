import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description:"Provide username without whitespace",
        example: "john_doe"
    })
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty({
        example:"example@domain.com",
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        example:"John Doe"
    })
    @IsString()
    @IsNotEmpty()
    fullName:string;

    @ApiProperty({
        description: "Provide valid Indonesian mobile phone number.",
        example:"+628123456789",
        examples: [
            "+628123456789",
            "628123456789",
            "08123456789"
        ]
    })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('ID')
    contactNumber:string;

    @ApiProperty({
        minLength:8,
        example:"abcefgh"
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @ApiProperty({
        example:"Jl. Industri Blok B14 Kav. 1 Kemayoran, Jakarta Pusat DKI Jakarta 10610"
    })
    @IsString()
    @IsNotEmpty()
    address:string;
}