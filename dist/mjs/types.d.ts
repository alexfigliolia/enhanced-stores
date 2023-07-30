import type { Stores, Updater, StoresValues, Unsubscriber, StartStopNotifier } from "svelte/store";
export interface Messages<T> {
    onUpdate: T;
    onBeforeUpdate: T;
}
export declare enum Events {
    onUpdate = "onUpdate",
    onBeforeUpdate = "onBeforeUpdate"
}
export interface IWritable<T> {
    value?: T;
    start?: StartStopNotifier<T> | undefined;
}
export interface IDerived<S extends Stores, T> {
    stores: S;
    fn: (values: StoresValues<S>, set: (value: T) => void, update: (fn: Updater<T>) => void) => Unsubscriber | void;
    initial_value?: T;
}
