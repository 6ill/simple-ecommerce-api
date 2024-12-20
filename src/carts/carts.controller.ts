import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { Roles, User } from 'src/common/decorators';
import { CreateCartItemDto, UpdateCartDto } from 'src/common/dtos';
import { Role } from 'src/common/enums';

@Controller('carts')
@UseGuards(JwtGuard, RoleGuard)
@Roles(Role.User)
export class CartsController {
    constructor(
        private readonly cartsService: CartsService
    ) {}

    @Get()
    async getCart(@User('username') username: string) {
        const cart = await this.cartsService.getCartByUsername(username, true);
        return {cart};
    }

    @Post()
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
    async updateCart(
        @User('username') username: string, 
        @Body() updateCartDto: UpdateCartDto
    ) {
        await this.cartsService.updateCart(username, updateCartDto);
        return { message: "Cart has successfully updated!"};
    }

    @Delete(':itemId')
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