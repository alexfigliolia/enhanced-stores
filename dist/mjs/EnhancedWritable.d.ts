/// <reference types="svelte" />
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { Enhancer } from "./Enhancer";
export declare class EnhancedWritable<T> extends Enhancer<T> {
    state: Writable<T>;
    constructor(name: string, ...params: Parameters<typeof writable<T>>);
    get instance(): Writable<T>;
    set(...params: Parameters<Writable<T>["set"]>): void;
    update(...params: Parameters<Writable<T>["update"]>): void;
    subscribe(...params: Parameters<Writable<T>["subscribe"]>): import("svelte/store").Unsubscriber;
}
