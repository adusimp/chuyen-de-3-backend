import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
