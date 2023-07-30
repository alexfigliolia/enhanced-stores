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
export class EnhancedDerived extends Enhancer {
    state;
    currentValue;
    constructor(name, ...params) {
        super(name);
        this.state = derived(...params);
        this.currentValue = Middleware.clone(get(this.state));
        this.initialize();
    }
    /**
     * Instance
     *
     * Returns the native `derived` instance
     */
    get instance() {
        return this.state;
    }
    /**
     * Subscribe to value changes.
     * @param run subscription callback
     * @param invalidate cleanup callback
     */
    subscribe(...params) {
        return this.state.subscribe(...params);
    }
    /**
     * Initialize
     *
     * Registers a subscription to the derived state and
     * emits `onBeforeUpdate` and `onUpdate` events to
     * registered middlewares
     */
    initialize() {
        return this.subscribe((v) => {
            this.emit("onBeforeUpdate", this.currentValue);
            const nextValue = this.emit("onUpdate", v);
            this.currentValue = nextValue;
        });
    }
}
