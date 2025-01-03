import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { Roles, User } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { CreateOrderDto, RefundDto } from 'src/common/dtos';
import { UpdateOrderStatusDto } from 'src/common/dtos/update-order-status.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SUCCESS_GET_ALL_ORDERS, SUCCESS_GET_ORDER, SUCCESS_PLACE_ORDER, SUCCESS_REFUND, SUCCESS_UPDATE_ORDER_STATUS } from 'src/common/example-responses';

@Controller('orders')
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth()
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Post()
    @Roles(Role.User)
    @ApiCreatedResponse({
        example: SUCCESS_PLACE_ORDER
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async placeOrder(@User('id') userId:string, @Body() createOrderDto: CreateOrderDto) {
        const order = await this.ordersService.placeOrder(userId, createOrderDto);
        return {
            message: "Order has been placed successfully!",
            order
        }
    }

    @Get()
    @Roles(Role.User)
    @ApiOkResponse({
        example: SUCCESS_GET_ALL_ORDERS
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
    async getAllOrders(@User('id') userId:string) {
        const orders = await this.ordersService.getAllOrdersByUserId(userId);
        return {orders};
    }

    @Get(':id')
    @Roles(Role.User)
    @ApiParam({
            name:"id", 
            description: "Order ID should be in UUID", 
            example: "2cf81410-717b-4ece-8905-8eb7c77b7300"
    })
    @ApiOkResponse({
        example: SUCCESS_GET_ORDER
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
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
    @ApiOperation({
        description: "Admin only",
        tags: ["Admins"]
    })
    @ApiParam({
        name:"id", 
        description: "Order ID should be in UUID", 
        example: "2cf81410-717b-4ece-8905-8eb7c77b7300"
    })
    @ApiOkResponse({
        example: SUCCESS_UPDATE_ORDER_STATUS
    })
    @ApiBadRequestResponse({
        description: "Bad request"
    })
    @ApiUnauthorizedResponse({
        description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
    })
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
    @ApiOperation({
        description: "Admin only",
        tags: ["Admins"]
    })
    @ApiParam({
        name:"id", 
        description: "Order ID should be in UUID", 
        example: "2cf81410-717b-4ece-8905-8eb7c77b7300"
    })
    @ApiCreatedResponse({
        example: SUCCESS_REFUND
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
