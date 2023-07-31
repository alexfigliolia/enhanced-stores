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
 *   onInitialize(name, state) {
 *     console.log(`${name} initialized!`, state);
 *   }
 *
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
export class Middleware<T = any> {
  /**
   * On Initialize
   *
   * An event emitted when a store initializes.
   * Receives the name of the store and it's
   * initial state as parameters
   */
  public onInitialize(name: string, state: T) {}
  /**
   * On Update
   *
   * An event emitted each time a store updates.
   * Receives the name of the store and it's next
   * state as parameters
   */
  public onUpdate(name: string, state: T) {}

  /**
   * On Before Update
   *
   * An event emitted each time a store is about
   * to receive a new value. Receives the name of
   * the store and it's previous state as parameters
   */
  public onBeforeUpdate(name: string, state: T) {}

  /**
   * Clone
   *
   * Returns an immutable copy of any value
   */
  public static clone<T>(state: T): T {
    if (Array.isArray(state)) {
      return [...state] as T;
    }
    if (state instanceof Set) {
      return new Set(state) as T;
    }
    if (state instanceof Map) {
      return new Map(state) as T;
    }
    if (state && typeof state === "object") {
      return { ...state } as T;
    }
    if (typeof state === "number") {
      return Number(state) as T;
    }
    if (typeof state === "boolean") {
      return Boolean(state) as T;
    }
    return state;
  }
}
