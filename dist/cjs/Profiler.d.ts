import { Middleware } from "./Middleware";
/**
 * ### Profiler
 *
 * A profiler for Svelte store updates. Using the `Profiler` middleware
 * each store will log a warning to the console when a state update
 * exceeds 16ms (1 full frame).
 *
 * ```typescript
 * import { EnhancedWritable, Profiler } from "@figliolia/enhanced-stores";
 *
 * const writable = new EnhancedWritable("List Items", [1, 2, 3]);
 * writable.registerMiddleware(new Profiler());
 * ```
 *
 * The profiler accepts any integer as the threshold in which to log
 * warnings
 */
export declare class Profiler<T = any> extends Middleware<T> {
    private threshold;
    private startTime;
    constructor(threshold?: number);
    onBeforeUpdate(): void;
    onUpdate(name: string): void;
}
