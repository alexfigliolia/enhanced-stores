import { Middleware } from "./Middleware";
export declare class Profiler<T = any> extends Middleware<T> {
    private threshold;
    private startTime;
    constructor(threshold?: number);
    onBeforeUpdate(): void;
    onUpdate(name: string): void;
}
