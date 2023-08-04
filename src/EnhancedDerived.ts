import type { Stores, Readable } from "svelte/store";
import { derived, get } from "svelte/store";
import { Enhancer } from "./Enhancer";
import { Middleware } from "./Middleware";

/**
 * ### Enhanced Derived
 *
 * An extension of Svelte's `derived` interface that supports
 * middleware! Enhanced Derived fully implements the `derived`
 * API and can be used as a drop in replacement for the native
 * implementation. It'll work exactly the same way, while
 * supporting any number of middlewares.
 *
 * #### Creating Derived Values
 * ```typescript
 * import {
 *   Logger,
 *   Profiler,
 *   EnhancedWritable,
 *   EnhancedDerived
 * } from "@figliolia/enhanced-writable";
 *
 * export const state = new EnhancedWritable('State', 3);
 * export const derivedState = new EnhancedDerived(
 *   'Derived',
 *   state,
 *   value => value + 1
 * );
 *
 * state.registerMiddleware(new Profiler(), new Logger());
 * derivedState.registerMiddleware(new Profiler(), new Logger());
 * ```
 *
 * #### Using Derived Values in your Svelte Components
 * ```svelte
 * <script>
 *  import { derivedState } from "$lib/myStates";
 * </script>
 *
 * <div style="height: {$derivedState}px" />
 * ```
 */
export class EnhancedDerived<S extends Stores, T> extends Enhancer<
  T,
  Readable<T>
> {
  currentValue: T | undefined;
  constructor(name: string, ...params: Parameters<typeof derived<S, T>>) {
    super(name, derived(...params));
    this.currentValue = Middleware.clone(get(this.state));
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
   * Subscribe
   *
   * Invokes the specified callback each time the writable's
   * value changes
   */
  public subscribe(...params: Parameters<Readable<T>["subscribe"]>) {
    return this.state.subscribe(...params);
  }

  /**
   * Initialize
   *
   * Registers a subscription to the derived state and
   * emits `onBeforeUpdate` and `onUpdate` events to
   * registered middleware
   */
  private initialize() {
    return this.subscribe((v) => {
      this.emit("onBeforeUpdate", this.currentValue!);
      const nextValue = this.emit("onUpdate", v);
      this.currentValue = nextValue;
    });
  }
}
