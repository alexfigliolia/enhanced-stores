import { EnhancedWritable } from "./EnhancedWritable";
import { EnhancedDerived } from "./EnhancedDerived";
import { EnhancedReadable } from "./EnhancedReadable";
export class EnhancerFactory {
    middleware;
    constructor(...middleware) {
        this.middleware = middleware;
    }
    createWritable(name, ...params) {
        const enhancer = new EnhancedWritable(name, ...params);
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
    createDerived(name, ...params) {
        const enhancer = new EnhancedDerived(name, ...params);
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
    createReadable(name, ...params) {
        const enhancer = new EnhancedReadable(name, ...params);
        enhancer.registerMiddleware(...this.middleware);
        return enhancer;
    }
}
