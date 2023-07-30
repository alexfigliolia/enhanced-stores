import type { Stores, derived, readable, writable } from "svelte/store";
import type { Middleware } from "./Middleware";
import { EnhancedWritable } from "./EnhancedWritable";
import { EnhancedDerived } from "./EnhancedDerived";
import { EnhancedReadable } from "./EnhancedReadable";

export class EnhancerFactory<T extends Middleware<any>[]> {
  middleware: T;
  constructor(...middleware: T) {
    this.middleware = middleware;
  }

  createWritable<V>(name: string, ...params: Parameters<typeof writable<V>>) {
    const enhancer = new EnhancedWritable(name, ...params);
    enhancer.registerMiddleware(...this.middleware);
    return enhancer;
  }

  createDerived<S extends Stores, V>(
    name: string,
    ...params: Parameters<typeof derived<S, V>>
  ) {
    const enhancer = new EnhancedDerived(name, ...params);
    enhancer.registerMiddleware(...this.middleware);
    return enhancer;
  }

  createReadable<V>(name: string, ...params: Parameters<typeof readable<V>>) {
    const enhancer = new EnhancedReadable(name, ...params);
    enhancer.registerMiddleware(...this.middleware);
    return enhancer;
  }
}
