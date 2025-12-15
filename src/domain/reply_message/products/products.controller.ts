import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Get('search/:name')
    search(@Param('name') name: string) {
        return this.service.search(name);
    }
    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
