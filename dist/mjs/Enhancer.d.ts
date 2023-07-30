import { Middleware } from "./Middleware";
/**
 * ### Enhancer
 *
 * A base class for all enhanced stores in svelte. By extending
 * the `Enhancer`, your states gain access to an event emitter
 * that communicates with each registered middleware
 */
export declare class Enhancer<T> {
    name: string;
    middleware: Middleware<T>[];
    constructor(name: string);
    registerMiddleware(...middleware: Middleware<T>[]): void;
    protected emit(event: keyof Middleware<T>, state: T): T;
}
