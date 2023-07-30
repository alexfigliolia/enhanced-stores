import type { Stores, derived, readable, writable } from "svelte/store";
import type { Middleware } from "./Middleware";
import { EnhancedWritable } from "./EnhancedWritable";
import { EnhancedDerived } from "./EnhancedDerived";
import { EnhancedReadable } from "./EnhancedReadable";
export declare class EnhancerFactory<T extends Middleware<any>[]> {
    middleware: T;
    constructor(...middleware: T);
    createWritable<V>(name: string, ...params: Parameters<typeof writable<V>>): EnhancedWritable<V>;
    createDerived<S extends Stores, V>(name: string, ...params: Parameters<typeof derived<S, V>>): EnhancedDerived<S, V>;
    createReadable<V>(name: string, ...params: Parameters<typeof readable<V>>): EnhancedReadable<V>;
}
