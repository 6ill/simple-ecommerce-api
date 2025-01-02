import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    fullName:string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('ID')
    contactNumber:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsString()
    @IsNotEmpty()
    address:string;
}