"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedWritable = void 0;
const store_1 = require("svelte/store");
const Enhancer_1 = require("./Enhancer");
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
class EnhancedWritable extends Enhancer_1.Enhancer {
    constructor(name, ...params) {
        super(name);
        this.state = (0, store_1.writable)(...params);
    }
    get instance() {
        return this.state;
    }
    set(...params) {
        this.emit("onBeforeUpdate", (0, store_1.get)(this.state));
        this.state.set(...params);
        this.emit("onUpdate", params[0]);
    }
    update(...params) {
        this.emit("onBeforeUpdate", (0, store_1.get)(this.state));
        this.state.update(...params);
        this.emit("onUpdate", (0, store_1.get)(this.state));
    }
    subscribe(...params) {
        return this.state.subscribe(...params);
    }
}
exports.EnhancedWritable = EnhancedWritable;
