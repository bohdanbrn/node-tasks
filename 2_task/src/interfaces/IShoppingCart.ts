import { ILog } from "./ILog";
import { IProduct } from "./IProduct";

export interface IShoppingCart {
    name: string;
    owner: string;
    maxCount: number;
    addNewProduct(product: IProduct): void;
    removeProduct(index: number): void;
    getAvaragePrice(): number;
    getProducts(): IProduct[];
    getFormattedListOfProducts(): string[];
    getTotalPrice(): number;
    getHistory(): ILog[];
}
