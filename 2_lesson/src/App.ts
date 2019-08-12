import { IApp, ITask, IWorker } from "./interfaces";

export class App implements IApp {
    public tasks: ITask[] = [];

    public addTask(task: ITask) {
        this.tasks.push(task);
    }

    public getTasks() {
        return this.tasks;
    }

    public getWorkers() {
        const tasks = this.getTasks();
        const workers: IWorker[] = [];

        for (const task of tasks) {
            for (const worker of task.workers) {
                // get only unique workers
                if (!workers.some((w) => w.name === worker.name)) {
                    workers.push(worker);
                }
            }
        }

        return workers;
    }

    public completedTask() {
        return this.tasks.filter((task) => {
            return task.completed === true;
        });
    }
}
