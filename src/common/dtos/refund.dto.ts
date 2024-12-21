import { IsString, MinLength, IsDecimal, Min, IsPositive, IsNumber } from "class-validator";

export class RefundDto {
    @IsString()
    @MinLength(5)
    reason: string;
  
    @IsNumber()
    @IsPositive()
    amount: number;
  }
  