import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CreateCartItemDto } from "./create-cart-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCartDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCartItemDto)
    @ApiProperty({type: [CreateCartItemDto]})
    items: CreateCartItemDto[];
}