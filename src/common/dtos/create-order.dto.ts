import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsArray()
    @IsUUID(undefined, {each: true})
    @ArrayMinSize(1)
    @ApiProperty({
        description: "IDs of cart item and they must be in UUID format",
        example: ["518e24ef-1911-448e-8bff-250f2d1f69a6"]
    })
    cartItemIds: string[];
}