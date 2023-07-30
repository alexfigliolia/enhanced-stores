"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancerFactory = void 0;
const EnhancedWritable_1 = require("./EnhancedWritable");
const EnhancedDerived_1 = require("./EnhancedDerived");
const EnhancedReadable_1 = require("./EnhancedReadable");
/**
 * ### Enhancer Factory
 *
 * This interface is designed to simplify the repetitive creation
 * of stores using the same middlewares. Instead of registering
 * middlewares on each of your individual `writable's`, `derived's`,
 * and `readable's`, you can instead create a factory that will
 * take care of this for you:
 *
 * ```typescript
 * import { EnhancerFactory, Logger, Profiler } from "@figliolia/enhanced-stores";
 * import type { Middleware} from "@figliolia/enhanced-stores";
 *
 * const middleware: Middleware<any>[] = [];
 *
 * if(process.env.NODE_ENV === "development") {
 *   middleware.push(new Profiler(), new Logger());
 * }
 * // Create a factory with your middleware
 * const factory = new EnhancerFactory(...middleware);
 * // Create a writable
 * const writable = factory.createWritable("My Writable", [1, 2, 3]);
 * // Create a derived
 * const derived = factory.createWritable("My Derived", writable, v => {
 *   return v.map((item) => item + 1)
 * });
 * // Create a readable
 * const readable = factory.createReadable("Time", new Date(), function start(set) {
 *   const interval = setInterval(() => {
 *     set(new Date());
 *   }, 1000);
 *
 *   return function stop() {
 *     clearInterval(interval);
 *   };
 * });
 * ```
 *
 * Each of the `store's` in the above example will have the `Profiler`
 * and `Logger` middlewares when running in development mode!
 */
class EnhancerFactory {
    constructor(...middleware) {
        this.middleware = middleware;
    }
    /**
     * Create Writable
     *
     * Returns an `EnhancedWritable` with each of the factory's middlewares
     * registered on it
     */
    createWritable(name, ...params) {
        return this.enhance(new EnhancedWritable_1.EnhancedWritable(name, ...params));
    }
    /**
     * Create Derived
     *
     * Returns an `EnhancedDerived` with each of the factory's middlewares
     * registered on it
     */
    createDerived(name, ...params) {
        return this.enhance(new EnhancedDerived_1.EnhancedDerived(name, ...params));
    }
    /**
     * Create Readable
     *
     * Returns an `EnhancedReadable` with each of the factory's middlewares
     * registered on it
     */
    createReadable(name, ...params) {
        return this.enhance(new EnhancedReadable_1.EnhancedReadable(name, ...params));
    }
    /**
     * Enhance
     *
     * Registers the factory's middleware on the provided store
     * and returns it
     */
    enhance(enhancer) {
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
}
exports.EnhancerFactory = EnhancerFactory;
