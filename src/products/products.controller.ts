import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { CreateProductDto, UpdateProductDto } from 'src/common/dtos';

@Controller('products')
@UseGuards(JwtGuard, RoleGuard)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @Get()
    async getAll() {
        const products = await this.productsService.getAll();
        return {products};
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const product  = await this.productsService.getById(id);
        return {product};
    }

    @Put(':id')
    @Roles(Role.Admin)
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        const updateResult =  await this.productsService.update(id, updateProductDto)
        if(updateResult.affected > 0) {
            return {message: "Product has updated successfully!"}
        }
        return {message: "Product has failed to update!"}
    }

    @Post()
    @Roles(Role.Admin)
    async create(@Body() createProductDto: CreateProductDto) {
        const product = await this.productsService.create(createProductDto);
        return {
            message: "Product has successfully added!",
            product
        }
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async delete(@Param('id') id: string) {
        const deleteResult =  await this.productsService.delete(id)
        if(deleteResult.affected > 0) {
            return {message: "Product has removed successfully!"}
        }
        return {message: "Product has failed to remove!"}
    }
}
