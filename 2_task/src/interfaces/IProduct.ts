import { ILog } from "./ILog";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    addedDate?: Date;
    getPrice(): number;
    setPrice(price: number): void;
    // add(): void;
    // removeProduct(name: string): void;
    getHistory(): ILog[];
}
