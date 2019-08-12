import { Injectable } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import * as fs from 'fs';
import * as path from 'path';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    getAllProducts(): IProduct[] {
        const filePath = this.getFilePath();
        const productsData = fs.readFileSync(filePath).toString();

        return JSON.parse(productsData);
    }

    getProductById(id: number): IProduct {
        const products = this.getAllProducts();

        return products.find(product => +product.id === +id);
    }

    createProduct(productDto: ProductDto): IProduct {
        const { name, description } = productDto;
        const products = this.getAllProducts();

        const product: IProduct = {
            id: products.length + 1,
            name,
            description,
        };
        products.push(product);

        const isSaved = this.saveProducts(products);

        if (isSaved) {
            return product;
        } else {
            return null;
        }
    }

    editProduct(id: number, productDto: ProductDto): IProduct {
        const { name, description } = productDto;
        const products = this.getAllProducts();
        const productIndex = this.getProductIndexById(id, products);

        if (productIndex >= 0) {
            products[productIndex].name = name;
            products[productIndex].description = description;

            const isSaved = this.saveProducts(products);

            if (isSaved) {
                return products[productIndex];
            }
        }

        return null;
    }

    deleteProduct(id: number): boolean {
        const products = this.getAllProducts();
        const productIndex = this.getProductIndexById(id, products);

        if (productIndex >= 0) {
            products.splice(productIndex, 1);

            const isSaved = this.saveProducts(products);

            if (isSaved) {
                return true;
            }
        }

        return false;
    }

    private getFilePath(): string {
        return path.join(__dirname, '/../../data/products.json');
    }

    private getProductIndexById(id: number, products: IProduct[]): number {
        for (const i in products) {
            if (+products[i].id === +id) {
                return +i;
            }
        }
        return -1;
    }

    private saveProducts(products: IProduct[]): boolean {
        try {
            const filePath = this.getFilePath();
            fs.writeFileSync(filePath, JSON.stringify(products));

            return true;
        } catch (e) {
            return false;
        }
    }
}
