import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<IProduct>) {}

    async getAllProducts(): Promise<IProduct[]> {
        return await this.productModel.find();
    }

    async getProductById(id: string): Promise<IProduct> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }

        const product = await this.productModel.findOne({ _id: id });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async createProduct(productDto: ProductDto): Promise<IProduct> {
        const newProduct = new this.productModel(productDto);

        const isSaved = await newProduct.save();

        if (!isSaved) {
            throw new InternalServerErrorException('Product not created');
        }

        return newProduct;
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<IProduct> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }
        const isUpdated = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });

        if (!isUpdated) {
            throw new InternalServerErrorException('Product not updated');
        }

        return updateProductDto;
    }

    async deleteProduct(id: string): Promise<{ message: string }> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }

        const isDeleted = await this.productModel.findByIdAndRemove(id);

        if (!isDeleted) {
            throw new InternalServerErrorException('Product not deleted');
        }

        return { message: 'success' };
    }
}
