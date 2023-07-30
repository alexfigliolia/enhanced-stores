/// <reference types="svelte" />
import type { Stores, Readable } from "svelte/store";
import { derived } from "svelte/store";
import { Enhancer } from "./Enhancer";
export declare class EnhancedDerived<S extends Stores, T> extends Enhancer<T> {
    state: Readable<T>;
    currentValue: T | undefined;
    constructor(name: string, ...params: Parameters<typeof derived<S, T>>);
    get instance(): Readable<T>;
    subscribe(...params: Parameters<Readable<T>["subscribe"]>): import("svelte/store").Unsubscriber;
    private initialize;
}
