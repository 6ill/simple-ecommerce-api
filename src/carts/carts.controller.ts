import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { Roles, User } from 'src/common/decorators';
import { CreateCartItemDto, UpdateCartDto } from 'src/common/dtos';
import { Role } from 'src/common/enums';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SUCCESS_ADD_CART, SUCCESS_GET_CART } from 'src/common/example-responses';

@Controller('carts')
@UseGuards(JwtGuard, RoleGuard)
@Roles(Role.User)
@ApiBearerAuth()
export class CartsController {
    constructor(
        private readonly cartsService: CartsService
    ) {}

    @Get()
    @ApiOkResponse({
        example: SUCCESS_GET_CART
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async getCart(@User('username') username: string) {
        const cart = await this.cartsService.getCartByUsername(username, true);
        return {cart};
    }

    @Post()
    @ApiCreatedResponse({
        description: "The item has been successfully added to cart",
        example: SUCCESS_ADD_CART
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async addToCart(
        @User('username') username: string, 
        @Body() createCartItemDto: CreateCartItemDto
    ) { 
        const cartItem = await this.cartsService.addToCart(username, createCartItemDto);
        return {
            message: "Added to cart successfully!",
            cartItem
        }
    }

    @Put()
    @ApiOkResponse({
        description: "The cart has been updated successfully",
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async updateCart(
        @User('username') username: string, 
        @Body() updateCartDto: UpdateCartDto
    ) {
        await this.cartsService.updateCart(username, updateCartDto);
        return { message: "Cart has successfully updated!"};
    }

    @Delete(':itemId')
    @ApiParam({
        name:"itemId", 
        description: "Cart item ID should be in UUID", 
        example: "6fb67419-1d72-4a3d-86b0-424b5a2c9ee1"
    })
    @ApiOkResponse({
        description: "The cart item has been deleted successfully",
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async deleteItem(
        @User('username') username: string,
        @Param('itemId') itemId: string
    ) {
        const cartItem = await this.cartsService.getCartItem(itemId);
        if(!cartItem) {
            throw new BadRequestException("Cart item not found!");
        }

        if(cartItem.cart.user.username !== username) {
            throw new ForbiddenException("You are only able to remove your own cart item!")
        }

        const deleteResult = await this.cartsService.deleteItem(itemId);
        if(deleteResult.affected < 1) {
            throw new BadRequestException("Cart item not found!");
        }
        return {
            message: "Remove item from cart successfully!",
            cartItem
        }
    }
}
