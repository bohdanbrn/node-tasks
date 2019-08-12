import { ILog } from "../interfaces/ILog";
import { IProduct } from "../interfaces/IProduct";
import { IShoppingCart } from "../interfaces/IShoppingCart";

export class ShoppingCart implements IShoppingCart {
    private logs: ILog[] = [];
    private products: IProduct[] = [];

    constructor(
        public name: string,
        public owner: string,
        public maxCount: number,
    ) { }

    public addNewProduct(product: IProduct) {
        if (this.products.length >= this.maxCount) {
            this.removeCheapestProduct();
        }

        // save date for added to cart product
        product.addedDate = new Date();

        this.products.push(product);

        this.addLog(`Product ${product.name} added to cart`);

        return this;
    }

    public removeProduct(index: number) {
        const removedProduct = this.products.splice(index, 1)[0];

        this.addLog(`Product ${removedProduct.name} removed from cart`);
        return this;
    }

    public getAvaragePrice() {
        const totalPrice = this.getTotalPrice();

        return totalPrice / this.products.length;
    }

    public getProducts() {
        return this.products;
    }

    public getFormattedListOfProducts() {
        return this.products.map((prod) => {
            return `${prod.name} - is on ${this.name} from ${prod.addedDate}. ` +
                `Detailed product description: ${prod.description}`;
        });
    }

    public getTotalPrice() {
        const prices = this.products.map((prod) => prod.price);

        return prices.reduce((sum, price) => sum + price, 0);
    }

    public getHistory() {
        return this.logs;
    }

    private addLog(title: string) {
        this.logs.push({
            date: new Date(),
            title,
        });
    }

    private getCheapestProductIndex() {
        const products = this.products;
        let cheapestIndex = 0;

        for (let i = 1; i < products.length; i++) {
            if (products[cheapestIndex].price < products[i].price) {
                cheapestIndex = i;
            }
        }

        return cheapestIndex;
    }

    private removeCheapestProduct() {
        const cheapestIndex = this.getCheapestProductIndex();

        return this.removeProduct(cheapestIndex);
    }

}
