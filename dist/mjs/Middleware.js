/* eslint-disable @typescript-eslint/no-unused-vars */
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
export class Middleware {
    /**
     * On Update
     *
     * An event emitted each time a store updates.
     * Receives the name of the store and it's next
     * state as parameters
     */
    onUpdate(name, state) { }
    /**
     * On Before Update
     *
     * An event emitted each time a store is about
     * to receive a new value. Receives the name of
     * the store and it's previous state as parameters
     */
    onBeforeUpdate(name, state) { }
    /**
     * Clone
     *
     * Returns an immutable copy of any value
     */
    static clone(state) {
        if (Array.isArray(state)) {
            return [...state];
        }
        if (state instanceof Set) {
            return new Set(state);
        }
        if (state instanceof Map) {
            return new Map(state);
        }
        if (state && typeof state === "object") {
            return { ...state };
        }
        if (typeof state === "number") {
            return Number(state);
        }
        if (typeof state === "boolean") {
            return Boolean(state);
        }
        return state;
    }
}
