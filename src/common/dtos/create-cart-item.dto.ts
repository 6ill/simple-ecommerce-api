import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateCartItemDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @ApiProperty({
        description: "UUID of product",
        example: "6fb67419-1d72-4a3d-86b0-424b5a2c9ee1"
    })
    productId:string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        minimum:1,
        example: 2
    })
    quantity:number;
}