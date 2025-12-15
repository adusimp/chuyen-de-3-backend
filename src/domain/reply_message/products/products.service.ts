import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private repo: Repository<Product>,
    ) {}
    findAll() {
        return this.repo.find();
    }
    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }
    search(name: string) {
        return this.repo.find({
        where: { name: Like(`%${name}%`) },
        });
    }
    create(data: any) {
        const product = this.repo.create(data);
        return this.repo.save(product);
    }

    update(id: number, data: any) {
        return this.repo.update(id, data);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
