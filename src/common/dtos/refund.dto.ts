import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsDecimal, Min, IsPositive, IsNumber } from "class-validator";

export class RefundDto {
    @IsString()
    @MinLength(5)
    @ApiProperty({
      minLength:5,
      example: "The item received is damaged or not functioning properly."
    })
    reason: string;
  
    @IsNumber()
    @IsPositive()
    @ApiProperty({
      example: 2000
    })
    amount: number;
  }
  