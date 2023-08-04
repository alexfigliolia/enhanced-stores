import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import { Enhancer } from "./Enhancer";

/**
 * ### Enhanced Writable
 *
 * An extension of Svelte's `writable` interface that supports
 * middleware! Enhanced Writable fully implements the `Writable`
 * API and can be used as a drop in replacement for the native
 * implementation. It'll work exactly the same way, while
 * supporting any number of middlewares.
 *
 * #### Creating Writable Values
 * ```typescript
 * import {
 *   Logger,
 *   Profiler,
 *   EnhancedWritable,
 * } from "@figliolia/enhanced-writable";
 *
 * export const state = new EnhancedWritable('State', 50);
 *
 * state.registerMiddleware(new Profiler(), new Logger());
 * ```
 *
 * #### Using Writable Values in your Svelte Components
 * ```svelte
 * <script>
 *  import { state } from "$lib/myStates";
 *
 *  const increment = () => {
 *    state.update(v => v + 1);
 *  }
 * </script>
 *
 * <button on:click={increment}>{state}</button>
 * ```
 */
export class EnhancedWritable<T> extends Enhancer<T, Writable<T>> {
  constructor(name: string, ...params: Parameters<typeof writable<T>>) {
    super(name, writable(...params));
  }

  /**
   * Instance
   *
   * Returns the native `derived` instance
   */
  public get instance() {
    return this.state;
  }

  /**
   * Set
   *
   * Updates the writeable with the specified value. Emits the
   * `onBeforeUpdate` and `onUpdate` events
   */
  public set(...params: Parameters<Writable<T>["set"]>) {
    this.emit("onBeforeUpdate", get(this.state));
    this.state.set(...params);
    this.emit("onUpdate", params[0]);
  }

  /**
   * Update
   *
   * Updates the writeable using the return value of the callback
   * specified. Emits the `onBeforeUpdate` and `onUpdate` events
   */
  public update(...params: Parameters<Writable<T>["update"]>) {
    this.emit("onBeforeUpdate", get(this.state));
    this.state.update(...params);
    this.emit("onUpdate", get(this.state));
  }

  /**
   * Subscribe
   *
   * Invokes the specified callback each time the writable's
   * value changes
   */
  public subscribe(...params: Parameters<Writable<T>["subscribe"]>) {
    return this.state.subscribe(...params);
  }
}
