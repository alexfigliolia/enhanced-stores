import { Middleware } from "./Middleware";
/**
 * ### Logger
 *
 * A redux-like logger for Svelte Stores
 *
 * ```typescript
 * import { EnhancedWritable, Logger } from "@figliolia/enhanced-stores";
 *
 * const writable = new EnhancedWritable("List Items", [1, 2, 3]);
 * writable.registerMiddleware(new Logger());
 * ```
 *
 * The writable in the example above will log to the console each
 * state change that occurs.
 */
export declare class Logger<T = any> extends Middleware<T> {
    private previousState;
    onBeforeUpdate(_: string, state: T): void;
    onUpdate(name: string, state: T): void;
    /**
     * Time
     *
     * Returns the time in which a given state transition completed
     */
    private get time();
}
