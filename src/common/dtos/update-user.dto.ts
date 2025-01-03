import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { PartialType as PartialTypeSwagger, OmitType as OmitTypeSwagger } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['email'] as const)
) {}

export class UpdateUserDtoSwagger extends PartialTypeSwagger(
    OmitTypeSwagger(CreateUserDto, ['email'] as const)
) {}