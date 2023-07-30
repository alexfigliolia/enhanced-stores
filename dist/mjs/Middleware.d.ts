/**
 * ### Middleware
 *
 * A extendable base class for all Svelte Store
 * subscribables. When creating your own middleware
 * for Svelte Stores, simply extend this class and
 * register it on your store:
 *
 * ```typescript
 * import { Middleware, EnhancedWritable } from "@figliolia/enhanced-stores";
 *
 * class Logger extends Middleware {
 *   onBeforeUpdate(name, state) {
 *     console.log(`${name} is about to update!`, state);
 *   }
 *
 *   onUpdate(name, state) {
 *     console.log(`${name} updated!`, state);
 *   }
 * }
 * // In your stores
 * const toggle = new EnhancedWritable("My Store", true);
 * toggle.registerMiddleware(new Logger());
 * ```
 *
 * In the example above, your middleware will log the
 * current state each time `toggle` updates or is about
 * to update
 */
export declare class Middleware<T = any> {
    /**
     * On Update
     *
     * An event emitted each time a store updates.
     * Receives the name of the store and it's next
     * state as parameters
     */
    onUpdate(name: string, state: T): void;
    /**
     * On Before Update
     *
     * An event emitted each time a store is about
     * to receive a new value. Receives the name of
     * the store and it's previous state as parameters
     */
    onBeforeUpdate(name: string, state: T): void;
    /**
     * Clone
     *
     * Returns an immutable copy of any value
     */
    static clone<T>(state: T): T;
}
