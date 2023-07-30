import { Middleware } from "./Middleware";
/**
 * ### Enhancer
 *
 * A base class for all enhanced stores in svelte. By extending
 * the `Enhancer`, your states gain access to an event emitter
 * that communicates with each registered middleware
 */
export class Enhancer {
    name;
    middleware = [];
    constructor(name) {
        this.name = name;
    }
    registerMiddleware(...middleware) {
        this.middleware.push(...middleware);
    }
    emit(event, state) {
        if (!this.middleware.length) {
            return state;
        }
        const value = Middleware.clone(state);
        this.middleware.forEach((middleware) => {
            middleware[event](this.name, value);
        });
        return value;
    }
}
