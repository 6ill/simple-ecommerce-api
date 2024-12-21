import { ArrayMinSize, IsArray, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsArray()
    @IsUUID(undefined, {each: true})
    @ArrayMinSize(1)
    cartItemIds: string[];
}