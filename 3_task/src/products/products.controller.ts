import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts(): Promise<IProduct[]> {
        return await this.productsService.getAllProducts();
    }

    @Get('/:id')
    async getProductById(@Param('id') id: number): Promise<IProduct> {
        return await this.productsService.getProductById(id);
    }

    @Post()
    async createProduct(@Body() productDto: ProductDto): Promise<IProduct> {
        return this.productsService.createProduct(productDto);
    }

    @Put('/:id')
    editProduct(
        @Param('id') id: number,
        @Body() productDto: ProductDto,
    ): IProduct {
        return this.productsService.editProduct(id, productDto);
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id: number): { message: string } {
        const isDeleted = this.productsService.deleteProduct(id);

        if (isDeleted) {
            return {message: 'success'};
        }

        return null;
    }
}
