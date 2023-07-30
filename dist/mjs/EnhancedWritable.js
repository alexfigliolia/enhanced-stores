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
export class EnhancedWritable extends Enhancer {
    state;
    constructor(name, ...params) {
        super(name);
        this.state = writable(...params);
    }
    get instance() {
        return this.state;
    }
    set(...params) {
        this.emit("onBeforeUpdate", get(this.state));
        this.state.set(...params);
        this.emit("onUpdate", params[0]);
    }
    update(...params) {
        this.emit("onBeforeUpdate", get(this.state));
        this.state.update(...params);
        this.emit("onUpdate", get(this.state));
    }
    subscribe(...params) {
        return this.state.subscribe(...params);
    }
}
