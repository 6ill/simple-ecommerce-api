import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { OrderSorts, OrderStatus } from '../enums';


export class OrdersQueryDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({enum: OrderStatus, example: OrderStatus.Completed, required:false})
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(OrderSorts)
  @ApiProperty({
    enum: OrderSorts, 
    description:"If the prefix is a hyphen '-', it indicates the list is sorted in descending order; otherwise, the list is sorted in ascending order.", 
    example: OrderSorts.DateDescendant,
    required:false
  })
  sort?: OrderSorts;

  @IsOptional()
  @IsUUID()
  @ApiProperty({example:"518e24ef-1911-448e-8bff-250f2d1f69a6", required:false})
  userId?: string
}
