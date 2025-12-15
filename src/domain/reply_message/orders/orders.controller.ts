import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() body: CreateOrderDto) {
        return this.ordersService.createOrder(body);
    }

    @Get()
    findAll(@Query('limit') limit?: number) {
        return this.ordersService.findAll(limit ? Number(limit) : 20);
    }

    @Get('by-phone')
    findByPhone(@Query('phone') phone: string) {
        return this.ordersService.findByPhone(phone);
    }
    @Get('by-code')
    findByCode(@Query('code') code: string) {
        return this.ordersService.findByCode(code);
    }
}
