interface ILog {
    title: string;
    description: string;
    getTitle(): void;
    getDescription(): void;
}

interface IWorker {
    name: string;
    getName(): void;
}

interface ITask {
    title: string;
    workers: IWorker[];
    estimate: number;
    consumedTime: number;
    completed: boolean;
    logs: ILog[];
    setTitle(title: string): void;
    setEstimate(time: number): void;
    setConsumedTime(time: number): void;
    setCompleted(status: boolean): void;
    addLog(task: ILog): void;
    getLogs(): void;
}

interface IApp {
    tasks: ITask[];
    addTask(task: ITask): void;
    completedTask(): void;
    getWorkers(): void;
    getTasks(): void;
}

export { ILog, IWorker, ITask, IApp };
