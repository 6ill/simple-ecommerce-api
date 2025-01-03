import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { PartialType as PartialTypeSwagger } from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class UpdateProductDtoSwagger extends PartialTypeSwagger(CreateProductDto) {}