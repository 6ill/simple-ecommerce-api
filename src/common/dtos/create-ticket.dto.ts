import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Checkout"
    })
    subject: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Why I cant checkout with Gopay? I would love this e-commerce for adding Gopay as one of the payment methods."
    })
    message: string;
}