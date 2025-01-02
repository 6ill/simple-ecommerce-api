import { BadRequestException, HttpServer, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { CreateOrderDto, RefundDto } from 'src/common/dtos';
import { OrderStatus } from 'src/common/enums';
import { Order, OrderItem } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemsRepository: Repository<OrderItem>,
        private readonly cartsService: CartsService,
    ) {}

    async placeOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
        const { cartItemIds } = createOrderDto;
        const cart = await this.cartsService.getCartByUserId(userId, true);
        if(!cart) {
            throw new BadRequestException("Cart or user not found!");
        }
        // Filter cart items for the provided cartItemIds
        const selectedCartItems = cart.items.filter(item => cartItemIds.includes(item.id));
        if (selectedCartItems.length !== cartItemIds.length) {
            throw new BadRequestException('Some cart items are invalid or not found');
        }

        const totalAmount = selectedCartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);            
        console.log("\n cart userId: \n", userId)
        const order = this.ordersRepository.create({
            user: {id: userId},
            totalAmount
        });

        const savedOrder = await this.ordersRepository.save(order)
        
        const orderItems = selectedCartItems.map(({quantity, product,}) => {
            return this.orderItemsRepository.create({
                order: savedOrder,
                quantity,
                product,
                totalPrice: quantity * product.price
            });
        });
        
        // Delete selected cart items
        selectedCartItems.forEach(async ({id}) => {
            await this.cartsService.deleteItem(id);
        })
        
        await this.orderItemsRepository.save(orderItems);
        return savedOrder;
    } 

    async getAllOrdersByUserId(userId: string): Promise<Order[]> {
        return await this.ordersRepository.find({
            where: {user: {id: userId}},
            relations: {
                items: {product: true, order:false}
            }
        });
    }

    async getOrderById(id: string): Promise<Order> {
        return await this.ordersRepository.findOne({
            where: {id},
            relations: {
                items: {product: true, order:false},
                user: true
            }
        });
    }

    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
        const order = await this.getOrderById(orderId);
        if(!order) {
            throw new BadRequestException("Order not found!");
        }
        order.status = status;
        return await this.ordersRepository.save(order);
    }

    async processRefund(orderId: string, refundDto:RefundDto): Promise<Order> {
        const order = await this.updateOrderStatus(orderId, OrderStatus.Refunded);

        const { amount, reason } = refundDto;
        
        order.refundAmount = amount
        order.refundReason= reason
        order.refundProcessedAt=  new Date()

        return await this.ordersRepository.save(order);
    }
}
