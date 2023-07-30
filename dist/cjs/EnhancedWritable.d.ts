/// <reference types="svelte" />
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
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
export declare class EnhancedWritable<T> extends Enhancer<T> {
    state: Writable<T>;
    constructor(name: string, ...params: Parameters<typeof writable<T>>);
    get instance(): Writable<T>;
    set(...params: Parameters<Writable<T>["set"]>): void;
    update(...params: Parameters<Writable<T>["update"]>): void;
    subscribe(...params: Parameters<Writable<T>["subscribe"]>): import("svelte/store").Unsubscriber;
}
