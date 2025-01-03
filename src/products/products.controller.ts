import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { CreateProductDto, UpdateProductDto, UpdateProductDtoSwagger } from 'src/common/dtos';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SUCCESS_CREATE_PRODUCT, SUCCESS_GET_ALL_PRODUCTS, SUCCESS_GET_PRODUCT } from 'src/common/example-responses';

@Controller('products')
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth()
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @Get()
    @ApiOkResponse({
        example: SUCCESS_GET_ALL_PRODUCTS
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async getAll() {
        const products = await this.productsService.getAll();
        return {products};
    }

    @Get(':id')
    @ApiParam({
        name:"id", 
        description: "Product ID should be in UUID", 
        example: "6fb67419-1d72-4a3d-86b0-424b5a2c9ee1"
    })
    @ApiOkResponse({
        example: SUCCESS_GET_PRODUCT
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async getById(@Param('id') id: string) {
        const product  = await this.productsService.getById(id);
        return {product};
    }

    @Put(':id')
    @Roles(Role.Admin)
    @ApiOperation({
        description: "Admin only",
        tags: ["Admins"]
    })
    @ApiParam({
        name:"id", 
        description: "Product ID should be in UUID", 
        example: "6fb67419-1d72-4a3d-86b0-424b5a2c9ee1"
    })
    @ApiOkResponse({
        description: "The product has updated successfully"
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    @ApiForbiddenResponse({
        description: "The request is forbidden because the user lacks the necessary administrative privileges to perform this operation."
    })
    @ApiBody({
        type: UpdateProductDtoSwagger
    })
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        const updateResult =  await this.productsService.update(id, updateProductDto)
        if(updateResult.affected > 0) {
            return {message: "Product has updated successfully!"}
        }
        return {message: "Product has failed to update!"}
    }

    @Post()
    @Roles(Role.Admin)
    @ApiOperation({
        description: "Admin only",
        tags: ["Admins"]
    })
    @ApiCreatedResponse({
        example: SUCCESS_CREATE_PRODUCT
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    @ApiForbiddenResponse({
        description: "The request is forbidden because the user lacks the necessary administrative privileges to perform this operation."
    })
    async create(@Body() createProductDto: CreateProductDto) {
        const product = await this.productsService.create(createProductDto);
        return {
            message: "Product has successfully added!",
            product
        }
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @ApiOperation({
        description: "Admin only",
        tags: ["Admins"]
    })
    @ApiParam({
        name:"id", 
        description: "Product ID should be in UUID", 
        example: "6fb67419-1d72-4a3d-86b0-424b5a2c9ee1"
    })
    @ApiOkResponse({
        description: "The product has deleted successfully"
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    @ApiForbiddenResponse({
        description: "The request is forbidden because the user lacks the necessary administrative privileges to perform this operation."
    })
    async delete(@Param('id') id: string) {
        const deleteResult =  await this.productsService.delete(id)
        if(deleteResult.affected > 0) {
            return {message: "Product has removed successfully!"}
        }
        return {message: "Product has failed to remove!"}
    }
}
