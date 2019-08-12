import { ILog } from "../interfaces/ILog";
import { IProduct } from "../interfaces/IProduct";

export class Product implements IProduct {
    private logs: ILog[] = [];

    constructor(
        public name: string,
        public description: string,
        public price: number,
    ) { }

    public getPrice() {
        return this.price;
    }

    public setPrice(price: number) {
        if (price > this.price) {
            this.price = price;
            this.addLog(`Product ${this.name} price changed to ${this.price}`);
        }

        return this;
    }

    // TODO
    // public add() {
    // }

    // TODO
    // public removeProduct() {
    // }

    public getHistory() {
        return this.logs;
    }

    private addLog(title: string) {
        this.logs.push({
            date: new Date(),
            title,
        });
    }

}
