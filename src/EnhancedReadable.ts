import type { Readable } from "svelte/store";
import { get, readable } from "svelte/store";
import { Enhancer } from "./Enhancer";

/**
 * ### Enhanced Readable
 *
 * An extension of Svelte's `readable` interface that supports
 * middleware! Enhanced Readable fully implements the `readable`
 * API and can be used as a drop in replacement for the native
 * implementation. It'll work exactly the same way, while
 * supporting any number of middlewares.
 *
 * #### Creating Readable Values
 * ```typescript
 * import {
 *   Logger,
 *   Profiler,
 *   EnhancedReadable
 * } from "@figliolia/enhanced-writable";
 *
 * export const readableState = new EnhancedReadable('Readable', 50);
 *
 * state.registerMiddleware(new Profiler(), new Logger());
 * readableState.registerMiddleware(new Logger());
 * ```
 *
 * #### Using Readable Values in your Svelte Components
 * ```svelte
 * <script>
 *  import { readableState } from "$lib/myStates";
 * </script>
 *
 * <div style="height: {$readableState}px" />
 * ```
 */
export class EnhancedReadable<T> extends Enhancer<T> {
  state: Readable<T>;
  private currentValue: T | undefined;
  constructor(name: string, ...params: Parameters<typeof readable<T>>) {
    super(name);
    this.state = readable(...params);
    this.currentValue = this.emit("onInitialize", get(this.state));
    this.initialize();
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
   * Subscribe to value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  public subscribe(...params: Parameters<Readable<T>["subscribe"]>) {
    return this.state.subscribe(...params);
  }

  /**
   * Initialize
   *
   * Registers a subscription to the derived state and
   * emits `onBeforeUpdate` and `onUpdate` events to
   * registered middlewares
   */
  private initialize() {
    return this.subscribe((v) => {
      this.emit("onBeforeUpdate", this.currentValue!);
      const nextValue = this.emit("onUpdate", v);
      this.currentValue = nextValue;
    });
  }
}
