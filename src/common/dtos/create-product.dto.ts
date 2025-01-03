import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Body Wash"
    })
    name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Product description"
    })
    description:string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example:50000
    })
    price:number;
}