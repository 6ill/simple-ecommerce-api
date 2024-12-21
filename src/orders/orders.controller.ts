import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { Roles, User } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { CreateOrderDto, RefundDto } from 'src/common/dtos';
import { UpdateOrderStatusDto } from 'src/common/dtos/update-order-status.dto';

@Controller('orders')
@UseGuards(JwtGuard, RoleGuard)
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Post()
    @Roles(Role.User)
    async placeOrder(@User('id') userId:string, @Body() createOrderDto: CreateOrderDto) {
        const order = await this.ordersService.placeOrder(userId, createOrderDto);
        return {
            message: "Order has been placed successfully!",
            order
        }
    }

    @Get()
    @Roles(Role.User)
    async getAllOrders(@User('id') userId:string) {
        const orders = await this.ordersService.getAllOrdersByUserId(userId);
        return {orders};
    }

    @Get(':id')
    @Roles(Role.User)
    async getOrderById(@User('id') userId:string, @Param('id', ParseUUIDPipe) orderId: string) {
        const order = await this.ordersService.getOrderById(orderId);
        if(!order) {
            throw new BadRequestException("Order not found!");
        }
        if(order.user.id !== userId) {
            throw new BadRequestException("Order not found!");
        }
        delete order.user;
        return {order};
    }

    @Put(':id/status')
    @Roles(Role.Admin)
    async updateOrderStatus(
        @Param('id', ParseUUIDPipe) orderId: string,
        @Body() updateOrderStatusDto: UpdateOrderStatusDto
    ) {
        const order = await this.ordersService.updateOrderStatus(orderId, updateOrderStatusDto.status);

        return {
            message: `Order ${orderId} has been updated to ${order.status}`,
            order
        }
    }

    @Post(':id/refund')
    @Roles(Role.Admin)
    async processRefund(
        @Param('id', ParseUUIDPipe) orderId: string,
        @Body() refundDto: RefundDto
    ) {
        const order = await this.ordersService.processRefund(orderId, refundDto);
        return {
            message: "Refund has applied successfully!",
            order
        }
    }
}
