import { IsEnum } from "class-validator";
import { OrderStatus } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    @ApiProperty({enum: OrderStatus, example: OrderStatus.Completed})
    status: OrderStatus
}