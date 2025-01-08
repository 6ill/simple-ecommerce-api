import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEnum, IsString, IsNumber, Min } from "class-validator";
import { ProductSorts } from "../enums";

export class ProductsQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: "string", example:"body wash", required:false})
  name?: string;

  @IsOptional()
  @IsEnum(ProductSorts)
  @ApiProperty({ 
    enum: ProductSorts, 
    example: ProductSorts.PriceAscendant ,
    description:"If the prefix is a hyphen '-', it indicates the list is sorted in descending order; otherwise, the list is sorted in ascending order.", 
    required:false
})
  sort?: ProductSorts;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({type: "number", example:5000, required:false})
  lowestPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({type: "number", example:100000, required:false})
  highestPrice: number;
}
