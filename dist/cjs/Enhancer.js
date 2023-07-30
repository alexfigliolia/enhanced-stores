"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enhancer = void 0;
const Middleware_1 = require("./Middleware");
/**
 * ### Enhancer
 *
 * A base class for all enhanced stores in svelte. By extending
 * the `Enhancer`, your states gain access to an event emitter
 * that communicates with each registered middleware
 */
class Enhancer {
    constructor(name) {
        this.middleware = [];
        this.name = name;
    }
    registerMiddleware(...middleware) {
        this.middleware.push(...middleware);
    }
    emit(event, state) {
        if (!this.middleware.length) {
            return state;
        }
        const value = Middleware_1.Middleware.clone(state);
        this.middleware.forEach((middleware) => {
            middleware[event](this.name, value);
        });
        return value;
    }
}
exports.Enhancer = Enhancer;
