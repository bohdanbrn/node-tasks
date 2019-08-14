import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts(): Promise<IProduct[]> {
        return await this.productsService.getAllProducts();
    }

    @Get('/:id')
    async getProductById(@Param('id') id: string): Promise<IProduct> {
        return await this.productsService.getProductById(id);
    }

    @Post()
    async createProduct(@Body() productDto: ProductDto): Promise<IProduct> {
        return this.productsService.createProduct(productDto);
    }

    @Put('/:id')
    updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<IProduct> {
        return this.productsService.updateProduct(id, updateProductDto);
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
        return this.productsService.deleteProduct(id);
    }
}
