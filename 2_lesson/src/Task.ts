import { ILog, ITask, IWorker } from "./interfaces";

export class Task implements ITask {
    public workers: IWorker[] = [];
    public logs: ILog[] = [];

    constructor(
        public title: string,
        public estimate: number,
        public consumedTime: number,
        public completed: boolean,
    ) { }

    public setTitle(title: string) {
        this.title = title;
    }

    public setEstimate(time: number) {
        this.estimate = time;
    }

    public setConsumedTime(time: number) {
        this.consumedTime = time;
    }

    public setCompleted(status: boolean) {
        this.completed = status;
    }

    public addLog(log: ILog) {
        this.logs.push(log);
    }

    public getLogs() {
        return this.logs;
    }

}
