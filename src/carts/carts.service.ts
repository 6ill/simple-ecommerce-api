import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartItemDto, UpdateCartDto } from 'src/common/dtos';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { Cart } from 'src/database/entities/cart.entity';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartsRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemsRepository: Repository<CartItem>,
    ) {}


    async getCartByUsername(username:string, withRelation:boolean): Promise<Cart> {
        return await this.cartsRepository.findOne({
            where: {
                user: {username}
            },
            relations: {
                items: { product: withRelation, cart:false}
            }
        });
    }

    async createCart(userId: string): Promise<Cart> {
        const cart = this.cartsRepository.create({user: {id: userId}});
        return await this.cartsRepository.save(cart);
    }

    async addToCart(username:string, createCartItemDto: CreateCartItemDto): Promise<CartItem> {
        const { productId, quantity }  = createCartItemDto;
        const cart = await this.getCartByUsername(username, false);
        if(!cart) {
            throw new BadRequestException("User not found");
        }
        const cartItem = this.cartItemsRepository.create({
            product: {id: productId},
            quantity,
            cart
        });
        
        return await this.cartItemsRepository.save(cartItem);
    }

    async updateCart(username:string, { items }: UpdateCartDto): Promise<void> {
        const cart = await this.getCartByUsername(username, false);
        if(!cart) {
            throw new BadRequestException("User not found");
        }
        await this.cartItemsRepository.delete({cart});
        const cartItems = items.map(({ productId, quantity }) => {
            return this.cartItemsRepository.create({
                product: {id: productId},
                quantity,
                cart
            });
        });
        cart.items = await this.cartItemsRepository.save(cartItems);
        await this.cartsRepository.save(cart);
    }

    async getCartItem(id: string): Promise<CartItem> {
        return await this.cartItemsRepository.findOne({
            where: {id},
            relations: {
                cart: {user: true}
            }
        })
    }

    async deleteItem(id: string): Promise<DeleteResult> {
        const deleteResult = await this.cartItemsRepository.delete({id});
        return deleteResult;
    }
}
