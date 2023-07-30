import { Middleware } from "./Middleware";
export declare class Enhancer<T> {
    name: string;
    middleware: Middleware<T>[];
    constructor(name: string);
    registerMiddleware(...middleware: Middleware<T>[]): void;
    protected emit(event: keyof Middleware<T>, state: T): T;
}
