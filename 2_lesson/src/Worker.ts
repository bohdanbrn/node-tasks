import { IWorker } from "./interfaces";

export class Worker implements IWorker {
    constructor(public name: string) { }

    public getName() {
        return this.name;
    }
}
