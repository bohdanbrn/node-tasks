import { ILog } from "./interfaces";

export class Log implements ILog {
    constructor(public title: string, public description: string) { }

    public getTitle() {
        return this.title;
    }

    public getDescription() {
        return this.description;
    }
}
