import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateCartItemDto {
    @IsString()
    @IsNotEmpty()
    productId:string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    quantity:number;
}