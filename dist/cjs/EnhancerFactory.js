"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancerFactory = void 0;
const EnhancedWritable_1 = require("./EnhancedWritable");
const EnhancedDerived_1 = require("./EnhancedDerived");
const EnhancedReadable_1 = require("./EnhancedReadable");
class EnhancerFactory {
    constructor(...middleware) {
        this.middleware = middleware;
    }
    createWritable(name, ...params) {
        const enhancer = new EnhancedWritable_1.EnhancedWritable(name, ...params);
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
    createDerived(name, ...params) {
        const enhancer = new EnhancedDerived_1.EnhancedDerived(name, ...params);
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
    createReadable(name, ...params) {
        const enhancer = new EnhancedReadable_1.EnhancedReadable(name, ...params);
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
}
exports.EnhancerFactory = EnhancerFactory;
