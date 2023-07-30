/// <reference types="svelte" />
import type { Readable } from "svelte/store";
import { readable } from "svelte/store";
import { Enhancer } from "./Enhancer";
export declare class EnhancedReadable<T> extends Enhancer<T> {
    state: Readable<T>;
    private currentValue;
    constructor(name: string, ...params: Parameters<typeof readable<T>>);
    get instance(): Readable<T>;
    subscribe(...params: Parameters<Readable<T>["subscribe"]>): import("svelte/store").Unsubscriber;
    private initialize;
}
