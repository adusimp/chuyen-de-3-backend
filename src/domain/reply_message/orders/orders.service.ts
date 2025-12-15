import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
    ) {}

    async createOrder(dto: CreateOrderDto) {
        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException('Đơn hàng phải có ít nhất 1 sản phẩm');
        }
        return this.dataSource.transaction(async (manager) => {
            const order = await manager.save(Order, {
                order_code: 'ORD-' + Date.now(),
                customer_name: dto.customer_name,
                phone: dto.phone,
                address: dto.address,
                status: 'pending',
            });

            let total = 0;

            for (const item of dto.items) {
            const product = await manager.findOne(Product, {
            where: { id: item.product_id },
            lock: { mode: 'pessimistic_write' },
            });

            if (!product) {
            throw new BadRequestException('Sản phẩm không tồn tại');
            }
            if (product.quantity < item.quantity) {
                throw new BadRequestException(
                `Sản phẩm ${product.name} không đủ số lượng hoặc hết hàng`,
                );
            }
            total += product.price * item.quantity;
            product.quantity -= item.quantity;
            await manager.save(Product, product);
            await manager.save(OrderItem, {
                order_id: order.id,
                product_id: product.id,
                size: item.size,
                quantity: item.quantity,
                price: product.price,
            });
            }

            await manager.update(Order, order.id, { total_price: total });

            return {
                order_id: order.id,
                order_code: order.order_code,
                total_price: total,
                status: order.status,
            };
        });
    }


    async findAll(limit = 20) {
        return this.orderRepo.find({
            order: { created_at: 'DESC' },
            take: limit,
        });
    }

    async findByPhone(phone: string) {
        return this.orderRepo.find({
            where: { phone },
            order: { created_at: 'DESC' },
        });
    }

    async findByCode(code: string) {
        return this.orderRepo.findOne({ where: { order_code: code } });
    }
}
