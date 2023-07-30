/// <reference types="svelte" />
import type { Stores, Readable } from "svelte/store";
import { derived } from "svelte/store";
import { Enhancer } from "./Enhancer";
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
export declare class EnhancedDerived<S extends Stores, T> extends Enhancer<T> {
    state: Readable<T>;
    currentValue: T | undefined;
    constructor(name: string, ...params: Parameters<typeof derived<S, T>>);
    /**
     * Instance
     *
     * Returns the native `derived` instance
     */
    get instance(): Readable<T>;
    /**
     * Subscribe to value changes.
     * @param run subscription callback
     * @param invalidate cleanup callback
     */
    subscribe(...params: Parameters<Readable<T>["subscribe"]>): import("svelte/store").Unsubscriber;
    /**
     * Initialize
     *
     * Registers a subscription to the derived state and
     * emits `onBeforeUpdate` and `onUpdate` events to
     * registered middlewares
     */
    private initialize;
}
